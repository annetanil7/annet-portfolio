import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, User, Mail, MessageCircle } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen.jsx';
import CustomCursor from './components/CustomCursor.jsx';

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState({ years: 0, certs: 0, courses: 0, hours: 0 });
  const [magneticButtonPos, setMagneticButtonPos] = useState({ x: 0, y: 0 });
  const [cursorScale, setCursorScale] = useState(2.5);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -100px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Cursor size based on scroll (bigger at top, normal when scrolled)
      const heroHeight = 800;
      const scale = currentScrollY < heroHeight ? 1 + (1 - currentScrollY / heroHeight) * 1.5 : 1;
      setCursorScale(scale);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);

      const statsSection = document.getElementById('stats-section');
      if (statsSection && !statsVisible) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) setStatsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, statsVisible]);

  useEffect(() => {
    if (!statsVisible) return;
    const duration = 2000;
    const targets = { years: 3, certs: 5, courses: 20, hours: 100 };
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounters({
        years: Math.floor(targets.years * progress),
        certs: Math.floor(targets.certs * progress),
        courses: Math.floor(targets.courses * progress),
        hours: Math.floor(targets.hours * progress)
      });
      if (step >= steps) {
        setCounters(targets);
        clearInterval(timer);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [statsVisible]);

  const handleMagneticMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 100;
    
    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance;
      setMagneticButtonPos({ x: x * force * 0.3, y: y * force * 0.3 });
    } else {
      setMagneticButtonPos({ x: 0, y: 0 });
    }
  };

  const handleMagneticLeave = () => setMagneticButtonPos({ x: 0, y: 0 });

  const handleWhatsAppClick = () => {
    const phoneNumber = "971505367089"; // Your WhatsApp number
    const message = "Hello Annet, Let's get in touch!";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };



  const testimonials = [
    { name: "Priya Sharma", handle: "@annet", text: "Annet's creativity knows no bounds! His designs captured our brand's personality perfectly.", avatar: "https://framerusercontent.com/images/rfltlkHNBMe4GNB0krcido5DUo.png?width=96&height=96" },
    { name: "Rahul Patel", handle: "@annet", text: "Working with Annet was a breeze. He's incredibly professional.", avatar: "https://framerusercontent.com/images/tkxUeAMAvezJfStzlC5WUqzGo8.png?width=96&height=96" },
    { name: "Anjali Desai", handle: "@annet", text: "He transformed our vision into a beautiful, functional design.", avatar: "https://framerusercontent.com/images/JPAXJcJi9UocMstnHqoXvlLk7Kw.png?width=96&height=96" },
    { name: "Arjun Singh", handle: "@annet", text: "Annet's design work is always fresh and innovative.", avatar: "https://framerusercontent.com/images/ngouQHyCcR2vAioHy5WZW1PIbk.png?width=96&height=96" }
  ];

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      
      <CustomCursor scale={cursorScale} />
      <div className="font-sans antialiased overflow-hidden relative bg-black min-h-screen">
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out forwards; }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in { animation: scale-in 0.6s ease-out forwards; }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(167, 139, 250, 0.3); }
          50% { box-shadow: 0 0 40px rgba(167, 139, 250, 0.6); }
        }
        .animate-glow-pulse { animation: glow-pulse 3s ease-in-out infinite; }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        
        .scroll-animate {
          opacity: 0;
          transform: translateY(100px) rotateX(20deg);
          transform-style: preserve-3d;
          perspective: 1000px;
          transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0) rotateX(0deg);
        }
        
        .scroll-animate:nth-child(1) { transition-delay: 0s; }
        .scroll-animate:nth-child(2) { transition-delay: 0.05s; }
        .scroll-animate:nth-child(3) { transition-delay: 0.1s; }
        .scroll-animate:nth-child(4) { transition-delay: 0.15s; }
        .scroll-animate:nth-child(5) { transition-delay: 0.2s; }
        .scroll-animate:nth-child(6) { transition-delay: 0.25s; }
        .scroll-animate:nth-child(7) { transition-delay: 0.3s; }
        .scroll-animate:nth-child(8) { transition-delay: 0.35s; }
        .scroll-animate:nth-child(9) { transition-delay: 0.4s; }
        .scroll-animate:nth-child(10) { transition-delay: 0.45s; }
        .scroll-animate:nth-child(11) { transition-delay: 0.5s; }
        .scroll-animate:nth-child(12) { transition-delay: 0.55s; }
        .scroll-animate:nth-child(13) { transition-delay: 0.6s; }
        .scroll-animate:nth-child(14) { transition-delay: 0.65s; }
        .scroll-animate:nth-child(15) { transition-delay: 0.7s; }
        .scroll-animate:nth-child(16) { transition-delay: 0.75s; }
        
        @keyframes reveal-slide {
          from {
            opacity: 0;
            transform: translateY(80px) scale(0.9);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        
        .scroll-reveal {
          opacity: 0;
          animation: reveal-slide 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 50%, #0a0a14 100%);
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          mix-blend-mode: screen;
          opacity: 0.7;
          animation: float 20s ease-in-out infinite;
        }
        .gradient-orb-1 { width: 500px; height: 500px; background: linear-gradient(45deg, #6d28d9, #4c1d95); top: 10%; left: 10%; }
        .gradient-orb-2 { width: 400px; height: 400px; background: linear-gradient(45deg, #7c3aed, #5b21b6); top: 50%; right: 10%; animation-delay: 5s; }
        .gradient-orb-3 { width: 600px; height: 600px; background: linear-gradient(45deg, #8b5cf6, #6d28d9); bottom: 10%; left: 30%; animation-delay: 10s; }
        .gradient-orb-4 { width: 450px; height: 450px; background: linear-gradient(45deg, #a78bfa, #7c3aed); top: 30%; left: 50%; animation-delay: 7s; }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        
        .magnetic-button {
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
        }
        .magnetic-button:hover { box-shadow: none; }
        
        .hero-text-line {
          display: inline-block;
          position: relative;
          transition: all 0.3s ease;
          color: #a78bfa;
        }
        
        .digital-designer-text-hero {
          position: relative;
          cursor: none;
        }
        
        .digital-designer-text-hero:hover .hero-text-line {
          background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shimmer 2s ease infinite;
        }
        
        @keyframes gradient-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        /* ===== CINEMATIC ENTRANCE ANIMATIONS ===== */
        @keyframes cinematic-fade-in {
          0% {
            opacity: 0;
            transform: scale(1.1);
            filter: blur(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
        }
        
        @keyframes text-rise {
          0% {
            opacity: 0;
            transform: translateY(120px) rotateX(45deg);
            filter: blur(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
            filter: blur(0);
          }
        }
        
        @keyframes glow-in {
          0% {
            opacity: 0;
            text-shadow: 0 0 0px rgba(167, 139, 250, 0);
          }
          100% {
            opacity: 1;
            text-shadow: 0 0 30px rgba(167, 139, 250, 0.8), 0 0 60px rgba(139, 92, 246, 0.4);
          }
        }
        
        @keyframes slide-up-stagger {
          0% {
            opacity: 0;
            transform: translateY(100px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes button-pulse-glow {
          0% {
            box-shadow: 0 0 20px rgba(167, 139, 250, 0.3), 0 0 40px rgba(139, 92, 246, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(167, 139, 250, 0.6), 0 0 80px rgba(139, 92, 246, 0.3);
          }
          100% {
            box-shadow: 0 0 20px rgba(167, 139, 250, 0.3), 0 0 40px rgba(139, 92, 246, 0.1);
          }
        }
        
        @keyframes particle-float {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) translateX(0);
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .hero-digital { animation: text-rise 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .hero-digital-delay { animation: text-rise 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards; }
        .hero-description { animation: slide-up-stagger 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s forwards; opacity: 0; }
        .hero-button { animation: slide-up-stagger 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.7s forwards, button-pulse-glow 2.5s ease-in-out 1.7s infinite; opacity: 0; }
        
        /* ===== PROFESSIONAL HERO TEXT ANIMATIONS ===== */
        @keyframes hero-text-split-reveal {
          0% {
            opacity: 0;
            transform: translateY(100px) scaleY(0.5) rotateX(60deg);
            filter: blur(20px);
          }
          50% {
            opacity: 0.7;
            transform: translateY(10px) scaleY(0.95) rotateX(10deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scaleY(1) rotateX(0deg);
            filter: blur(0);
          }
        }
        
        @keyframes hero-text-glow-pulse {
          0% {
            text-shadow: 0 0 10px rgba(167, 139, 250, 0.2), 0 0 20px rgba(167, 139, 250, 0);
          }
          50% {
            text-shadow: 0 0 20px rgba(167, 139, 250, 0.6), 0 0 40px rgba(139, 92, 246, 0.4), 0 0 80px rgba(167, 139, 250, 0.2);
          }
          100% {
            text-shadow: 0 0 10px rgba(167, 139, 250, 0.2), 0 0 20px rgba(167, 139, 250, 0);
          }
        }
        
        @keyframes hero-line-draw-premium {
          0% {
            width: 0;
            opacity: 0;
            box-shadow: 0 0 0px rgba(167, 139, 250, 0);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 10px rgba(167, 139, 250, 0.5), 0 0 20px rgba(139, 92, 246, 0.2);
          }
          100% {
            width: 100%;
            opacity: 1;
            box-shadow: 0 0 20px rgba(167, 139, 250, 0.3), 0 0 40px rgba(139, 92, 246, 0.1);
          }
        }
        
        @keyframes word-highlight-flow {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        /* ===== HOVER ANIMATIONS FOR HERO TEXT ===== */
        @keyframes text-hover-expand {
          0% {
            transform: scaleX(1) scaleY(1);
            letter-spacing: -0.02em;
          }
          50% {
            letter-spacing: 0.05em;
          }
          100% {
            transform: scaleX(1.02) scaleY(1.08);
            letter-spacing: 0.05em;
          }
        }
        
        @keyframes glow-intensify {
          0% {
            text-shadow: 0 0 10px rgba(167, 139, 250, 0.2), 0 0 20px rgba(167, 139, 250, 0);
          }
          100% {
            text-shadow: 0 0 30px rgba(167, 139, 250, 1), 0 0 60px rgba(139, 92, 246, 0.6), 0 0 100px rgba(167, 139, 250, 0.3);
          }
        }
        
        @keyframes shine-effect {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes color-shift {
          0% {
            background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #6d28d9 100%);
          }
          50% {
            background: linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #9333ea 100%);
          }
          100% {
            background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #6d28d9 100%);
          }
        }
        
        @keyframes line-glow-expand {
          0% {
            box-shadow: 0 0 20px rgba(167, 139, 250, 0.3), 0 0 40px rgba(139, 92, 246, 0.1);
          }
          100% {
            box-shadow: 0 0 30px rgba(167, 139, 250, 0.8), 0 0 60px rgba(139, 92, 246, 0.4), 0 0 100px rgba(167, 139, 250, 0.2);
          }
        }
        
        .hero-text-professional {
          position: relative;
          font-weight: 900;
          letter-spacing: -0.02em;
          animation: hero-text-split-reveal 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards, hero-text-glow-pulse 3s ease-in-out 1.4s infinite;
          background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #6d28d9 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 100%;
          cursor: default;
        }
        
        .hero-digital-word { animation: hero-text-split-reveal 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s forwards; }
        .hero-designer-word { animation: hero-text-split-reveal 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s forwards; }
        
        
        .hero-line-premium {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          height: 4px;
          background: linear-gradient(90deg, transparent, #a78bfa, #7c3aed, #a78bfa, transparent);
          border-radius: 2px;
          box-shadow: 0 0 20px rgba(167, 139, 250, 0.3);
          animation: hero-line-draw-premium 2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards;
          width: 0;
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        
        .cinematic-bg { animation: cinematic-fade-in 1.5s cubic-bezier(0.2, 0.6, 0.8, 1) forwards; }
        
        .particle {
          position: absolute;
          pointer-events: none;
        }
        
        .particle-1 { width: 4px; height: 4px; background: rgba(167, 139, 250, 0.8); border-radius: 50%; animation: particle-float 4s ease-in-out infinite; }
        .particle-2 { width: 6px; height: 6px; background: rgba(139, 92, 246, 0.6); border-radius: 50%; animation: particle-float 5s ease-in-out 1s infinite; }
        .particle-3 { width: 3px; height: 3px; background: rgba(168, 85, 247, 0.7); border-radius: 50%; animation: particle-float 6s ease-in-out 2s infinite; }
        
        @keyframes shimmer-text {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .shimmer-effect {
          background: linear-gradient(90deg, #a78bfa, #7c3aed, #a78bfa);
          background-size: 200% 100%;
          animation: shimmer-text 3s ease-in-out infinite;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .hero-line {
          position: relative;
          display: inline-block;
        }
        
        .hero-line::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #a78bfa, #7c3aed);
          animation: line-draw 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s forwards;
        }
        
        @keyframes line-draw {
          0% { width: 0; }
          100% { width: 100%; }
        }
        
        /* Enhanced orb animations */
        @keyframes float-cinematic {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(30px, -40px) scale(1.05) rotate(90deg); }
          50% { transform: translate(-20px, 20px) scale(0.95) rotate(180deg); }
          75% { transform: translate(40px, 10px) scale(1.08) rotate(270deg); }
        }
        
        .gradient-orb.cinematic { animation: float-cinematic 25s ease-in-out infinite !important; }
        
        
        @keyframes icon-slide-out {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(50px); opacity: 0; }
        }
        
        @keyframes text-slide-in {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .nav-icon-button {
          position: relative;
          overflow: hidden;
          min-width: 48px;
          transition: all 0.3s ease;
        }
        
        .nav-icon-button:hover {
          min-width: 140px;
        }
        
        .icon-inner {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .nav-icon-button:hover .icon-inner {
          opacity: 0;
          transform: translate(-50%, -50%) translateX(50px);
        }
        
        .label-tooltip {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: all 0.3s ease;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }
        
        .nav-icon-button:hover .label-tooltip {
          opacity: 1;
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-320px * 4 - 24px * 4)); }
        }
        .animate-scroll { animation: scroll 40s linear infinite; }
        
        /* Particle grid animation */
        @keyframes particle-float {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(10px, -10px);
            opacity: 0.6;
          }
        }
        
        @keyframes line-draw {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        /* Animated blob effect */
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        /* Enhanced card hover effects */
        .card-hover {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }
        
        .card-hover::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle 400px at var(--mx, 50%) var(--my, 50%), rgba(167, 139, 250, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .card-hover:hover::before {
          opacity: 1;
        }
        
        .card-hover:hover {
          transform: translateY(-8px);
        }
      `}</style>

      <nav className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 sm:py-4 md:py-5 lg:py-6 flex items-center justify-between gap-2 sm:gap-3 md:gap-4 bg-gradient-to-r from-gray-100 to-gray-200 backdrop-blur-2xl border border-gray-300 shadow-2xl rounded-full">
          <button onClick={() => { setCurrentPage('home'); window.scrollTo(0, 0); }} className="text-xs sm:text-xs md:text-lg lg:text-2xl xl:text-3xl font-bold tracking-widest hover:text-gray-700 transition-colors text-black whitespace-nowrap flex-shrink-0">
            ANNET ANIL
          </button>
          
          <div className="flex md:absolute md:left-1/2 md:-translate-x-1/2 items-center gap-0.5 sm:gap-1 md:gap-3 flex-shrink-0">
            <div className="group relative hidden sm:block">
              <button onClick={() => { setCurrentPage('about'); window.scrollTo(0, 0); }} className="nav-icon-button h-8 sm:h-9 md:h-12 rounded-lg sm:rounded-xl bg-black/10 hover:bg-black/10 backdrop-blur-xl border border-black/20 hover:border-black/30 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 md:gap-3 px-1.5 sm:px-2 md:px-4 shadow-lg hover:shadow-xl">
                <div className="icon-inner flex-shrink-0"><User size={12} className="text-black sm:block hidden" /></div>
                <span className="label-tooltip text-black flex-1 text-center text-xs md:text-sm">About</span>
              </button>
            </div>
            <div className="group relative hidden sm:block">
              <button onClick={() => { setCurrentPage('contact'); window.scrollTo(0, 0); }} className="nav-icon-button h-8 sm:h-9 md:h-12 rounded-lg sm:rounded-xl bg-black/10 hover:bg-black/10 backdrop-blur-xl border border-black/20 hover:border-black/30 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 md:gap-3 px-1.5 sm:px-2 md:px-4 shadow-lg hover:shadow-xl">
                <div className="icon-inner flex-shrink-0"><Mail size={12} className="text-black sm:block hidden" /></div>
                <span className="label-tooltip text-black flex-1 text-center text-xs md:text-sm">Contact</span>
              </button>
            </div>
            <div className="group relative">
              <button onClick={handleWhatsAppClick} className="nav-icon-button h-8 sm:h-9 md:h-12 rounded-lg sm:rounded-xl bg-black/10 hover:bg-black/10 backdrop-blur-xl border border-black/20 hover:border-black/30 transition-all duration-300 flex items-center justify-center gap-0.5 sm:gap-1.5 md:gap-3 px-1.5 sm:px-2 md:px-4 shadow-lg hover:shadow-xl flex-shrink-0">
                <div className="icon-inner flex-shrink-0"><MessageCircle size={12} className="text-black" /></div>
                <span className="label-tooltip text-black flex-1 text-center text-xs md:text-sm whitespace-nowrap hidden sm:inline">Get in touch</span>
              </button>
            </div>
          </div>

          <button onClick={handleWhatsAppClick} className="hidden md:block px-3 md:px-4 lg:px-5 py-1.5 md:py-2 lg:py-2.5 bg-black hover:bg-black/80 text-white rounded-lg md:rounded-xl font-semibold transition-all duration-300 border border-black text-xs md:text-sm lg:text-sm flex-shrink-0">
            Get In Touch
          </button>
        </div>
      </nav>

      {/* Page Doodles */}

      <div className="pt-12 sm:pt-14 md:pt-20">
        {currentPage === 'home' && (
          <div className="min-h-screen bg-black text-white">
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
              {/* Solid black background */}
              <div className="absolute inset-0 bg-black"></div>
              
              {/* Animated dot grid pattern - increased opacity */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 2px)',
                backgroundSize: '60px 60px',
                animation: 'particle-float 20s ease-in-out infinite'
              }}></div>
              
              {/* Horizontal lines */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '100% 80px'
              }}></div>
              
              {/* Vertical lines */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '80px 100%'
              }}></div>
              
              {/* Center spotlight */}
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)'
              }}></div>

              <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 text-center py-4 sm:py-0">
                <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-[160px] 2xl:text-[200px] font-black mb-3 sm:mb-4 md:mb-6 lg:mb-8 2xl:mb-12 leading-tight sm:leading-none tracking-tight" data-cursor-hero>
                  <span className="inline-block relative group">
                    <span className="block text-white">DIGITAL</span>
                    <span className="block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">DESIGNER</span>
                  </span>
                </h1>
                <p className="text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl mb-4 sm:mb-6 md:mb-8 lg:mb-12 2xl:mb-16 max-w-4xl 2xl:max-w-5xl mx-auto hero-description text-gray-300 px-1 sm:px-2">
                  Turning Your Ideas Into Code, Design Into Experiences, And Curiosity Into Innovation.
                </p>
                
                {/* Resume Download Button */}
                <div className="mb-6 sm:mb-8 md:mb-10">
                  <a 
                    href="/annet-portfolio/resume.pdf" 
                    download="Annet_Anil_Resume.pdf"
                    className="resume-button group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold text-sm md:text-base hover:bg-gray-100 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </a>
                </div>
                
                <div className="inline-flex items-center gap-2 text-sm sm:text-base md:text-lg text-white/80">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Open for projects</span>
                </div>
              </div>
            </section>

            <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-black relative overflow-hidden">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl"></div>
              <div className="max-w-7xl mx-auto relative z-10">
                <p className="text-white/60 text-xs sm:text-sm uppercase tracking-wider mb-6 sm:mb-8 lg:mb-12 scroll-animate">SERVICES</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                  {[
                    { title: "Websites", desc: "Responsive websites and dashboards for your business.", img: "https://framerusercontent.com/images/R6tZri3DeU1y7vYp1lvvIRx34hw.png?width=880&height=664" },
                    { title: "Apps", desc: "Designing mobile apps for iOS and Android users.", img: "https://framerusercontent.com/images/Wv5ApfmhBWVowNlSdTibfFf7n4.png?width=782&height=664" },
                    { title: "Design systems", desc: "Building robust and flexible design systems.", img: "https://framerusercontent.com/images/lbl3Dgyn88F7HroT72YYL2cr5c.png?width=880&height=648" }
                  ].map((service, idx) => (
                    <div key={idx} className="group scroll-animate card-hover relative overflow-hidden rounded-2xl bg-zinc-950/40 border border-white/5 hover:border-white/30 transition-all duration-500 cursor-pointer backdrop-blur-sm hover:bg-zinc-950/80" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-gray-500/0 group-hover:from-white/5 group-hover:to-gray-500/5 transition-all duration-500"></div>
                      <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 relative z-10">
                        <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4 group-hover:text-white transition-all duration-300">{service.title}</h3>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 mb-4 sm:mb-6 lg:mb-8 group-hover:text-gray-300 transition-colors">{service.desc}</p>
                      </div>
                      <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pb-4 sm:pb-6 md:pb-8 lg:pb-10 xl:pb-12 relative z-10">
                        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-zinc-900">
                          <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-900">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8">Why Me?</h2>
                <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-gray-300 mb-8 sm:mb-12 leading-relaxed">
                  From writing clean code to exploring cybersecurity and cloud technologies, I enjoy building things that <span className="text-white font-semibold">look good, work smart, and solve real problems</span>.
                </p>
                
                <div id="stats-section" className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 mb-8 sm:mb-12 lg:mb-16 xl:mb-20">
                  {[
                    { number: counters.years, label: "Years of experience", suffix: "+" },
                    { number: counters.certs, label: "Certifications", suffix: "+" },
                    { number: counters.courses, label: "Courses", suffix: "+" },
                    { number: counters.hours, label: "Training hours", suffix: "+" }
                  ].map((stat, idx) => (
                    <div key={idx} className="text-center group">
                      <div className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-2 sm:mb-4 lg:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                        {stat.number}{stat.suffix}
                      </div>
                      <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button onClick={() => setCurrentPage('about')} className="group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 sm:py-4 bg-white text-black rounded-full font-semibold text-xs sm:text-sm md:text-base hover:bg-gray-100 transition-all duration-300">
                    Know More
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                  </button>
                </div>
              </div>
            </section>

            <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-black overflow-hidden">
              <div className="max-w-7xl mx-auto mb-8 sm:mb-12">
                <p className="text-white/60 text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Testimonials</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">A few words</h2>
              </div>
              
              <div className="relative">
                <div className="flex gap-4 sm:gap-6 animate-scroll">
                  {[...testimonials, ...testimonials].map((testimonial, idx) => (
                    <div key={idx} className="flex-shrink-0 w-72 sm:w-80 card-hover bg-zinc-900 p-4 sm:p-6 md:p-8 rounded-2xl hover:bg-zinc-800 hover:border-white/30 transition-all duration-300 border border-white/5">
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <img src={testimonial.avatar} alt={testimonial.name} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full animate-scale-in" />
                        <div>
                          <div className="font-semibold text-white text-sm sm:text-base">{testimonial.name}</div>
                          <div className="text-gray-500 text-xs sm:text-sm">{testimonial.handle}</div>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed hover:text-gray-100 transition-colors">{testimonial.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-zinc-900">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8 sm:mb-12">
                  <p className="text-white/60 text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Latest</p>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Updates</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {[
                    { img: "https://framerusercontent.com/images/G2bGWS3fpuCWP0RHxsbNkhEwpY.jpeg?width=2400&height=1800", title: "How to build a top notch portfolio", date: "Jul 3, 2025" },
                    { img: "https://framerusercontent.com/images/UydfJ3QaCp68g0hszokz70rNuA.jpeg?width=2400&height=1800", title: "How to reach new clients as a designer", date: "Jun 1, 2025" }
                  ].map((post, idx) => (
                    <div key={idx} className="group card-hover cursor-pointer bg-black rounded-2xl overflow-hidden border border-white/5 hover:border-white/30 transition-all duration-500 animate-slide-in-right" style={{ animationDelay: `${idx * 0.15}s` }}>
                      <div className="aspect-[16/10] overflow-hidden bg-zinc-900">
                        <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="p-4 sm:p-6 md:p-8">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-br from-white to-gray-400 flex items-center justify-center text-xs sm:text-sm font-bold animate-glow-pulse">A</div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                            <span>Annet</span>
                            <span>•</span>
                            <span>{post.date}</span>
                          </div>
                        </div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-white transition-colors mb-3 sm:mb-4">{post.title}</h3>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-white/60 font-medium group-hover:text-white transition-colors">
                          Read more
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-zinc-900 to-black">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-xs uppercase tracking-wider text-white/60 mb-4 sm:mb-6">let's connect</h2>
                <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12">Ready to create something awesome together?</h3>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="magnetic-button group inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white text-black rounded-full font-semibold text-xs sm:text-sm md:text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  style={{ transform: `translate(${magneticButtonPos.x}px, ${magneticButtonPos.y}px)` }}
                >
                  Let's connect
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </div>
            </section>

            <footer className="py-12 sm:py-16 px-4 sm:px-6 bg-black border-t border-zinc-800">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 sm:gap-12 mb-8 sm:mb-12">
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Pages</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <div onClick={() => setCurrentPage('about')} className="text-xs sm:text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">About</div>
                      <div onClick={() => setCurrentPage('contact')} className="text-xs sm:text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">Contact</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4">Socials</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <a href="https://github.com/anilannet" target="_blank" rel="noopener noreferrer" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">Github</a>
                      <a href="https://www.linkedin.com/in/annetanilcse07/" target="_blank" rel="noopener noreferrer" className="block text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                    </div>
                  </div>
                </div>
                <div className="text-center text-gray-500 text-xs sm:text-sm border-t border-zinc-800 pt-6 sm:pt-8">
                  <p className="mb-2 sm:mb-4">
                    <a href="https://x.com/kuipermarc" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors font-medium">Built by Annet</a>
                  </p>
                  <p>© Display. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        )}

        {currentPage === 'contact' && (
          <div className="min-h-screen bg-gradient-to-b from-[#0a0a14] via-[#1a1a2e] to-[#0f0f1e] text-white flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl"></div>
            </div>
            <div className="max-w-5xl w-full relative z-10">
              <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[120px] font-bold text-center mb-8 sm:mb-12 leading-none hover:text-white transition-all duration-300 cursor-pointer">GET IN TOUCH</h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center mb-12 sm:mb-20 text-gray-400 max-w-3xl mx-auto hover:text-gray-200 transition-colors duration-300">
                Whether you have a question, want to work together, or simply wish to say hello, I'm all ears.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-16">
                <div className="p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 group">
                  <h3 className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 group-hover:text-white transition-colors">Business Inquiries</h3>
                  <a href="mailto:anilannet@gmail.com" className="text-lg sm:text-xl md:text-2xl hover:text-white transition-colors duration-300 font-semibold break-all">anilannet@gmail.com</a>
                </div>
                <div className="p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 group">
                  <h3 className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 group-hover:text-white transition-colors">General</h3>
                  <a href="mailto:anilannet@gmail.com" className="text-lg sm:text-xl md:text-2xl hover:text-white transition-colors duration-300 font-semibold break-all">anilannet@gmail.com</a>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-16">
                <div className="p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 group">
                  <h3 className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 group-hover:text-white transition-colors">WhatsApp</h3>
                  <button onClick={handleWhatsAppClick} className="text-lg sm:text-xl md:text-2xl hover:text-white transition-colors duration-300 font-semibold">
                    +971 50 536 7089
                  </button>
                </div>
                <div className="p-4 sm:p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 group">
                  <h3 className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 group-hover:text-white transition-colors">LinkedIn</h3>
                  <a href="https://www.linkedin.com/in/annetanilcse07/" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base md:text-lg hover:text-white transition-colors duration-300 font-semibold break-all">
                    https://www.linkedin.com/in/annetanilcse07/
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'about' && (
          <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-32 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-32 left-20 w-96 h-96 bg-gray-500/5 rounded-full blur-3xl"></div>
            </div>
            <section className="min-h-screen flex items-center justify-end px-4 sm:px-6 lg:px-24 pt-20 sm:pt-32 relative z-10">
              <div className="max-w-2xl w-full flex items-center gap-8 lg:gap-12">
                {/* Profile Photo */}
                <div className="hidden lg:block flex-shrink-0">
                  <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                    <img 
                      src="/annet-portfolio/profile.png" 
                      alt="Annet Anil" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* About Text */}
                <div className="flex-1">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-8 sm:mb-12 animate-slide-in-left hover:text-white transition-all duration-300 cursor-pointer">ABOUT</h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed animate-fade-in-up animation-delay-300 hover:text-gray-200 transition-colors duration-300">
                    It's Annet👋 , A digital creative, hailing  with a passion for blending technology, design, and innovation, I turn ideas into{' '}
                    <span className="text-white font-semibold">code, design into experiences, and curiosity into innovation.</span>
                  </p>
                </div>
              </div>
            </section>

            <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-24">
              <p className="text-white/60 text-xs sm:text-sm uppercase tracking-wider mb-6 sm:mb-8 animate-fade-in-up">PROJECTS</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in-up animation-delay-300">
                BUS DRIVER BEHAVIOUR MANAGEMENT SYSTEM
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-4xl animate-fade-in-up animation-delay-600">
                I have developed a IOT based Bus Driver System that helps track the speed of a bus and the distance at which it overtakes during traffic which helps control and evaluate the discipline of the bus driver during taxi.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-12 sm:mb-16 max-w-4xl leading-relaxed">
                Components such as Ultrasonic Distance Sensor HC-SR04 Module, OLED Display, Raspberry Pi UNO RP2040 Development Board were used in the project.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-3xl">
                {[
                  { icon: '📡', label: 'IOT' },
                  { icon: '⏱️', label: 'Time tracking' },
                  { icon: '📊', label: 'Sensors' },
                  { icon: '📄', label: 'Reports' }
                ].map((item, idx) => (
                  <div key={idx} className="border border-white/20 rounded-xl py-3 sm:py-4 px-3 sm:px-6 text-center hover:bg-white/5 hover:border-white/30 transition-all card-hover">
                    <span className="text-xl sm:text-2xl block mb-1 sm:mb-2">{item.icon}</span>
                    <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-24">
              <p className="text-white/60 text-xs sm:text-sm uppercase tracking-wider mb-6 sm:mb-8">ACHIEVEMENTS</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-12 sm:mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">CERTIFICATIONS</h2>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                  {[
                    { title: 'Microsoft Certified', subtitle: 'Azure Data Fundamentals' },
                    { title: 'IBM Certified', subtitle: 'Enterprise Security in Practice' },
                    { title: 'Cisco Network Academy', subtitle: 'CCNA: Switching, Routing & Wireless Essentials' },
                    { title: 'Infosys', subtitle: 'Internet Of Things 101' },
                    { title: 'Infosys', subtitle: 'Cryptography in IT Security & Hacking' },
                    { title: 'IBM', subtitle: 'Java Programming Fundamentals' },
                    { title: 'Nasscom Foundation', subtitle: 'User Experience Design Fundamentals' },
                    { title: 'Cisco', subtitle: 'Full Stack Development with MERN' },
                    { title: 'Karunya University', subtitle: 'Cybersecurity Essentials (Cisco Networking Academy)' },
                    { title: 'Cisco Networking Academy', subtitle: 'CSS Essentials' },
                    { title: 'Infosys', subtitle: 'Machine Learning Fundamentals' },
                    { title: 'Infosys', subtitle: 'Artificial Intelligence' },
                    { title: 'Cisco Networking Academy', subtitle: 'HTML Essentials' },
                    { title: 'OpenEDG Python Institute', subtitle: 'Programming Essentials in Python' }
                  ].map((cert, idx) => (
                    <div key={idx} className="scroll-animate group card-hover p-6 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300">
                      <h3 className="text-lg font-bold mb-1 group-hover:text-white transition-colors">✓ {cert.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{cert.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-32 px-6 bg-zinc-900/30">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center opacity-30">
                  {['Mailchimp', 'Notion', 'Spotify', 'Booking.com', 'Dribbble'].map((company, idx) => (
                    <div key={idx} className="text-2xl font-bold text-center">{company}</div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-32 px-6 lg:px-24">
              <h2 className="text-5xl font-bold mb-16">Tools I use daily</h2>
              
              <div className="max-w-6xl">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                  {[
                    { name: 'Visual Studio', desc: 'Open Source AI Code Editor', icon: '💻', img: 'https://framerusercontent.com/images/rpwLSAvkIDNCAdp6SOAAEQ6t4.png' },
                    { name: 'Figma', desc: 'UX/UI design, wireframing, prototype.', icon: '🎨', img: 'https://framerusercontent.com/images/rpwLSAvkIDNCAdp6SOAAEQ6t4.png' },
                    { name: 'Github', desc: 'Developer platform for code management.', icon: '⚙️', img: 'https://framerusercontent.com/images/rpwLSAvkIDNCAdp6SOAAEQ6t4.png' },
                    { name: 'DevUtils', desc: 'Powerful developer tools.', icon: '🔧', img: 'https://framerusercontent.com/images/rpwLSAvkIDNCAdp6SOAAEQ6t4.png' },
                    { name: 'Blender', desc: 'Free 3D Creation Software', icon: '🎬', img: 'https://framerusercontent.com/images/rpwLSAvkIDNCAdp6SOAAEQ6t4.png' }
                  ].map((tool, idx) => (
                    <div key={idx} className="group card-hover text-center animate-scale-in" style={{ animationDelay: `${idx * 0.08}s` }}>
                      <div className="mb-4 flex justify-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-gray-500/10 rounded-2xl flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300 border border-white/10 group-hover:border-white/30">
                          {tool.icon}
                        </div>
                      </div>
                      <h4 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">{tool.name}</h4>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">{tool.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-32 px-6 lg:px-24 bg-black">
              <p className="text-sm uppercase tracking-wider text-white/60 mb-6 animate-fade-in-up">Experience</p>
              <h2 className="text-6xl md:text-7xl font-bold mb-24 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in-up animation-delay-300">In The Past</h2>

              <div className="max-w-6xl space-y-24 relative">
                {/* Vertical progress line */}
                <div className="absolute -left-12 top-0 bottom-0 w-1 bg-white/10 hidden md:block">
                  <div 
                    className="w-full bg-gradient-to-b from-white to-gray-400 transition-all duration-300 ease-out"
                    style={{
                      height: `${Math.min(100, Math.max(0, (scrollY - 3800) / 15))}%`
                    }}
                  ></div>
                </div>
                {[
                  {
                    period: 'December 2025 - Present',
                    title: 'ReflexLabs UI/UX Engineer, Frontend Developer',
                    points: [
                      'Design and develop user-centric interfaces with a focus on exceptional user experience.',
                      'Implement responsive frontend solutions using modern web technologies.',
                      'Collaborate with cross-functional teams to deliver high-quality digital products.'
                    ]
                  },
                  {
                    period: '2025 - present',
                    title: 'Content Creator Head',
                    points: [
                      'Led a team of content creators in developing engaging software solutions using various web development tools.',
                      'Designed and implemented innovative content strategies to enhance user experience and engagement.',
                      'Collaborated with cross-functional teams to ensure seamless integration of content across platforms.'
                    ]
                  },
                  {
                    period: 'Jun 2025 - Jul 2025',
                    title: 'AWS Intern',
                    points: [
                      'Assisted in the implementation of various AWS tools to enhance operational efficiency.',
                      'Collaborated with team members to understand and execute different AWS roles effectively.',
                      'Gained hands-on experience in cloud computing and its applications in small industries.'
                    ]
                  }
                ].map((exp, idx) => (
                  <div key={idx} className="grid md:grid-cols-2 gap-12 border-b border-white/10 pb-24">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{exp.period}</h3>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold mb-6">{exp.title}</h3>
                      <ul className="space-y-4 text-gray-300">
                        {exp.points.map((point, pidx) => (
                          <li key={pidx} className="flex gap-3">
                            <span className="text-white/60 mt-1">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="py-32 px-6 lg:px-24 bg-black border-t border-zinc-800">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-sm uppercase tracking-wider text-white/60 mb-6 animate-fade-in-up">let's connect</h2>
                <h3 className="text-5xl md:text-6xl font-bold mb-12 animate-fade-in-up animation-delay-300">Ready to create something awesome together?</h3>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="magnetic-button group inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-semibold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 animate-scale-in"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  style={{ transform: `translate(${magneticButtonPos.x}px, ${magneticButtonPos.y}px)` }}
                >
                  Let's connect
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Portfolio;
