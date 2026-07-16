import { useRef, useState, useCallback } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import './MagneticButton.css';

const MagneticButton = ({
  children,
  href,
  to,
  as: Component,
  onClick,
  variant = 'primary',
  icon = 'arrow',
  className = '',
  ...props
}) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.25 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
  }, []);

  const handleClick = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    const ripple = { x, y, id };
    setRipples((prev) => [...prev, ripple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
    onClick?.(e);
  }, [onClick]);

  const renderIcon = () => {
    if (icon === 'arrow') return <ArrowRight size={18} className="btn-icon" />;
    if (icon === 'download') return <Download size={18} className="btn-icon" />;
    return null;
  };

  const classes = `magnetic-btn btn-${variant} ${className}`.trim();

  const content = (
    <>
      <span className="btn-text">{children}</span>
      {renderIcon()}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="btn-ripple"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </>
  );

  const style = {
    transform: `translate(${pos.x}px, ${pos.y}px)`,
  };

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <a
        ref={ref}
        href={to}
        className={classes}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...props}
      >
        {content}
      </a>
    );
  }

  if (Component) {
    return (
      <Component
        ref={ref}
        className={classes}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...props}
      >
        {content}
      </Component>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {content}
    </button>
  );
};

export default MagneticButton;
