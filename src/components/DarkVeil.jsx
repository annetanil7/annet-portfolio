import React, { useEffect, useRef } from 'react';

export const DarkVeil = ({
  hueShift = -15,
  noiseIntensity = 0,
  scanlineIntensity = 0,
  speed = 0.8,
  scanlineFrequency = 0,
  warpAmount = 0,
  resolutionScale = 1,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Create gradient background with hue shift
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      
      // Apply hue shift to purple/dark tones
      const hue = 270 + hueShift; // Purple base
      gradient.addColorStop(0, `hsl(${hue}, 30%, 15%)`);
      gradient.addColorStop(0.5, `hsl(${hue + 20}, 25%, 10%)`);
      gradient.addColorStop(1, `hsl(${hue - 20}, 20%, 8%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add noise if enabled
      if (noiseIntensity > 0) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() - 0.5) * noiseIntensity * 50;
          data[i] += noise;
          data[i + 1] += noise;
          data[i + 2] += noise;
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // Add subtle scanlines if enabled
      if (scanlineIntensity > 0) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${scanlineIntensity * 0.05})`;
        ctx.lineWidth = 1;
        
        for (let i = 0; i < height; i += 2) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(width, i);
          ctx.stroke();
        }
      }

      time += speed * 0.016;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [hueShift, noiseIntensity, scanlineIntensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
      }}
    />
  );
};
