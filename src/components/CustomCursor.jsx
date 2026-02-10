import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailsRef = useRef([]);
  const lastTrailTime = useRef(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create trail effect
      const now = Date.now();
      if (now - lastTrailTime.current > 30) {
        createTrail(e.clientX, e.clientY);
        lastTrailTime.current = now;
      }
    };

    // Mouse over interactive elements
    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || 
          e.target.tagName === 'BUTTON' || 
          e.target.getAttribute('role') === 'button' ||
          e.target.closest('a') ||
          e.target.closest('button')) {
        cursor?.classList.add('hover');
      }
    };

    // Mouse out from interactive elements
    const handleMouseOut = (e) => {
      if (!e.relatedTarget?.closest('a') && 
          !e.relatedTarget?.closest('button') &&
          e.relatedTarget?.tagName !== 'A' &&
          e.relatedTarget?.tagName !== 'BUTTON') {
        cursor?.classList.remove('hover');
      }
    };

    // Mouse down effect
    const handleMouseDown = () => {
      cursor?.classList.add('click');
      createRipple(mouseX, mouseY);
    };

    // Mouse up effect
    const handleMouseUp = () => {
      cursor?.classList.remove('click');
    };

    // Smooth cursor animation
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      
      if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
      }
      
      requestAnimationFrame(animateCursor);
    };

    // Create trail particles
    const createTrail = (x, y) => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      document.body.appendChild(trail);

      setTimeout(() => {
        trail.remove();
      }, 600);
    };

    // Create ripple effect
    const createRipple = (x, y) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    animateCursor();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};

export default CustomCursor;
