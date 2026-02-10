import { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Wait a moment before starting zoom animation
      setTimeout(() => {
        setIsZooming(true);
        // Call onLoadComplete after zoom animation completes
        setTimeout(() => {
          onLoadComplete();
        }, 1500);
      }, 500);
    }
  }, [progress, onLoadComplete]);

  return (
    <div className={`loading-screen ${isZooming ? 'zooming' : ''}`}>
      <div className="loading-container">
        {/* Desk and background */}
        <div className="room-background">
          <div className="wall"></div>
          <div className="desk"></div>
        </div>

        {/* Boy avatar */}
        <div className="boy-avatar">
          {/* Head */}
          <div className="head">
            <div className="hair"></div>
            <div className="face">
              <div className="eye left-eye"></div>
              <div className="eye right-eye"></div>
              <div className="mouth"></div>
            </div>
          </div>
          
          {/* Body */}
          <div className="body">
            <div className="arm left-arm typing"></div>
            <div className="arm right-arm typing"></div>
          </div>
        </div>

        {/* PC/Monitor */}
        <div className="pc-setup">
          <div className="monitor">
            <div className="screen">
              <div className="code-lines">
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="code-line"></div>
                <div className="code-line"></div>
              </div>
              <div className="cursor-blink"></div>
            </div>
            <div className="monitor-stand"></div>
          </div>
        </div>

        {/* Loading bar */}
        <div className="loading-bar-container">
          <div className="loading-text">Loading Portfolio...</div>
          <div className="loading-bar">
            <div 
              className="loading-progress" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="loading-percentage">{progress}%</div>
        </div>
      </div>

      {/* Zoom overlay for transition */}
      {isZooming && <div className="zoom-overlay"></div>}
    </div>
  );
};

export default LoadingScreen;
