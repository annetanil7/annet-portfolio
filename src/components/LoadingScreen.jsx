import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Smooth progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onLoadComplete, 800);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-[#0a0a0a] flex items-center justify-center transition-opacity duration-800 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="text-center space-y-8">
        {/* Elegant logo/text */}
        <div className="overflow-hidden">
          <h1 
            className="text-6xl md:text-8xl font-light tracking-tight text-white"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              animation: 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            ANNET
          </h1>
        </div>
        
        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="h-[1px] bg-white/10 relative overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 text-white/40 text-xs font-mono tracking-widest">
            {progress}%
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;

