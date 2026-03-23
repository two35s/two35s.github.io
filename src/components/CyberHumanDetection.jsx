import React from 'react';
import './CyberHumanDetection.css';

const CyberHumanDetection = () => {
  return (
    <div className="cyber-animation-container">
      <svg
        className="cyber-animation-svg"
        viewBox="0 0 680 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="0.9" fill="#1c301c" />
          </pattern>
          <filter id="soft">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* BG */}
        <rect width="680" height="400" fill="#050d05" />
        <rect width="680" height="400" fill="url(#dots)" />

        {/* Subtle center vignette glow */}
        <ellipse cx="340" cy="195" rx="200" ry="190" fill="#0d1f0d" fillOpacity="0.6" />

        {/* ─── Human silhouette ─── */}
        <g className="silhouette">
          <circle cx="340" cy="95" r="27" fill="#0e1c0f" />
          <rect x="333" y="120" width="14" height="16" fill="#0e1c0f" />
          <polygon points="299,136 381,136 369,234 311,234" fill="#0e1c0f" />
          <polygon points="299,136 275,138 261,212 283,218" fill="#0e1c0f" />
          <polygon points="381,136 405,138 419,212 397,218" fill="#0e1c0f" />
          <polygon points="311,234 337,234 329,328 306,328" fill="#0e1c0f" />
          <polygon points="343,234 369,234 374,328 351,328" fill="#0e1c0f" />
        </g>

        {/* ─── Skeleton lines ─── */}
        <g stroke="#00e676" strokeWidth="0.9" strokeOpacity="0.35">
          <line x1="340" y1="122" x2="340" y2="234" />
          <line x1="305" y1="143" x2="375" y2="143" />
          <line x1="314" y1="234" x2="366" y2="234" />
          <line x1="340" y1="122" x2="305" y2="143" />
          <line x1="340" y1="122" x2="375" y2="143" />
          <line x1="305" y1="143" x2="275" y2="188" />
          <line x1="275" y1="188" x2="263" y2="214" />
          <line x1="375" y1="143" x2="405" y2="188" />
          <line x1="405" y1="188" x2="417" y2="214" />
          <line x1="305" y1="143" x2="314" y2="234" />
          <line x1="375" y1="143" x2="366" y2="234" />
          <line x1="314" y1="234" x2="311" y2="280" />
          <line x1="311" y1="280" x2="309" y2="328" />
          <line x1="366" y1="234" x2="369" y2="280" />
          <line x1="369" y1="280" x2="371" y2="328" />
        </g>

        {/* ─── Keypoints ─── */}
        <g fill="#00e676" fillOpacity="0.9">
          <circle cx="340" cy="95" r="3.5" fillOpacity="0.95" />
          <circle cx="305" cy="143" r="3" />
          <circle cx="375" cy="143" r="3" />
          <circle cx="275" cy="188" r="3" />
          <circle cx="405" cy="188" r="3" />
          <circle cx="263" cy="214" r="3" />
          <circle cx="417" cy="214" r="3" />
          <circle cx="314" cy="234" r="3" />
          <circle cx="366" cy="234" r="3" />
          <circle cx="311" cy="280" r="3" />
          <circle cx="369" cy="280" r="3" />
          <circle cx="309" cy="328" r="3" />
          <circle cx="371" cy="328" r="3" />
        </g>

        {/* ─── Bounding box ─── */}
        <rect x="238" y="58" width="204" height="284" fill="none" stroke="#00e676" strokeWidth="0.8" strokeOpacity="0.25" strokeDasharray="5 5" />

        {/* Corner brackets */}
        <g fill="none" stroke="#00e676" strokeWidth="2.5" strokeLinecap="round">
          <path d="M238,82 L238,58 L262,58" />
          <path d="M418,58 L442,58 L442,82" />
          <path d="M238,318 L238,342 L262,342" />
          <path d="M418,342 L442,342 L442,318" />
        </g>

        {/* Scan line */}
        <rect className="scan-line" x="239" y="58" width="202" height="1.2" fill="#00e676" fillOpacity="0.65" />

        {/* ─── PERSON label ─── */}
        <rect x="238" y="38" width="122" height="21" rx="2" fill="#00e676" />
        <text
          x="298"
          y="53"
          textAnchor="middle"
          fontFamily="'Courier New', monospace"
          fontSize="11"
          fontWeight="700"
          fill="#050d05"
        >
          PERSON · 0.97
        </text>

        {/* Confidence pill */}
        <rect x="366" y="38" width="76" height="21" rx="2" fill="none" stroke="#00e676" strokeWidth="1" />
        <rect x="368" y="40" width="70" height="17" rx="1" fill="#00e676" fillOpacity="0.18" />
        <text
          x="402"
          y="53"
          textAnchor="middle"
          fontFamily="'Courier New', monospace"
          fontSize="10"
          fill="#00e676"
        >
          CONF 97%
        </text>

        {/* ─── Left-side meta ─── */}
        <text x="14" y="72" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.38">SOURCE</text>
        <text x="14" y="86" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.28">CAM:0</text>
        <text x="14" y="99" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.28">640×480</text>
        <text x="14" y="112" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.28">BGR→RGB</text>

        <text x="14" y="148" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.38">MODEL</text>
        <text x="14" y="162" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.28">YOLOv8n</text>
        <text x="14" y="175" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.28">POSE</text>
        <text x="14" y="188" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.28">t: 12.4ms</text>

        {/* ─── Right-side meta ─── */}
        <text x="666" y="72" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.38" textAnchor="end">DETECT</text>
        <text x="666" y="86" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.28" textAnchor="end">n=1</text>
        <text x="666" y="99" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.28" textAnchor="end">ID:001</text>
        <text x="666" y="112" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.28" textAnchor="end">cls=0</text>

        <text x="666" y="148" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.38" textAnchor="end">POSE</text>
        <text x="666" y="162" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.28" textAnchor="end">kp=13</text>
        <text x="666" y="175" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.28" textAnchor="end">vis=13</text>
        <text x="666" y="188" fontFamily="'Courier New',monospace" fontSize="9" fill="#00e676" fillOpacity="0.28" textAnchor="end">σ=0.94</text>

        {/* ─── Horizontal divider + status bar ─── */}
        <line x1="0" y1="360" x2="680" y2="360" stroke="#00e676" strokeWidth="0.5" strokeOpacity="0.2" />
        <rect x="0" y="361" width="680" height="39" fill="#030903" />

        {/* MQTT status dot + text */}
        <circle className="blink-dot" cx="22" cy="380" r="5" fill="#00e676" />
        <text x="34" y="384" fontFamily="'Courier New',monospace" fontSize="11" fill="#00e676" fillOpacity="0.85">MQTT · CONNECTED</text>

        {/* Dividers */}
        <line x1="195" y1="365" x2="195" y2="395" stroke="#00e676" strokeWidth="0.4" strokeOpacity="0.2" />
        <line x1="360" y1="365" x2="360" y2="395" stroke="#00e676" strokeWidth="0.4" strokeOpacity="0.2" />
        <line x1="500" y1="365" x2="500" y2="395" stroke="#00e676" strokeWidth="0.4" strokeOpacity="0.2" />
        <line x1="610" y1="365" x2="610" y2="395" stroke="#00e676" strokeWidth="0.4" strokeOpacity="0.2" />

        <text x="278" y="384" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="11" fill="#00e676" fillOpacity="0.45">FRAME 0x04A2</text>
        <text x="430" y="384" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="11" fill="#00e676" fillOpacity="0.45">FPS 30.0</text>
        <text x="555" y="384" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="11" fill="#00e676" fillOpacity="0.45">ESP32 · TX</text>
        <text x="645" y="384" textAnchor="middle" fontFamily="'Courier New',monospace" fontSize="10" fill="#00e676" fillOpacity="0.25">YOLOv8</text>
      </svg>
    </div>
  );
};

export default CyberHumanDetection;
