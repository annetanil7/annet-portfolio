import { useEffect, useRef, useState } from 'react';

const ScrollBuddy = () => {
  const buddyRef = useRef(null);
  const eyesRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      
      setScrollProgress(Math.min(progress, 100));
    };

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate eye direction
  useEffect(() => {
    if (!buddyRef.current || !eyesRef.current) return;
    
    const buddyRect = buddyRef.current.getBoundingClientRect();
    const buddyX = buddyRect.left + buddyRect.width / 2;
    const buddyY = buddyRect.top + buddyRect.height / 2;
    
    const deltaX = mousePos.x - buddyX;
    const deltaY = mousePos.y - buddyY;
    const angle = Math.atan2(deltaY, deltaX);
    
    // Limit eye movement
    const maxMove = 2.5;
    const eyeX = Math.cos(angle) * maxMove;
    const eyeY = Math.sin(angle) * maxMove;
    
    eyesRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
  }, [mousePos]);

  return (
    <div 
      ref={buddyRef}
      className="fixed bottom-6 right-6 z-40 pointer-events-none opacity-60 hover:opacity-100 transition-opacity duration-300"
      style={{
        transform: `translateY(-${scrollProgress * 2.5}px)`,
        transition: 'transform 0.1s linear, opacity 0.3s ease'
      }}
    >
      {/* Minimalist character */}
      <div className="relative">
        <svg width="60" height="75" viewBox="0 0 60 75" className="filter drop-shadow-lg">
          {/* Head */}
          <circle cx="30" cy="20" r="14" fill="#ffffff" stroke="#0a0a0a" strokeWidth="1.5" opacity="0.9"/>
          
          {/* Eyes container with smooth tracking */}
          <g ref={eyesRef} style={{ transition: 'transform 0.1s ease-out' }}>
            <circle cx="25" cy="20" r="2" fill="#0a0a0a"/>
            <circle cx="35" cy="20" r="2" fill="#0a0a0a"/>
          </g>
          
          {/* Smile */}
          <path d="M 24 25 Q 30 27, 36 25" stroke="#0a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
          
          {/* Body */}
          <rect x="22" y="33" width="16" height="20" rx="3" fill="#ffffff" stroke="#0a0a0a" strokeWidth="1.5" opacity="0.9"/>
          
          {/* Arms - subtle */}
          <line x1="22" y1="40" x2="15" y2="45" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
          <line x1="38" y1="40" x2="45" y2="45" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
          
          {/* Legs */}
          <line x1="26" y1="53" x2="24" y2="65" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.9"/>
          <line x1="34" y1="53" x2="36" y2="65" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.9"/>
          
          {/* Feet */}
          <ellipse cx="24" cy="67" rx="4" ry="2" fill="#0a0a0a" opacity="0.8"/>
          <ellipse cx="36" cy="67" rx="4" ry="2" fill="#0a0a0a" opacity="0.8"/>
        </svg>
        
        {/* Minimal progress indicator */}
        <div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
          <div className="text-white/40 text-[10px] font-mono tracking-wider">
            {Math.round(scrollProgress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollBuddy;
