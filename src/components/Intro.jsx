import { useState, useEffect } from 'react';
import './Intro.css';

const Intro = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let exitTimer;

    const handleExit = () => {
      clearInterval(timer);
      setIsExiting(true);
      exitTimer = setTimeout(() => {
        onDone();
      }, 800);
    };

    const duration = 2800;
    const interval = 28;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(Math.floor(currentProgress));

      if (currentProgress >= 100) {
        handleExit();
      }
    }, interval);

    return () => {
      clearInterval(timer);
      clearTimeout(exitTimer);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDone();
    }, 800);
  };

  return (
    <div className={`intro-overlay ${isExiting ? 'exit' : ''}`}>
      <div className="intro-content">
        <div className="intro-letters">
          <span>Y</span>
          <span>/</span>
          <span>B</span>
        </div>
        <div className="intro-subtitle">
          Design × Security
        </div>
      </div>

      <div className="intro-progress-container">
        <div 
          className="intro-progress-bar" 
          style={{ width: `${progress}%`, animation: 'none' }}
        />
      </div>

      <div className="intro-counter">
        {progress.toString().padStart(3, '0')}
      </div>

      <button className="intro-skip" onClick={handleSkip}>
        skip &rarr;
      </button>
    </div>
  );
};

export default Intro;
