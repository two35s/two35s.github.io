import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './CyberNetwork.css';

const PARTICLE_COUNT = 240;
const CONNECTION_DIST = 130;
const SPHERE_RADIUS = 180;

const CyberNetwork = ({ accent = '#C7FF32' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth || 600;
    const h = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 320;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const randoms = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = SPHERE_RADIUS * (0.3 + 0.7 * Math.random());
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.4;
      sizes[i] = 0.8 + Math.random() * 1.6;
      randoms[i] = Math.random();
    }

    const color = new THREE.Color(accent);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color,
      size: 2.5,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const originals = new Float32Array(positions);

    const linePositions = new Float32Array(PARTICLE_COUNT * PARTICLE_COUNT * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Glow ring
    const ringGeo = new THREE.RingGeometry(160, 175, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    ring.rotation.z = 0.3;
    scene.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.RingGeometry(130, 138, 60),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.025,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = 0.5;
    scene.add(ring2);

    // Mouse tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouse = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    renderer.domElement.addEventListener('mousemove', handleMouse, { passive: true });

    let time = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const dt = clock.getDelta();
      time += dt;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      particles.rotation.y = time * 0.04 + mouse.x * 0.3;
      particles.rotation.x = mouse.y * 0.15;

      ring.rotation.z += dt * 0.15;
      ring2.rotation.x += dt * 0.1;

      const pos = particles.geometry.attributes.position.array;
      const orig = originals;
      const wave = time * 0.5;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const float = Math.sin(wave + randoms[i] * 10) * 6;
        pos[i3] = orig[i3] + float * 0.3;
        pos[i3 + 1] = orig[i3 + 1] + float * 0.5;
        pos[i3 + 2] = orig[i3 + 2] + float * 0.2;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Update connections
      const lpos = lines.geometry.attributes.position.array;
      let li = 0;
      for (let i = 0; i < PARTICLE_COUNT && li < lpos.length; i++) {
        const i3 = i * 3;
        for (let j = i + 1; j < PARTICLE_COUNT && li < lpos.length; j++) {
          const j3 = j * 3;
          const dx = pos[i3] - pos[j3];
          const dy = pos[i3 + 1] - pos[j3 + 1];
          const dz = pos[i3 + 2] - pos[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < CONNECTION_DIST) {
            lpos[li++] = pos[i3];
            lpos[li++] = pos[i3 + 1];
            lpos[li++] = pos[i3 + 2];
            lpos[li++] = pos[j3];
            lpos[li++] = pos[j3 + 1];
            lpos[li++] = pos[j3 + 2];
          }
        }
      }
      lines.geometry.attributes.position.needsUpdate = true;
      lines.geometry.setDrawRange(0, li / 3);

      const opacity = 0.05 + 0.03 * Math.sin(time * 0.3);
      lineMaterial.opacity = opacity;
      material.opacity = 0.35 + 0.15 * Math.sin(time * 0.2);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    let raf = requestAnimationFrame(animate);

    const ro = new ResizeObserver(() => {
      const cw = container.clientWidth || 600;
      const ch = container.clientHeight || 500;
      camera.aspect = cw / ch;
      camera.updateProjectionMatrix();
      renderer.setSize(cw, ch);
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener('mousemove', handleMouse);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, [accent]);

  return <div ref={containerRef} className="cyber-network" />;
};

export default CyberNetwork;
