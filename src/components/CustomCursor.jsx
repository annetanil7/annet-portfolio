import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorBorderRef = useRef(null);

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
      if (e.target.tagName === 'A' || 
          e.target.tagName === 'BUTTON' || 
          e.target.closest('a') ||
          e.target.closest('button')) {
        cursor?.classList.add('hover');
        cursorBorder?.classList.add('hover');
      }
    };

    const handleMouseOut = (e) => {
      if (!e.relatedTarget?.closest('a') && 
          !e.relatedTarget?.closest('button')) {
        cursor?.classList.remove('hover');
        cursorBorder?.classList.remove('hover');
      }
    };

    const animate = () => {
      // Cursor follows immediately
      cursorX += (mouseX - cursorX) * 0.3;
      cursorY += (mouseY - cursorY) * 0.3;
      
      // Border follows with delay
      borderX += (mouseX - borderX) * 0.1;
      borderY += (mouseY - borderY) * 0.1;
      
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
