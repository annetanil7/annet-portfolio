import { useEffect, useState } from 'react';
import './PageDoodles.css';

const PageDoodles = ({ page }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, [page]);

  const homeDoodles = (
    <>
      {/* Rocket doodle */}
      <svg className={`doodle doodle-rocket ${isVisible ? 'visible' : ''}`} width="100" height="100" viewBox="0 0 100 100">
        <path className="draw-path" d="M50 10 L55 40 L70 35 L60 50 L75 55 L50 90 L25 55 L40 50 L30 35 L45 40 Z" 
          fill="none" stroke="url(#gradient1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle className="draw-circle" cx="50" cy="30" r="5" fill="none" stroke="url(#gradient1)" strokeWidth="2"/>
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>

      {/* Star doodles */}
      <svg className={`doodle doodle-star1 ${isVisible ? 'visible' : ''}`} width="60" height="60" viewBox="0 0 60 60">
        <path className="draw-path" d="M30 10 L35 25 L50 30 L35 35 L30 50 L25 35 L10 30 L25 25 Z" 
          fill="none" stroke="#f59e0b" strokeWidth="2"/>
      </svg>

      <svg className={`doodle doodle-star2 ${isVisible ? 'visible' : ''}`} width="40" height="40" viewBox="0 0 40 40">
        <path className="draw-path" d="M20 5 L23 17 L35 20 L23 23 L20 35 L17 23 L5 20 L17 17 Z" 
          fill="none" stroke="#ec4899" strokeWidth="2"/>
      </svg>

      {/* Code brackets */}
      <svg className={`doodle doodle-code ${isVisible ? 'visible' : ''}`} width="80" height="80" viewBox="0 0 80 80">
        <path className="draw-path" d="M20 20 L10 40 L20 60" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round"/>
        <path className="draw-path" d="M60 20 L70 40 L60 60" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round"/>
      </svg>

      {/* Lightning bolt */}
      <svg className={`doodle doodle-lightning ${isVisible ? 'visible' : ''}`} width="50" height="70" viewBox="0 0 50 70">
        <path className="draw-path" d="M25 5 L15 35 L30 35 L20 65" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </>
  );

  const aboutDoodles = (
    <>
      {/* Coffee cup */}
      <svg className={`doodle doodle-coffee ${isVisible ? 'visible' : ''}`} width="80" height="90" viewBox="0 0 80 90">
        <rect className="draw-path" x="15" y="30" width="40" height="45" rx="5" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
        <path className="draw-path" d="M55 45 L65 45 Q70 45 70 50 Q70 55 65 55 L55 55" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
        <line className="draw-path" x1="25" y1="15" x2="25" y2="25" stroke="#ec4899" strokeWidth="2" strokeLinecap="round"/>
        <line className="draw-path" x1="35" y1="10" x2="35" y2="25" stroke="#ec4899" strokeWidth="2" strokeLinecap="round"/>
        <line className="draw-path" x1="45" y1="15" x2="45" y2="25" stroke="#ec4899" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      {/* Lightbulb */}
      <svg className={`doodle doodle-bulb ${isVisible ? 'visible' : ''}`} width="70" height="90" viewBox="0 0 70 90">
        <circle className="draw-circle" cx="35" cy="35" r="20" fill="none" stroke="#f59e0b" strokeWidth="2"/>
        <rect className="draw-path" x="28" y="55" width="14" height="15" rx="2" fill="none" stroke="#f59e0b" strokeWidth="2"/>
        <line className="draw-path" x1="35" y1="10" x2="35" y2="5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
        <line className="draw-path" x1="15" y1="20" x2="10" y2="15" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
        <line className="draw-path" x1="55" y1="20" x2="60" y2="15" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      {/* Book */}
      <svg className={`doodle doodle-book ${isVisible ? 'visible' : ''}`} width="80" height="70" viewBox="0 0 80 70">
        <rect className="draw-path" x="15" y="15" width="50" height="40" rx="2" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
        <line className="draw-path" x1="40" y1="15" x2="40" y2="55" stroke="#8b5cf6" strokeWidth="2"/>
        <line className="draw-path" x1="25" y1="25" x2="35" y2="25" stroke="#ec4899" strokeWidth="2" strokeLinecap="round"/>
        <line className="draw-path" x1="25" y1="35" x2="35" y2="35" stroke="#ec4899" strokeWidth="2" strokeLinecap="round"/>
        <line className="draw-path" x1="25" y1="45" x2="35" y2="45" stroke="#ec4899" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      {/* Pencil */}
      <svg className={`doodle doodle-pencil ${isVisible ? 'visible' : ''}`} width="90" height="90" viewBox="0 0 90 90">
        <path className="draw-path" d="M20 70 L30 60 L65 25 L75 35 L40 70 Z" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round"/>
        <path className="draw-path" d="M65 25 L75 35" stroke="#ec4899" strokeWidth="2"/>
      </svg>
    </>
  );

  const contactDoodles = (
    <>
      {/* Envelope */}
      <svg className={`doodle doodle-envelope ${isVisible ? 'visible' : ''}`} width="90" height="70" viewBox="0 0 90 70">
        <rect className="draw-path" x="10" y="15" width="70" height="45" rx="3" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
        <path className="draw-path" d="M10 15 L45 40 L80 15" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinejoin="round"/>
      </svg>

      {/* Phone */}
      <svg className={`doodle doodle-phone ${isVisible ? 'visible' : ''}`} width="70" height="90" viewBox="0 0 70 90">
        <rect className="draw-path" x="15" y="10" width="40" height="70" rx="8" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
        <circle className="draw-circle" cx="35" cy="70" r="4" fill="none" stroke="#8b5cf6" strokeWidth="2"/>
        <line className="draw-path" x1="28" y1="18" x2="42" y2="18" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      {/* Chat bubble */}
      <svg className={`doodle doodle-chat ${isVisible ? 'visible' : ''}`} width="90" height="80" viewBox="0 0 90 80">
        <rect className="draw-path" x="10" y="10" width="70" height="45" rx="8" fill="none" stroke="#f59e0b" strokeWidth="2"/>
        <path className="draw-path" d="M30 55 L30 65 L40 55" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round"/>
        <line className="draw-path" x1="22" y1="28" x2="68" y2="28" stroke="#ec4899" strokeWidth="2" strokeLinecap="round"/>
        <line className="draw-path" x1="22" y1="38" x2="55" y2="38" stroke="#ec4899" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      {/* Paper plane */}
      <svg className={`doodle doodle-plane ${isVisible ? 'visible' : ''}`} width="80" height="80" viewBox="0 0 80 80">
        <path className="draw-path" d="M10 40 L70 10 L50 70 L40 45 Z" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round"/>
        <line className="draw-path" x1="40" y1="45" x2="70" y2="10" stroke="#8b5cf6" strokeWidth="2"/>
      </svg>
    </>
  );

  return (
    <div className="page-doodles">
      {page === 'home' && homeDoodles}
      {page === 'about' && aboutDoodles}
      {page === 'contact' && contactDoodles}
    </div>
  );
};

export default PageDoodles;
