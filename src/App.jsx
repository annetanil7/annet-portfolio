import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Mail, Github, Linkedin } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen.jsx';
import CustomCursor from './components/CustomCursor.jsx';

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoading]);

  const projects = [
    {
      title: "Web Development",
      description: "Creating responsive, modern websites with cutting-edge technologies",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop"
    },
    {
      title: "UI/UX Design",
      description: "Designing intuitive and beautiful user experiences",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop"
    },
    {
      title: "Mobile Development",
      description: "Building native and cross-platform mobile applications",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop"
    }
  ];

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      <CustomCursor />
      
      <div className="font-sans antialiased bg-[#0a0a0a] text-white min-h-screen">
        
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-6 transition-all duration-300"
             style={{
               backgroundColor: scrollY > 50 ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
               backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none'
             }}>
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <a href="#home" className="text-2xl font-light tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              ANNET
            </a>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-12">
              <a href="#work" className="text-sm tracking-wider hover:text-white/60 transition-colors">WORK</a>
              <a href="#about" className="text-sm tracking-wider hover:text-white/60 transition-colors">ABOUT</a>
              <a href="#contact" className="text-sm tracking-wider hover:text-white/60 transition-colors">CONTACT</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-30 bg-[#0a0a0a] flex items-center justify-center md:hidden">
            <div className="text-center space-y-8">
              <a href="#work" onClick={() => setIsMenuOpen(false)} className="block text-3xl tracking-wider hover:text-white/60 transition-colors">WORK</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="block text-3xl tracking-wider hover:text-white/60 transition-colors">ABOUT</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-3xl tracking-wider hover:text-white/60 transition-colors">CONTACT</a>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
          
          <div className="relative z-10 text-center max-w-5xl mx-auto scroll-reveal">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Immersive digital experiences,<br />designed with clarity
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light">
              A creative developer building modern web experiences that balance beauty with functionality
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider"
              data-cursor-hover
            >
              START A PROJECT <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="scroll-reveal mb-20">
              <p className="text-sm tracking-widest text-white/40 mb-4">SELECTED WORK</p>
              <h2 className="text-4xl md:text-6xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                Recent projects
              </h2>
            </div>

            <div className="space-y-32">
              {projects.map((project, index) => (
                <div key={index} className="scroll-reveal group">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-700" />
                      </div>
                    </div>
                    <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                      <p className="text-xs tracking-widest text-white/40 mb-4">PROJECT {String(index + 1).padStart(2, '0')}</p>
                      <h3 className="text-3xl md:text-5xl font-light mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {project.title}
                      </h3>
                      <p className="text-white/60 text-lg mb-8 leading-relaxed">
                        {project.description}
                      </p>
                      <a href="#" className="inline-flex items-center gap-2 text-sm tracking-wider hover:gap-4 transition-all duration-300">
                        VIEW PROJECT <ArrowRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 md:py-32 px-6 md:px-12 bg-[#121212]">
          <div className="max-w-4xl mx-auto">
            <div className="scroll-reveal">
              <p className="text-sm tracking-widest text-white/40 mb-4">ABOUT</p>
              <h2 className="text-4xl md:text-6xl font-light mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
                Building digital experiences that last
              </h2>
              <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                <p>
                  I'm a creative developer passionate about crafting immersive web experiences. 
                  With expertise in modern frameworks and a keen eye for design, I create digital 
                  products that are both beautiful and functional.
                </p>
                <p>
                  My work focuses on the intersection of design and development, ensuring every 
                  project delivers exceptional user experiences while maintaining clean, 
                  maintainable code.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="grid md:grid-cols-3 gap-12 mt-20 scroll-reveal">
              <div>
                <h3 className="text-xl mb-4 font-light" style={{ fontFamily: "'Playfair Display', serif" }}>Frontend</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  React, Vue, Next.js, Tailwind CSS, TypeScript
                </p>
              </div>
              <div>
                <h3 className="text-xl mb-4 font-light" style={{ fontFamily: "'Playfair Display', serif" }}>Backend</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Node.js, Python, PostgreSQL, MongoDB
                </p>
              </div>
              <div>
                <h3 className="text-xl mb-4 font-light" style={{ fontFamily: "'Playfair Display', serif" }}>Tools</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Figma, Git, Docker, AWS, Vercel
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center scroll-reveal">
            <p className="text-sm tracking-widest text-white/40 mb-4">GET IN TOUCH</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
              Let's work together
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Get in touch and let's create something amazing.
            </p>
            
            <a 
              href="mailto:contact@annet.com" 
              className="inline-block text-2xl md:text-4xl hover:text-white/60 transition-colors mb-12"
              data-cursor-hover
            >
              contact@annet.com
            </a>

            <div className="flex justify-center gap-8 mb-12">
              <a href="#" className="hover:text-white/60 transition-colors" data-cursor-hover>
                <Github size={24} />
              </a>
              <a href="#" className="hover:text-white/60 transition-colors" data-cursor-hover>
                <Linkedin size={24} />
              </a>
              <a href="#" className="hover:text-white/60 transition-colors" data-cursor-hover>
                <Mail size={24} />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-white/40">© 2026 ANNET. All rights reserved.</p>
            <div className="flex gap-8 text-sm text-white/40">
              <a href="#work" className="hover:text-white/60 transition-colors">Work</a>
              <a href="#about" className="hover:text-white/60 transition-colors">About</a>
              <a href="#contact" className="hover:text-white/60 transition-colors">Contact</a>
            </div>
          </div>
        </footer>

        <style>{`
          .scroll-reveal {
            opacity: 0;
            transform: translateY(60px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .scroll-reveal.reveal-visible {
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>
      </div>
    </>
  );
};

export default Portfolio;
