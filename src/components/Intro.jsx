import { useState, useEffect, useRef, useCallback } from 'react';
import DecryptedText from './DecryptedText';
import CountUp from './CountUp';
import './Intro.css';

const Intro = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const exitRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const duration = 2800;
    const interval = 50;
    const startTime = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(currentProgress));

      if (currentProgress >= 100 && !exitRef.current) {
        exitRef.current = true;
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => onDone(), 800);
        }, 400);
      }
    }, interval);

    return () => {
      clearInterval(timerRef.current);
      document.body.style.overflow = '';
    };
  }, [onDone]);

  const handleSkip = useCallback(() => {
    if (exitRef.current) return;
    exitRef.current = true;
    clearInterval(timerRef.current);
    setProgress(100);
    setIsExiting(true);
    setTimeout(() => onDone(), 800);
  }, [onDone]);

  return (
    <div className={`intro-overlay ${isExiting ? 'exit' : ''}`}>
      <div className="intro-bg" />

      <div className="intro-content">
        <div className="intro-letters">
          <DecryptedText
            text="Y / B"
            speed={100}
            maxIterations={5}
            sequential={true}
            revealDirection="start"
            animateOn="view"
            className="intro-letter-revealed"
            encryptedClassName="intro-letter-encrypted"
            characters="!@#$%?&*"
          />
        </div>

        <div className="intro-subtitle">Design × Security</div>
      </div>

      <div className="intro-bottom">
        <button className="intro-skip" onClick={handleSkip}>
          skip &rarr;
        </button>

        <div className="intro-counter">
          <CountUp
            from={0}
            to={100}
            duration={2.4}
            startWhen={true}
          />
          <span className="intro-counter-suffix">%</span>
        </div>
      </div>

      <div className="intro-progress-container">
        <div className="intro-progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default Intro;
