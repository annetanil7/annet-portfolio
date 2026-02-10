import { useEffect, useRef, useState } from 'react';

const ScrollBuddy = () => {
  const buddyRef = useRef(null);
  const eyesRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isWalking, setIsWalking] = useState(false);
  const lastScrollY = useRef(0);
  const walkTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      
      setScrollProgress(Math.min(progress, 100));
      
      // Detect if scrolling
      if (Math.abs(scrollTop - lastScrollY.current) > 5) {
        setIsWalking(true);
        clearTimeout(walkTimeout.current);
        walkTimeout.current = setTimeout(() => setIsWalking(false), 200);
      }
      lastScrollY.current = scrollTop;
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
      clearTimeout(walkTimeout.current);
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
    const maxMove = 3;
    const eyeX = Math.cos(angle) * maxMove;
    const eyeY = Math.sin(angle) * maxMove;
    
    eyesRef.current.style.transform = `translate(${eyeX}px, ${eyeY}px)`;
  }, [mousePos]);

  return (
    <div 
      ref={buddyRef}
      className="fixed bottom-8 right-8 z-50 pointer-events-none"
      style={{
        transform: `translateY(-${scrollProgress * 3}px)`,
        transition: 'transform 0.1s linear'
      }}
    >
      {/* Character container */}
      <div className="relative">
        {/* Body */}
        <svg width="80" height="100" viewBox="0 0 80 100" className={isWalking ? 'animate-bounce' : ''}>
          {/* Head */}
          <circle cx="40" cy="25" r="18" fill="#FFE4B5" stroke="#333" strokeWidth="2"/>
          
          {/* Hair */}
          <path d="M 22 20 Q 25 10, 40 12 Q 55 10, 58 20" fill="#8B4513" stroke="#333" strokeWidth="1.5"/>
          
          {/* Eyes container */}
          <g ref={eyesRef}>
            {/* Left eye */}
            <circle cx="33" cy="25" r="3" fill="#333"/>
            {/* Right eye */}
            <circle cx="47" cy="25" r="3" fill="#333"/>
          </g>
          
          {/* Smile */}
          <path d="M 32 32 Q 40 36, 48 32" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round"/>
          
          {/* Body */}
          <rect x="28" y="42" width="24" height="28" rx="4" fill="#4A90E2" stroke="#333" strokeWidth="2"/>
          
          {/* Arms */}
          <line x1="28" y1="50" x2="18" y2={isWalking ? "55" : "58"} stroke="#FFE4B5" strokeWidth="4" strokeLinecap="round"/>
          <line x1="52" y1="50" x2="62" y2={isWalking ? "58" : "55"} stroke="#FFE4B5" strokeWidth="4" strokeLinecap="round"/>
          
          {/* Legs - animated when walking */}
          <line x1="35" y1="70" x2="30" y2={isWalking ? "85" : "88"} stroke="#4A90E2" strokeWidth="5" strokeLinecap="round"/>
          <line x1="45" y1="70" x2="50" y2={isWalking ? "88" : "85"} stroke="#4A90E2" strokeWidth="5" strokeLinecap="round"/>
          
          {/* Feet */}
          <ellipse cx="30" cy={isWalking ? "88" : "90"} rx="6" ry="3" fill="#333"/>
          <ellipse cx="50" cy={isWalking ? "90" : "88"} rx="6" ry="3" fill="#333"/>
        </svg>
        
        {/* Speech bubble when at bottom */}
        {scrollProgress > 95 && (
          <div className="absolute -top-12 -left-20 bg-white text-black px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap animate-bounce">
            You made it! 🎉
            <div className="absolute bottom-[-6px] right-8 w-3 h-3 bg-white transform rotate-45"></div>
          </div>
        )}
      </div>
      
      {/* Progress indicator */}
      <div className="absolute -left-16 top-1/2 transform -translate-y-1/2">
        <div className="text-white text-xs font-mono bg-black/50 px-2 py-1 rounded">
          {Math.round(scrollProgress)}%
        </div>
      </div>
    </div>
  );
};

export default ScrollBuddy;
