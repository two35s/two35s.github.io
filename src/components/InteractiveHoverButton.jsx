import React from 'react';
import { ArrowRight } from 'lucide-react';
import './InteractiveHoverButton.css';

export const InteractiveHoverButton = ({
  children,
  className = '',
  as: Component = 'button',
  ...props
}) => {
  return (
    <Component
      className={`interactive-hover-button ${className}`}
      {...props}
    >
      <div className="ihb-container-1">
        <div className="ihb-dot"></div>
        <span className="ihb-text-1">{children}</span>
      </div>
      <div className="ihb-container-2">
        <span>{children}</span>
        <ArrowRight size={20} />
      </div>
    </Component>
  );
};

export default InteractiveHoverButton;
