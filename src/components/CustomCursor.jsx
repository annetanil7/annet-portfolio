import { useEffect, useRef } from 'react';

const CustomCursor = ({ scale = 1 }) => {
  const cursorRef = useRef(null);
  const cursorBorderRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorBorder = cursorBorderRef.current;
    
    if (cursor) {
      cursor.style.setProperty('--cursor-scale', scale);
    }
    if (cursorBorder) {
      cursorBorder.style.setProperty('--cursor-scale', scale);
    }
  }, [scale]);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorBorder = cursorBorderRef.current;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let borderX = 0;
    let borderY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Check for hero text first (bigger cursor)
      if (target.closest('[data-cursor-hero]')) {
        cursor?.classList.add('hero-hover');
        cursorBorder?.classList.add('hero-hover');
        cursor?.classList.remove('hover');
        cursorBorder?.classList.remove('hover');
      }
      // Regular hover for links and buttons (smaller cursor)
      else if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') ||
          target.closest('button') ||
          target.closest('[data-cursor-hover]')) {
        cursor?.classList.add('hover');
        cursorBorder?.classList.add('hover');
      }
    };

    const handleMouseOut = (e) => {
      const relatedTarget = e.relatedTarget;
      
      // Remove hero hover
      if (!relatedTarget?.closest('[data-cursor-hero]')) {
        cursor?.classList.remove('hero-hover');
        cursorBorder?.classList.remove('hero-hover');
      }
      
      // Remove regular hover
      if (!relatedTarget?.closest('a') && 
          !relatedTarget?.closest('button') &&
          !relatedTarget?.closest('[data-cursor-hover]')) {
        cursor?.classList.remove('hover');
        cursorBorder?.classList.remove('hover');
      }
    };

    const animate = () => {
      // Smooth cursor following
      const easing = 0.15;
      const easingBorder = 0.08;
      
      cursorX += (mouseX - cursorX) * easing;
      cursorY += (mouseY - cursorY) * easing;
      
      borderX += (mouseX - borderX) * easingBorder;
      borderY += (mouseY - borderY) * easingBorder;
      
      if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
      }
      
      if (cursorBorder) {
        cursorBorder.style.left = `${borderX}px`;
        cursorBorder.style.top = `${borderY}px`;
      }
      
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorBorderRef} className="custom-cursor-border" />
    </>
  );
};

export default CustomCursor;
