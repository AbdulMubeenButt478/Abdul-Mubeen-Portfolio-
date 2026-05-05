/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  User, 
  ChevronRight,
  ChevronUp,
  Download,
  Terminal,
  Cpu,
  Layout,
  Search,
  Globe,
  Database,
  Monitor,
  CheckCircle2,
  Menu,
  X,
  Smartphone,
  Layers,
  Settings,
  Palette,
  Moon,
  Sun,
  ArrowRight,
  MessageSquare,
  MapPin,
  Quote
} from 'lucide-react';
import { portfolioData } from './data';
import { cn } from './lib/utils';
import ShaderBackground from './components/ui/shader-background';
import { GlowCard } from './components/ui/spotlight-card';
import { FlipFadeText } from './components/ui/flip-fade-text';
import { NavHeader } from './components/ui/nav-header';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.605 6.006L0 24l6.149-1.613a11.771 11.771 0 005.9 1.574h.005c6.637 0 12.032-5.396 12.035-12.031a11.768 11.768 0 00-3.475-8.52z"/>
  </svg>
);

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const skillIconMap: Record<string, { icon: any, color: string, glow: string }> = {
  "HTML5": { icon: Globe, color: "text-orange-500", glow: "group-hover:shadow-orange-500/20" },
  "CSS3": { icon: Palette, color: "text-blue-500", glow: "group-hover:shadow-blue-500/20" },
  "JavaScript": { icon: Code2, color: "text-yellow-500", glow: "group-hover:shadow-yellow-500/20" },
  "React": { icon: Layers, color: "text-cyan-400", glow: "group-hover:shadow-cyan-400/20" },
  "Tailwind CSS": { icon: Layout, color: "text-sky-400", glow: "group-hover:shadow-sky-400/20" },
  "Git & GitHub": { icon: Github, color: "text-slate-600", glow: "group-hover:shadow-slate-600/20" },
  "SEO Optimization": { icon: Search, color: "text-emerald-500", glow: "group-hover:shadow-emerald-500/20" },
  "UI/UX Design": { icon: Monitor, color: "text-purple-500", glow: "group-hover:shadow-purple-500/20" },
  "Web Management": { icon: Settings, color: "text-brand", glow: "group-hover:shadow-brand/10" },
  "CMS Management": { icon: Database, color: "text-accent", glow: "group-hover:shadow-accent/10" }
};

const SectionTitle = ({ children, subtitle, darkMode, className }: { children: React.ReactNode; subtitle?: string, darkMode?: boolean, className?: string }) => (
  <div className={cn("mb-12 sm:mb-16 relative z-20", className)}>
    <h2 
      className={cn(
        "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 transition-colors",
        darkMode ? "text-white" : "text-slate-900"
      )}
    >
      {children}
    </h2>
    <div 
      className="h-1.5 w-20 bg-gradient-to-r from-brand to-accent mt-2 sm:mt-4 mb-4 sm:mb-6 rounded-full"
    />
    {subtitle && (
      <p 
        className={cn(
          "text-sm sm:text-base lg:text-lg w-full leading-relaxed mb-2 text-justify",
          darkMode ? "text-slate-400" : "text-slate-500"
        )}
      >
        {subtitle}
      </p>
    )}
  </div>
);

const ProjectCard = ({ project, index, isCurrent, darkMode }: { project: any, index: number, isCurrent?: boolean, darkMode?: boolean }) => {
  const CardContent = (
    <>
      <div className={cn(
        "relative overflow-hidden aspect-video",
        isCurrent ? cn("h-48 flex items-center justify-center p-8 transition-colors duration-500", darkMode ? "bg-gradient-to-br from-slate-200/90 to-indigo-100/90 backdrop-blur-sm" : "bg-white") : ""
      )}>
        <motion.img 
          src={project.image} 
          alt={project.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
          className={cn(
            "transition-transform duration-700",
            isCurrent ? "max-h-full max-w-full object-contain drop-shadow-md" : "w-full h-full object-cover"
          )}
        />
        {isCurrent && (
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-brand/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-xl flex items-center gap-2 border border-white/20 tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              In Progress
            </span>
          </div>
        )}
        {!isCurrent && <div className={cn("absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-[#111827]/10 to-transparent", darkMode ? "opacity-80" : "opacity-0 md:hidden")} />}
        <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-nowrap overflow-x-auto gap-2 mb-4 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {project.tech.map(t => {
            const skillInfo = { color: darkMode ? "text-slate-300" : "text-slate-600" };
            return (
              <motion.span 
                key={t} 
                whileHover={{ scale: 1.1, backgroundColor: darkMode ? "#1e293b" : "#f1f5f9" }}
                className={cn(
                  "shrink-0 whitespace-nowrap text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-lg border cursor-default transition-colors",
                  darkMode
                    ? "bg-white/[0.05] border-white/10"
                    : "bg-white border-slate-200",
                  skillInfo.color
                )}
              >
                {t}
              </motion.span>
            );
          })}
        </div>
        <h3 className={cn("text-2xl font-bold mb-3 group-hover:text-brand transition-colors leading-tight truncate", darkMode ? "text-white" : "text-slate-900")} title={project.title}>{project.title}</h3>
        <p className={cn("text-base mb-3 text-justify leading-relaxed flex-1", darkMode ? "text-slate-400" : "text-slate-500")}>{project.description}</p>
        {!isCurrent && (
          <div className="flex items-center justify-end mt-auto">
            <motion.a 
              href={portfolioData.github} 
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, y: -2 }} 
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={cn(
                "p-2 rounded-xl transition-all border",
                darkMode ? "bg-white/[0.05] border-white/10 text-white hover:bg-white/[0.1] hover:border-brand/50" : "bg-slate-50 text-slate-900 border-slate-100 hover:border-slate-900/20"
              )}
              title="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </div>
        )}

        {isCurrent && (
          <motion.div 
            whileHover={{ x: 10 }}
            className="mt-auto flex items-center gap-2 text-brand font-bold text-sm uppercase tracking-widest transition-transform"
          >
            Visit Website <ChevronRight className="w-4 h-4" />
          </motion.div>
        )}
      </div>
    </>
  );

  if (!isCurrent && darkMode) {
    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        whileHover={{ y: -10 }}
        className="h-full"
      >
        <GlowCard 
          glowColor="blue" 
          customSize={true} 
          className="h-full border-none shadow-none p-0 overflow-hidden group"
        >
          {CardContent}
        </GlowCard>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -10 }}
      className={cn(
        "group relative overflow-hidden rounded-[24px] transition-all duration-500 hover:shadow-2xl shadow-sm flex flex-col h-full border",
        darkMode 
          ? isCurrent
            ? "bg-white/[0.04] backdrop-blur-xl border-brand/30 hover:border-brand cursor-pointer shadow-xl shadow-brand/20"
            : "bg-white/[0.02] backdrop-blur-xl border-white/10 hover:bg-white/[0.05] hover:border-brand/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.2)]" 
          : isCurrent 
            ? "bg-white backdrop-blur-lg border border-brand/20 hover:border-brand cursor-pointer shadow-[0_20px_50px_rgba(79,70,229,0.1)] transition-all duration-500" 
            : "bg-white/80 backdrop-blur-2xl border-slate-200/60 hover:bg-white hover:border-brand/40 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)] transition-all duration-500"
      )}
      onClick={() => isCurrent && window.open(project.link, '_blank')}
    >
      {CardContent}
    </motion.div>
  );
};

export default function App() {
  const containerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [darkMode, setDarkMode] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  
  const [scrollTarget, setScrollTarget] = useState<'top' | 'bottom'>('bottom');
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      syncTouch: true,
    });

    let running = true;
    function raf(time: number) {
      if (!running) return;
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      running = false;
      lenis.destroy();
    };
  }, []);


  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMenuOpen(false);
    }
  };

  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY < 200) {
            setScrollTarget(prev => prev !== 'bottom' ? 'bottom' : prev);
          } else {
            setScrollTarget(prev => prev !== 'top' ? 'top' : prev);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollAction = () => {
    if (scrollTarget === 'bottom') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      // Using FormSubmit.co which allows direct email sending without a pre-registered ID
      // It will send a confirmation email to mubeenbutt375@gmail.com on the first submission
      const response = await fetch(`https://formsubmit.co/ajax/${portfolioData.email}`, {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          _subject: `New Portfolio Message: ${data.subject || 'No Subject'}`,
          _template: 'table'
        }),
        headers: { 
          'Accept': 'application/json', 
          'Content-Type': 'application/json' 
        }
      });
      
      const result = await response.json();
      
      if (response.ok && result.success === 'true') {
        setFormStatus('sent');
        setTimeout(() => setFormStatus('idle'), 5000);
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('idle');
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes('Activation')) {
        alert('Action Required: Please check your email (mubeenbutt375@gmail.com) and click the "Activate Form" link to start receiving messages. This is a one-time security step.');
      } else {
        alert('Something went wrong. Please try again later.');
      }
    }
  };

  const navLinks = [
    { name: 'About Me', href: '#about' },
    { name: 'Technical Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      ref={containerRef} 
      className={cn(
        "relative min-h-screen",
        darkMode ? "bg-[#0f172a] text-slate-100" : "bg-slate-50/50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.1),rgba(255,255,255,0))] text-slate-900"
      )}
    >
      {/* Global Glow Overlay - Persistent for smoothness */}
      <div 
        className={cn(
          "fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_70%)] transition-opacity duration-700",
          darkMode ? "opacity-50" : "opacity-0"
        )} 
      />
      {/* Floating Background Glows - GPU accelerated, reduced blur */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/10 rounded-full blur-[60px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[60px]" />
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        initial={{ opacity: 0, scale: 0, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        href={`https://api.whatsapp.com/send?phone=${portfolioData.whatsapp.replace(/\D/g, '')}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 sm:bottom-24 right-4 sm:right-8 w-12 sm:w-14 h-12 sm:h-14 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] z-[110] flex items-center justify-center hover:bg-[#128C7E] transition-all duration-500 group border-2 border-white/20 backdrop-blur-sm"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-5 sm:w-6 h-5 sm:h-6" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10" />
      </motion.a>

      {/* Floating Scroll Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleScrollAction}
        className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 w-12 sm:w-14 h-12 sm:h-14 bg-brand text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.3)] z-[100] flex items-center justify-center hover:bg-brand-dark transition-all duration-500 group border-2 border-white/20 backdrop-blur-sm"
        title={scrollTarget === 'bottom' ? 'Scroll to Bottom' : 'Scroll to Top'}
      >
        <motion.div
          animate={{ 
            rotate: scrollTarget === 'bottom' ? 180 : 0,
            y: [0, -5, 0]
          }}
          transition={{ 
            rotate: { type: "spring", stiffness: 300, damping: 20 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <ChevronUp className="w-5 sm:w-6 h-5 sm:h-6" />
        </motion.div>
        
        {/* Pulse Effect */}
        <span className="absolute inset-0 rounded-full bg-brand animate-ping opacity-20 -z-10" />
        
        <span className="absolute -top-12 right-0 bg-slate-900/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap font-bold uppercase tracking-widest shadow-xl border border-white/10 translate-y-2 group-hover:translate-y-0">
          {scrollTarget === 'bottom' ? 'Explore Bottom' : 'Back to Top'}
        </span>
      </motion.button>

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 w-full z-50 backdrop-blur-md border-b px-4 sm:px-6 py-3 sm:py-4 shadow-sm transition-colors duration-500",
        darkMode ? "bg-[#0f172a]/40 border-white/5" : "bg-white/60 border-slate-200/50 backdrop-blur-2xl"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
            onClick={(e) => handleNavClick(e as any, '#top')}
            aria-label="Back to top"
          >
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full overflow-hidden border-2 border-brand shadow-[0_0_10px_rgba(37,99,235,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300">
              <img 
                src={portfolioData.profileImage} 
                alt={portfolioData.name} 
                loading="lazy"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className={cn(
              "text-base sm:text-xl font-display font-bold tracking-tighter transition-colors",
              darkMode ? "text-white" : "text-slate-900"
            )}>
              {portfolioData.name}<span className="text-brand">.</span>
            </span>
          </motion.div>
          
          {/* Desktop Links */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-1 md:gap-2"
          >
          <NavHeader 
            links={navLinks} 
            handleNavClick={handleNavClick} 
            darkMode={darkMode} 
          />
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className={cn(
                "p-2 rounded-xl border transition-all duration-300 ml-2",
                darkMode ? "bg-slate-800 border-slate-700 text-yellow-400" : "bg-slate-100 border-slate-200 text-slate-600"
              )}
            >
              {darkMode ? <Sun className="w-4 md:w-5 h-4 md:h-5" /> : <Moon className="w-4 md:w-5 h-4 md:h-5" />}
            </motion.button>

            <a 
              href="#lets-talk"
              onClick={(e) => handleNavClick(e as any, '#lets-talk')}
              className="ml-3 md:ml-4 talk-button hidden sm:flex decoration-none"
            >
              <div className="span-mother">
                <span>L</span>
                <span>e</span>
                <span>t</span>
                <span>'</span>
                <span>s</span>
                <span>&nbsp;</span>
                <span>T</span>
                <span>a</span>
                <span>l</span>
                <span>k</span>
              </div>
              <div className="span-mother2">
                <span>L</span>
                <span>e</span>
                <span>t</span>
                <span>'</span>
                <span>s</span>
                <span>&nbsp;</span>
                <span>T</span>
                <span>a</span>
                <span>l</span>
                <span>k</span>
              </div>
            </a>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "md:hidden absolute top-full left-0 w-full backdrop-blur-xl border-b-2 border-brand/10 px-4 py-6 flex flex-col gap-3 shadow-2xl",
              darkMode ? "bg-[#0f172a]/40" : "bg-white/95"
            )}
          >
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="flex flex-col gap-2"
            >
              {navLinks.map((link) => (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "text-base font-bold p-3 rounded-xl sm:rounded-2xl hover:bg-brand/5 transition-all",
                    darkMode ? "text-white" : "text-slate-900"
                  )}
                >
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
            <motion.a 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              className={cn(
                "bg-brand text-white px-6 py-3 rounded-lg sm:rounded-2xl text-center font-bold shadow-lg shadow-brand/20 mt-2",
                "transition-all hover:bg-brand-dark"
              )}
            >
              Let's Talk
            </motion.a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        id="top"
        className={cn(
          "relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[85vh] lg:min-h-screen flex items-start sm:items-center px-4 sm:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12 overflow-hidden transition-colors duration-500 z-10",
          darkMode ? "bg-[#0f172a] text-white" : "bg-[#f8fafc] text-slate-900"
        )}
      >
        <div className="hidden md:block">
          <ShaderBackground darkMode={darkMode} />
        </div>
        {/* Bottom Fade Mask */}
        <div className={cn(
          "absolute bottom-0 left-0 w-full h-32 z-20 pointer-events-none",
          darkMode ? "bg-gradient-to-t from-[#0f172a] to-transparent" : "bg-gradient-to-t from-slate-50 to-transparent"
        )} />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className={cn(
              "relative z-10 flex flex-col justify-center pt-8 pb-10 sm:pt-12 sm:pb-14 px-6 sm:px-10 rounded-[2.5rem] border transition-all duration-500",
              darkMode 
                ? "bg-white/[0.02] backdrop-blur-md border-white/5 shadow-2xl shadow-brand/10" 
                : "bg-white/40 backdrop-blur-md border-white/20 shadow-xl shadow-slate-200/20"
            )}
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className={cn(
                "inline-flex items-center self-start gap-2 px-3 py-1.5 sm:py-2 rounded-2xl sm:rounded-full border-2 text-brand text-sm font-bold uppercase mb-4 sm:mb-8 shadow-sm -mt-2 sm:-mt-4 max-w-full",
                darkMode ? "bg-white/[0.02] backdrop-blur-2xl border-white/5 hover:border-brand/30 shadow-[0_0_30px_rgba(37,99,235,0.03)] hover:shadow-[0_0_40px_rgba(37,99,235,0.1)] transition-all duration-500" : "bg-white/80 backdrop-blur-md border-slate-200/60 shadow-xl shadow-slate-200/50"
              )}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
              </span>
              <FlipFadeText 
                words={[
                  "Web Manager @ NetsTech Software Solutions", 
                  "Software Engineer", 
                  "Digital Strategist", 
                  "Web Performance Expert"
                ]} 
                interval={3500}
                className="min-h-0"
                textClassName="text-[9px] min-[375px]:text-[10px] sm:text-xs font-bold text-brand"
              />
            </motion.div>
            
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className={cn(
                "text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold font-display leading-tight mb-4 tracking-tighter transition-colors",
                darkMode ? "text-white" : "text-slate-900"
              )}
            >
              <span className="block">Web Performance &</span>
              <span className="block text-gradient">Strategic Maintenance</span>
            </motion.h1>
            
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className={cn(
                "text-base sm:text-lg md:text-xl max-w-2xl mb-6 sm:mb-8 leading-relaxed text-justify transition-colors",
                darkMode ? "text-slate-400" : "text-slate-600"
              )}
            >
              Hi, I'm <span className={darkMode ? "text-white font-semibold" : "text-slate-900 font-semibold"}>{portfolioData.name}</span>. 
              A <span className="text-brand font-bold">Software Engineer</span> & <span className="text-brand font-bold">Web Manager</span>. 
              I specialize in optimizing digital performance and engineering strategic solutions.
            </motion.p>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex flex-col sm:flex-row flex-wrap items-center gap-2"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-[48px] sm:h-[52px] w-full sm:w-[190px] px-3 sm:px-4 bg-brand text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark group whitespace-nowrap"
              >
                View My Work 
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4" />
                </motion.span>
              </motion.button>
              <motion.a 
                href={portfolioData.cvLink}
                rel="noreferrer"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "h-[48px] sm:h-[52px] w-full sm:w-[190px] pl-3 sm:pl-4 pr-1 sm:pr-2 border text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 sm:gap-3 transition-all hover:border-brand/30 hover:shadow-lg relative overflow-hidden group",
                  darkMode ? "bg-white/[0.05] border-white/10 text-white hover:bg-white/[0.1]" : "bg-white border-slate-200 text-slate-900"
                )}
              >
                <span className="relative z-10">Download CV</span>
                <span className={cn(
                  "relative z-10 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg transition-colors",
                  darkMode ? "bg-brand text-white group-hover:bg-brand-dark" : "bg-brand text-white group-hover:bg-brand-dark"
                )}>
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Download className="w-4 sm:w-5 h-4 sm:h-5 transition-transform group-hover:scale-110" />
                  </motion.div>
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: 1, 
              x: 0,
            }}
            transition={{ 
              opacity: { duration: 1, delay: 0.2 },
              x: { duration: 1, delay: 0.2 }
            }}
            className="relative flex items-center justify-center lg:justify-end -translate-y-4 lg:-translate-y-8"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-brand/5 rounded-full blur-3xl -z-10" />
            <motion.div
              whileHover={{ 
                rotateX: -10, 
                rotateY: 10,
                scale: 1.05 
              }}
              style={{ perspective: 1000 }}
              className={cn(
                "relative z-10 rounded-[24px] overflow-hidden border shadow-xl transition-colors duration-500 w-full max-w-[420px] aspect-[4/4.3]",
                darkMode ? "bg-white/[0.02] backdrop-blur-2xl border-white/5 hover:border-brand/30 shadow-[0_0_30px_rgba(37,99,235,0.03)] hover:shadow-[0_0_40px_rgba(37,99,235,0.1)] rounded-[2.5rem] transition-all duration-500" : "bg-white/80 backdrop-blur-md border-slate-200/60 rounded-[2.5rem] shadow-xl shadow-slate-200/50"
              )}
            >
              <div className="absolute inset-0 bg-brand/[0.03] z-0" />
              <motion.img 
                src={portfolioData.profileImage} 
                alt={portfolioData.name} 
                referrerPolicy="no-referrer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover antialiased relative z-10"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={cn(
        "py-24 sm:py-32 px-6 sm:px-12 md:px-20 transition-all duration-700 relative overflow-hidden z-10 border-y",
        darkMode ? "bg-[#0f172a]/80 border-white/5" : "bg-white/40 border-indigo-100/50 shadow-sm"
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <h2 className={cn("text-xl sm:text-2xl font-bold mb-2", darkMode ? "text-white" : "text-slate-900")}>KEY METRICS</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-brand to-accent rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.2,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }
              }
            }}
            className={cn(
              "grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 p-6 sm:p-10 md:p-16 rounded-2xl sm:rounded-3xl md:rounded-[40px] border transition-all",
              darkMode ? "bg-white/[0.02] backdrop-blur-xl border-white/10" : "bg-white/40 backdrop-blur-md border-indigo-100/60 shadow-inner"
            )}
          >
            {[
              { label: "Years Experience", value: "1+" },
              { label: "Projects Completed", value: "15+" },
              { label: "Web Performance", value: "99%" },
              { label: "Certifications", value: "10+" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                className={cn(
                  "text-center p-4 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl md:rounded-3xl border transition-all group hover:-translate-y-3 hover:shadow-2xl",
                  darkMode 
                    ? "bg-white/[0.02] backdrop-blur-xl border-white/10 hover:bg-white/[0.05] hover:border-brand/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all" 
                    : "bg-white/60 backdrop-blur-xl border-indigo-100/40 hover:bg-white/80 hover:border-brand/50 shadow-lg shadow-indigo-200/10 transition-all duration-500"
                )}
              >
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand mb-2 group-hover:scale-110 transition-transform">{stat.value}</h3>
                <p className="text-slate-500 text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={cn(
        "py-24 sm:py-32 px-6 sm:px-12 md:px-20 min-h-screen flex items-center transition-colors duration-500 relative overflow-hidden z-10 border-b",
        darkMode ? "bg-white/[0.01] border-white/5" : "bg-slate-50/30 border-indigo-50"
      )}>
        <div className="absolute top-1/2 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-brand/5 rounded-full blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 lg:gap-24 gap-8 sm:gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className={cn(
                "aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border shadow-xl sm:shadow-2xl flex items-center justify-center group relative z-10",
                darkMode 
                  ? "bg-white/[0.02] border-white/10 shadow-[0_0_30px_rgba(37,99,235,0.1)]" 
                  : "bg-slate-50 border-slate-200 shadow-slate-200/50"
              )}
            >
              <div className="absolute inset-0 bg-brand/[0.02]" />
              <motion.img 
                src={portfolioData.profileImage} 
                alt="About Me Tech" 
                referrerPolicy="no-referrer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="w-full h-full object-cover relative z-10 antialiased"
              />
            </motion.div>
            
            {/* Soft decorative glow behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand/10 blur-[100px] rounded-full opacity-30 -z-10 animate-pulse" />

            {/* Floating Quote Card */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={cn(
                "relative sm:absolute -right-4 sm:-right-2 bottom-4 sm:bottom-8 md:right-0 md:bottom-16 p-4 sm:p-5 rounded-lg sm:rounded-[24px] border z-20 max-w-full sm:max-w-[260px] shadow-lg sm:shadow-xl",
                darkMode ? "bg-white/[0.02] backdrop-blur-xl border-white/10" : "bg-white/95 border-slate-200"
              )}
            >
              <Quote className="absolute top-4 sm:top-6 right-4 sm:right-6 w-6 sm:w-8 h-6 sm:h-8 text-brand/10" />
              <p className={cn(
                "text-xs sm:text-sm md:text-base font-semibold italic leading-relaxed text-justify",
                darkMode ? "text-slate-200" : "text-slate-800"
              )}>
                "I strongly believe in <span className="text-brand">continuous learning</span> and self-improvement, and I am always motivated to grow by working on practical projects."
              </p>
            </motion.div>
          </motion.div>
          
          <div className="mt-8 lg:mt-0 flex flex-col">
            <SectionTitle 
              subtitle="I am a Software Engineer and Web Manager focused on building high-performance websites and strategic digital solutions." 
              darkMode={darkMode}
              className="mb-6 sm:mb-8"
            >
              ABOUT ME
            </SectionTitle>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={cn(
                "text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 text-justify transition-colors",
                darkMode ? "text-slate-400" : "text-slate-600"
              )}
            >
              {portfolioData.summary}
            </motion.p>
            
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                className={cn(
                  "p-4 sm:p-6 rounded-lg sm:rounded-2xl border transition-all group relative overflow-hidden",
                  darkMode 
                    ? "bg-white/[0.02] backdrop-blur-xl border-white/10 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]" 
                    : "bg-white/60 backdrop-blur-lg border-indigo-100 hover:bg-white/80 hover:border-brand/50 shadow-xl shadow-brand/5 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]"
                )}
              >
                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-lg sm:rounded-xl bg-brand/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform group-hover:bg-brand group-hover:text-white shadow-md shadow-brand/5">
                  <Settings className="w-6 sm:w-7 h-6 sm:h-7 text-brand group-hover:text-white transition-colors" />
                </div>
                <h4 className={cn("font-bold mb-2 text-base sm:text-lg md:text-xl", darkMode ? "text-white" : "text-slate-900")}>Web Management</h4>
                <p className={cn("text-xs sm:text-sm leading-relaxed", darkMode ? "text-slate-300" : "text-slate-500")}>Managing website content and performance at scale with precision.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                className={cn(
                  "p-4 sm:p-6 rounded-lg sm:rounded-2xl border transition-all group relative overflow-hidden",
                  darkMode 
                    ? "bg-white/[0.02] backdrop-blur-xl border-white/10 hover:bg-white/[0.05] hover:border-accent/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]" 
                    : "bg-white/60 backdrop-blur-lg border-indigo-100 hover:bg-white/80 hover:border-accent/50 shadow-xl shadow-accent/5 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                )}
              >
                <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-lg sm:rounded-xl bg-accent/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform group-hover:bg-accent group-hover:text-white shadow-md shadow-accent/5">
                  <Palette className="w-6 sm:w-7 h-6 sm:h-7 text-accent group-hover:text-white transition-colors" />
                </div>
                <h4 className={cn("font-bold mb-2 text-base sm:text-lg md:text-xl", darkMode ? "text-white" : "text-slate-900")}>UI/UX Strategy</h4>
                <p className={cn("text-xs sm:text-sm leading-relaxed", darkMode ? "text-slate-300" : "text-slate-500")}>Designing intuitive interfaces that drive engagement and conversion.</p>
              </motion.div>
            </div>
            
            <div className="flex flex-wrap justify-start gap-3 sm:gap-4 mt-6 sm:mt-8">
              {[
                { icon: Linkedin, href: portfolioData.linkedin, color: darkMode ? "text-white hover:bg-[#0077B5] hover:text-white bg-[#0077B5]/30" : "text-[#0077B5] hover:bg-[#0077B5]/10" },
                { icon: Github, href: portfolioData.github, color: darkMode ? "text-white hover:bg-white hover:text-slate-900 bg-white/30" : "text-slate-900 hover:bg-slate-900/10" },
                { icon: Mail, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.email}`, color: darkMode ? "text-white hover:bg-[#EA4335] hover:text-white bg-[#EA4335]/30" : "text-[#EA4335] hover:bg-[#EA4335]/10" },
                { icon: WhatsAppIcon, href: `https://api.whatsapp.com/send?phone=${portfolioData.whatsapp.replace(/\D/g, '')}`, color: darkMode ? "text-white hover:bg-[#25D366] hover:text-white bg-[#25D366]/30" : "text-[#25D366] hover:bg-[#25D366]/10" }
              ].map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all border border-transparent hover:border-current/20 shadow-lg p-2 overflow-hidden",
                    social.color
                  )}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={cn(
        "py-24 sm:py-32 px-6 sm:px-12 md:px-20 min-h-screen flex items-center transition-colors duration-500 relative overflow-hidden z-10 border-b",
        darkMode ? "bg-white/[0.02] border-white/5" : "bg-white/60 border-slate-200/50"
      )}>
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-brand/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-accent/5 rounded-full blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="A strong set of skills built over many hours of hands-on work, including modern front-end frameworks, SEO techniques, and practical web management tools." darkMode={darkMode}>
            TECHNICAL SKILLS
          </SectionTitle>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            {portfolioData.skills.map((skill, i) => {
              const skillInfo = skillIconMap[skill.name] || { icon: Code2, color: "text-slate-400", glow: "group-hover:shadow-slate-400/10" };
              const Icon = skillInfo.icon;
              let iconColor = skillInfo.color;
              if (skill.name === "Git & GitHub" && darkMode) iconColor = "text-white";
              
              const getCardStyle = () => {
                return darkMode 
                  ? "bg-white/[0.02] border-white/5 hover:bg-white/[0.05]" 
                  : "bg-white border-slate-100 hover:border-brand/20 shadow-sm hover:shadow-xl hover:shadow-brand/5";
              };
              
              return (
                <motion.div
                  key={skill.name}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={cn(
                    "p-4 sm:p-6 md:p-8 rounded-2xl text-center border transition-all group relative overflow-hidden",
                    getCardStyle(),
                    skillInfo.glow
                  )}
                >
                  <div className={cn(
                    "w-10 sm:w-12 h-10 sm:h-12 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                    darkMode ? "bg-white/[0.05] border-white/10" : "bg-slate-50 border-slate-100",
                    "border group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-brand group-hover:to-accent shadow-sm group-hover:shadow-xl"
                  )}>
                    <Icon className={cn("w-5 sm:w-6 h-5 sm:h-6 transition-colors duration-300", iconColor)} />
                  </div>
                  <h4 className={cn("font-bold text-xs sm:text-sm uppercase tracking-widest mb-1", darkMode ? "text-white" : "text-slate-900")}>{skill.name}</h4>
                  <div className="h-1 w-6 bg-slate-200/50 mx-auto rounded-full group-hover:w-10 group-hover:bg-gradient-to-r group-hover:from-brand group-hover:to-accent transition-all duration-300 mb-2" />
                  <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-tighter opacity-60">{skill.category}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Experience & Education */}
      <section id="experience" className={cn(
        "py-24 sm:py-32 px-6 sm:px-12 md:px-20 min-h-screen flex items-center transition-colors duration-500 relative overflow-hidden z-10 border-b",
        darkMode ? "bg-white/[0.01] border-white/5" : "bg-white/40 border-indigo-100/50"
      )}>
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand/[0.02] rounded-full blur-[100px] opacity-40 -z-10" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/[0.02] rounded-full blur-[100px] opacity-40 -z-10" />
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20">
            {/* Experience */}
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 relative">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-2xl bg-brand/10 flex items-center justify-center">
                  <Briefcase className="w-5 sm:w-6 h-5 sm:h-6 text-brand" />
                </div>
                <h2 className={cn("text-2xl sm:text-3xl font-bold", darkMode ? "text-white" : "text-slate-900")}>Experience</h2>
                <div className="absolute -bottom-4 left-0 h-1 w-20 bg-brand rounded-full" />
              </div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              className={cn(
                "space-y-6 sm:space-y-8 relative before:absolute before:left-[18px] sm:before:left-[23px] before:top-0 before:bottom-0 before:w-px",
                darkMode ? "before:bg-slate-800" : "before:bg-slate-200"
              )}
            >
              {portfolioData.experience.map((exp, i) => (
                <motion.div 
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="relative pl-12 sm:pl-16"
                >
                  <div className={cn("absolute left-0 top-0 w-9 sm:w-12 h-9 sm:h-12 rounded-full flex items-center justify-center z-10 border shadow-sm backdrop-blur-xl", darkMode ? "bg-slate-900/90 border-white/10" : "bg-white/90 border-slate-200")}>
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-brand" />
                  </div>
                  <div className={cn(
                    "p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border transition-all hover:border-brand/40",
                    darkMode ? "bg-white/[0.02] backdrop-blur-xl border-white/10" : "bg-white/60 backdrop-blur-lg border-indigo-100 hover:bg-white/80 shadow-xl shadow-indigo-100/30"
                  )}>
                    <span className="text-brand text-sm sm:text-base md:text-lg font-bold uppercase tracking-widest mb-2 block">{exp.period}</span>
                    <h3 className={cn("text-2xl sm:text-3xl font-bold mb-1", darkMode ? "text-white" : "text-slate-900")}>{exp.role}</h3>
                    <p className="text-slate-500 font-bold mb-3 sm:mb-4 text-base sm:text-xl">{exp.company}</p>
                    <p className={cn("text-sm sm:text-base md:text-lg leading-relaxed text-justify", darkMode ? "text-slate-400" : "text-slate-600")}>{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 relative">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-2xl bg-brand/10 flex items-center justify-center">
                  <GraduationCap className="w-5 sm:w-6 h-5 sm:h-6 text-brand" />
                </div>
                <h2 className={cn("text-2xl sm:text-3xl font-bold", darkMode ? "text-white" : "text-slate-900")}>Education</h2>
                <div className="absolute -bottom-4 left-0 h-1 w-20 bg-brand rounded-full" />
              </div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              className={cn(
                "space-y-6 sm:space-y-8 relative before:absolute before:left-[18px] sm:before:left-[23px] before:top-0 before:bottom-0 before:w-px",
                darkMode ? "before:bg-slate-800" : "before:bg-slate-200"
              )}
            >
              {portfolioData.education.map((edu, i) => (
                <motion.div 
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="relative pl-12 sm:pl-16"
                >
                  <div className={cn("absolute left-0 top-0 w-9 sm:w-12 h-9 sm:h-12 rounded-full flex items-center justify-center z-10 border shadow-sm backdrop-blur-xl", darkMode ? "bg-slate-900/90 border-white/10" : "bg-white/90 border-slate-200")}>
                    <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-brand" />
                  </div>
                  <div className={cn(
                    "p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border transition-all hover:border-brand/40",
                    darkMode ? "bg-white/[0.02] backdrop-blur-xl border-white/10" : "bg-white/60 backdrop-blur-lg border-indigo-100 hover:bg-white/80 shadow-xl shadow-indigo-100/30"
                  )}>
                    <span className="text-brand text-sm sm:text-base md:text-lg font-bold uppercase tracking-widest mb-2 block">{edu.period}</span>
                    <h3 className={cn("text-xl sm:text-2xl font-bold mb-1", darkMode ? "text-white" : "text-slate-900")}>{edu.degree}</h3>
                    <p className="text-slate-500 font-bold mb-3 sm:mb-4 text-base sm:text-xl">{edu.school}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className={cn(
        "py-16 sm:py-20 px-6 sm:px-12 my-8 mx-4 sm:mx-8 border transition-colors duration-500 relative overflow-hidden z-10",
        darkMode ? "bg-white/[0.02] backdrop-blur-2xl border-white/5 hover:border-brand/30 shadow-[0_0_30px_rgba(37,99,235,0.03)] hover:shadow-[0_0_40px_rgba(37,99,235,0.1)] rounded-[2.5rem] transition-all duration-500" : "bg-white/40 backdrop-blur-3xl border-indigo-100/50 rounded-[3rem] shadow-[0_20px_50px_rgba(79,70,229,0.05)] transition-all duration-500"
      )}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="A comprehensive collection of professional certifications and specialized training from world-class platforms, showcasing my dedication to continuous learning and technical mastery in modern software engineering." darkMode={darkMode}>
            CERTIFICATIONS
          </SectionTitle>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {portfolioData.certifications.map((cert, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={cn(
                  "p-4 sm:p-6 rounded-lg sm:rounded-2xl border flex items-center gap-3 sm:gap-4 transition-all hover:shadow-xl",
                  darkMode 
                    ? "bg-white/[0.02] backdrop-blur-xl border-white/10 hover:bg-white/[0.05] hover:border-brand/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]" 
                    : "bg-white/60 backdrop-blur-lg border-indigo-100 hover:bg-white/80 hover:border-brand/40 shadow-xl shadow-indigo-100/30"
                )}
              >
                <div className={cn(
                  "w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 overflow-hidden p-2",
                  cert.issuer === "Coursera" 
                    ? (darkMode ? "bg-blue-500/10 border border-blue-500/20" : "bg-blue-50") 
                    : cert.issuer === "Google" 
                      ? (darkMode ? "bg-white/[0.05] border border-white/10" : "bg-white shadow-sm border border-slate-100") 
                      : (darkMode ? "bg-orange-500/10 border border-orange-500/20" : "bg-orange-50")
                )}>
                  {cert.logo ? (
                    <img 
                      src={cert.logo} 
                      alt={cert.title} 
                      className={cn(
                        "w-full h-full object-contain",
                        darkMode && cert.title.toLowerCase().includes("github") ? "brightness-0 invert" : ""
                      )}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <GraduationCap className={cn("w-5 sm:w-6 h-5 sm:h-6", cert.issuer === "Coursera" ? (darkMode ? "text-blue-400" : "text-blue-600") : (darkMode ? "text-orange-400" : "text-orange-600"))} />
                  )}
                </div>
                <div>
                  <h4 className={cn("font-bold leading-tight text-sm sm:text-base", darkMode ? "text-white" : "text-slate-900")}>{cert.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">{cert.issuer}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Current Projects Section */}
      <section id="current-projects" className={cn(
        "py-24 sm:py-32 px-6 sm:px-12 md:px-20 min-h-screen flex items-center transition-colors duration-500 relative overflow-hidden z-10 border-b",
        darkMode ? "bg-white/[0.02] border-white/5" : "bg-white/40 border-indigo-100/50"
      )}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Focused on managing and optimizing professional Point of Sale (POS) ecosystems, including CPOS and CloudPOS, where I drive digital growth through meticulous UI/UX refinement, technical SEO strategies, and high-quality content management for live business solutions." darkMode={darkMode}>
            IN PROGRESS
          </SectionTitle>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {portfolioData.currentProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} isCurrent={true} darkMode={darkMode} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={cn(
        "py-24 sm:py-32 px-6 sm:px-12 md:px-20 min-h-screen flex items-center transition-colors duration-500 relative overflow-hidden z-10 border-b",
        darkMode ? "bg-white/[0.01] border-white/5" : "bg-white/40 border-indigo-100/50"
      )}>
        <div className="absolute top-1/4 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-brand/5 rounded-full blur-2xl sm:blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-accent/5 rounded-full blur-2xl sm:blur-3xl -z-10" />
        <div className="w-full max-w-[105rem] mx-auto">
          <SectionTitle subtitle="A collection of specialized engineering projects featuring real-time inventory management systems, logic-based web applications, and sophisticated data visualization tools, demonstrating a strong foundation in core JavaScript, DOM manipulation, and interactive front-end design." darkMode={darkMode}>
            FEATURED PROJECTS
          </SectionTitle>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
          >
            {portfolioData.projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} darkMode={darkMode} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Let's Work Together */}
      <section id="lets-talk" className={cn(
        "py-24 px-6 sm:px-12 my-8 mx-auto max-w-[95%] xl:max-w-7xl relative overflow-hidden border transition-colors duration-500 rounded-[2.5rem]",
        darkMode ? "bg-white/[0.02] backdrop-blur-2xl border-white/5 hover:border-brand/30 shadow-[0_0_30px_rgba(37,99,235,0.03)] hover:shadow-[0_0_40px_rgba(37,99,235,0.1)] rounded-[2.5rem] transition-all duration-500" : "bg-white/40 backdrop-blur-3xl border-indigo-100/50 rounded-[3rem] shadow-[0_20px_50px_rgba(79,70,229,0.05)] transition-all duration-500"
      )}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={cn(
              "p-12 rounded-[3rem] border relative overflow-hidden",
              darkMode ? "bg-white/[0.02] border-white/10" : "bg-slate-50 border-slate-100"
            )}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand via-accent to-brand" />
            <h2 className={cn("text-4xl md:text-5xl font-bold mb-6", darkMode ? "text-white" : "text-slate-900")}>Let's Work Together</h2>
            <p className={cn("text-lg mb-10 max-w-2xl mx-auto text-justify sm:text-center", darkMode ? "text-slate-400" : "text-slate-600")}>
              Ready to take your digital presence to the next level? I'm currently available for freelance projects and full-time opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowContactForm(true);
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-10 py-4 bg-brand text-white rounded-2xl font-bold shadow-xl shadow-brand/20 hover:bg-brand/90 transition-all flex items-center gap-2"
              >
                Start a Project
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={`https://api.whatsapp.com/send?phone=${portfolioData.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "px-10 py-4 rounded-2xl font-bold border transition-all flex items-center gap-2",
                  darkMode ? "bg-white/[0.05] border-white/10 text-white hover:bg-white/[0.1]" : "bg-white border-slate-200 text-slate-900 hover:bg-slate-50"
                )}
              >
                <MessageSquare className="w-5 h-5" />
                WhatsApp Me
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      {showContactForm && (
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          id="contact" 
          className={cn(
            "py-16 sm:py-20 px-6 sm:px-12 my-8 mx-auto max-w-[95%] xl:max-w-7xl transition-colors duration-500 relative overflow-hidden z-10",
            darkMode ? "bg-[#0f172a]/80 border-white/5 rounded-[2.5rem] shadow-2xl" : "bg-indigo-50/60 backdrop-blur-xl border border-indigo-200/50 rounded-[2.5rem] shadow-xl shadow-indigo-200/30"
          )}
        >
          <div className="max-w-7xl mx-auto">
            <div className={cn(
              "rounded-2xl sm:rounded-3xl md:rounded-[40px] p-6 sm:p-12 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl border transition-colors duration-500",
              darkMode ? "bg-white/[0.02] backdrop-blur-xl border-white/10" : "bg-white border-slate-100"
            )}>
              <div className="absolute -top-20 -right-20 w-48 sm:w-64 h-48 sm:h-64 bg-brand/10 rounded-full blur-2xl sm:blur-3xl opacity-40 -z-10" />
              <div className="absolute -bottom-20 -left-20 w-64 sm:w-80 h-64 sm:h-80 bg-accent/10 rounded-full blur-2xl sm:blur-3xl opacity-30 -z-10" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
                <div>
                  <SectionTitle subtitle="Have a project in mind? Let's build something amazing together." darkMode={darkMode}>
                    LET'S WORK TOGETHER
                  </SectionTitle>
                  
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.2
                        }
                      }
                    }}
                    className="space-y-6 sm:space-y-8 mt-8 sm:mt-12"
                  >
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="flex items-center gap-4 sm:gap-6 group"
                    >
                      <a 
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.email}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className={cn(
                          "w-12 sm:w-14 h-12 sm:h-14 rounded-2xl flex items-center justify-center text-[#EA4335] transition-all shrink-0",
                          darkMode ? "bg-white/[0.05] border-white/10 group-hover:bg-[#EA4335]/20" : "glass group-hover:bg-[#EA4335]/10"
                        )}
                      >
                        <Mail className="w-5 sm:w-6 h-5 sm:h-6" />
                      </a>
                      <div>
                        <p className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">Email Me</p>
                        <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.email}`} target="_blank" rel="noreferrer" className={cn("text-base sm:text-lg lg:text-xl font-bold hover:text-[#EA4335] transition-colors line-clamp-1", darkMode ? "text-white" : "text-slate-900")}>
                          {portfolioData.email}
                        </a>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="flex items-center gap-4 sm:gap-6 group"
                    >
                      <a 
                        href={portfolioData.linkedin} 
                        target="_blank" 
                        rel="noreferrer"
                        className={cn(
                          "w-12 sm:w-14 h-12 sm:h-14 rounded-2xl flex items-center justify-center text-[#0077B5] transition-all shrink-0",
                          darkMode ? "bg-white/[0.05] border-white/10 group-hover:bg-[#0077B5]/20" : "glass group-hover:bg-[#0077B5]/10"
                        )}
                      >
                        <Linkedin className="w-5 sm:w-6 h-5 sm:h-6" />
                      </a>
                      <div>
                        <p className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">LinkedIn</p>
                        <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" className={cn("text-base sm:text-lg lg:text-xl font-bold hover:text-[#0077B5] transition-colors", darkMode ? "text-white" : "text-slate-900")}>
                          Abdul Mubeen
                        </a>
                      </div>
                    </motion.div>
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="flex items-center gap-4 sm:gap-6 group"
                    >
                       <a 
                        href={`https://api.whatsapp.com/send?phone=${portfolioData.whatsapp.replace(/\D/g, '')}`}
                        target="_blank" 
                        rel="noreferrer"
                        className={cn(
                          "w-12 sm:w-14 h-12 sm:h-14 rounded-2xl flex items-center justify-center text-[#25D366] transition-all shrink-0",
                          darkMode ? "bg-white/[0.05] border-white/10 group-hover:bg-[#25D366]/20" : "glass group-hover:bg-[#25D366]/10"
                        )}
                      >
                        <WhatsAppIcon className="w-5 sm:w-6 h-5 sm:h-6" />
                      </a>
                      <div>
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">WhatsApp</p>
                        <a href={`https://api.whatsapp.com/send?phone=${portfolioData.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className={cn("text-xl font-bold hover:text-[#25D366] transition-colors tracking-wide", darkMode ? "text-white" : "text-slate-900")}>
                          {portfolioData.whatsapp}
                        </a>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
                
                <div className={cn(
                  "p-8 md:p-12 rounded-3xl border relative overflow-hidden transition-colors duration-500",
                  darkMode ? "bg-white/[0.03] border-white/10" : "bg-slate-50/50 border-slate-200"
                )}>
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-20 -right-20 w-64 h-64 bg-brand/10 rounded-full blur-3xl -z-10" 
                  />
                  {formStatus === 'sent' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className={cn("text-2xl font-bold mb-2", darkMode ? "text-white" : "text-slate-900")}>Message Sent!</h3>
                      <p className="text-slate-500">Thank you for reaching out. I'll get back to you at {portfolioData.email} soon.</p>
                      <button 
                        onClick={() => setFormStatus('idle')}
                        className="mt-6 text-brand font-bold text-sm hover:underline"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="mb-8">
                        <h3 className={cn("text-2xl font-bold mb-2", darkMode ? "text-white" : "text-slate-900")}>Send a Message</h3>
                        <p className="text-slate-500 text-sm">I'll get back to you within 24 hours.</p>
                      </div>
                      <motion.form 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.1
                            }
                          }
                        }}
                        className="space-y-6" 
                        onSubmit={handleContactSubmit}
                      >
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div 
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                          }}
                          className="space-y-2"
                        >
                          <label className="text-base font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                          <input required name="name" type="text" className={cn("w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-brand transition-all focus:ring-4 focus:ring-brand/5", darkMode ? "bg-white/[0.05] border-white/10 text-white" : "bg-white border-slate-200")} placeholder="Enter your name" />
                        </motion.div>
                        <motion.div 
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                          }}
                          className="space-y-2"
                        >
                          <label className="text-base font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                          <input required name="email" type="email" className={cn("w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-brand transition-all focus:ring-4 focus:ring-brand/5", darkMode ? "bg-white/[0.05] border-white/10 text-white" : "bg-white border-slate-200")} placeholder="Enter your email" />
                        </motion.div>
                      </div>
                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        className="space-y-2"
                      >
                        <label className="text-base font-bold uppercase tracking-widest text-slate-500">Subject</label>
                        <input required name="subject" type="text" className={cn("w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-brand transition-all focus:ring-4 focus:ring-brand/5", darkMode ? "bg-white/[0.05] border-white/10 text-white" : "bg-white border-slate-200")} placeholder="Project Inquiry" />
                      </motion.div>
                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        className="space-y-2"
                      >
                        <label className="text-base font-bold uppercase tracking-widest text-slate-500">Message</label>
                        <textarea required name="message" rows={4} className={cn("w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-brand transition-all focus:ring-4 focus:ring-brand/5 resize-none", darkMode ? "bg-white/[0.05] border-white/10 text-white" : "bg-white border-slate-200")} placeholder="Tell me about your project..." />
                      </motion.div>
                      <motion.button 
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={formStatus === 'sending'}
                        className="w-full py-4 bg-brand text-white font-bold rounded-xl shadow-lg shadow-brand/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {formStatus === 'sending' ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : 'Send Message'}
                      </motion.button>
                      </motion.form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}



      {/* Philosophy Section */}
      <section className={cn(
        "py-24 sm:py-32 px-6 sm:px-12 md:px-20 transition-colors duration-500 relative overflow-hidden z-10 border-b",
        darkMode ? "bg-white/[0.01] border-white/5" : "bg-slate-50/30 border-indigo-50"
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={cn(
                "p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden group h-full flex flex-col justify-center",
                "border-2 transition-all duration-500",
                darkMode
                  ? "bg-white/[0.03] border-brand/40 shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:shadow-[0_0_50px_rgba(99,102,241,0.45)] hover:border-brand/70"
                  : "bg-white border-brand/30 shadow-[0_0_25px_rgba(99,102,241,0.15)] hover:shadow-[0_0_45px_rgba(99,102,241,0.3)] hover:border-brand/60"
              )}
            >
              {/* Animated top glow bar */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent animate-pulse" />
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
              <Quote className="absolute top-8 right-8 w-12 sm:w-16 h-12 sm:h-16 text-brand/10 group-hover:text-brand/30 transition-all duration-500 group-hover:scale-110" />
              <p className={cn(
                "text-xl sm:text-2xl font-medium leading-relaxed italic mb-8 relative z-10",
                darkMode ? "text-slate-200" : "text-slate-700"
              )}>
                "Success in web development is not just about writing code; it's about creating digital experiences that solve real problems and leave a lasting impression."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand/60 shadow-[0_0_12px_rgba(99,102,241,0.4)] flex-shrink-0">
                  <img 
                    src={portfolioData.profileImage} 
                    alt={portfolioData.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className={cn("font-bold text-lg", darkMode ? "text-white" : "text-slate-900")}>Abdul Mubeen</h4>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Frontend Specialist</p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-6 sm:space-y-8">
              <SectionTitle 
                subtitle="My philosophy is simple: keep it clean, make it fast, and focus on the user. Every pixel serves a purpose, and every line of code adds value."
                darkMode={darkMode}
                className="mb-0"
              >
                CORE PRINCIPLES
              </SectionTitle>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Clean Code", icon: Code2, glow: "rgba(99,102,241,0.35)", hoverGlow: "rgba(99,102,241,0.6)" },
                  { label: "User Centric", icon: User, glow: "rgba(16,185,129,0.3)", hoverGlow: "rgba(16,185,129,0.55)" },
                  { label: "High Speed", icon: Cpu, glow: "rgba(245,158,11,0.3)", hoverGlow: "rgba(245,158,11,0.55)" },
                  { label: "Responsive", icon: Smartphone, glow: "rgba(99,102,241,0.3)", hoverGlow: "rgba(99,102,241,0.55)" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className={cn(
                      "p-4 sm:p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 relative overflow-hidden group",
                      darkMode
                        ? "bg-white/[0.03] border-brand/30 hover:border-brand/60"
                        : "bg-white border-brand/20 hover:border-brand/50 shadow-sm"
                    )}
                    style={{
                      boxShadow: `0 0 18px ${item.glow}`,
                    }}
                    onHoverStart={(e) => {
                      (e.target as HTMLElement).style.boxShadow = `0 0 35px ${item.hoverGlow}`;
                    }}
                    onHoverEnd={(e) => {
                      (e.target as HTMLElement).style.boxShadow = `0 0 18px ${item.glow}`;
                    }}
                  >
                    {/* Animated top glow line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    <item.icon className="w-6 sm:w-8 h-6 sm:h-8 text-brand group-hover:scale-110 transition-transform duration-300" />
                    <span className={cn("text-xs sm:text-sm font-bold uppercase tracking-widest", darkMode ? "text-slate-300" : "text-slate-700")}>
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={cn(
        "py-20 px-6 transition-colors duration-500 mt-12",
        darkMode ? "bg-white/[0.02] backdrop-blur-2xl border-white/5 hover:border-brand/30 shadow-[0_0_30px_rgba(37,99,235,0.03)] hover:shadow-[0_0_40px_rgba(37,99,235,0.1)] rounded-[2.5rem] transition-all duration-500" : "bg-white/40 backdrop-blur-3xl border-indigo-100/50 rounded-[3rem] shadow-[0_20px_50px_rgba(79,70,229,0.05)] transition-all duration-500"
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div 
                className="flex items-center gap-3 mb-6 cursor-pointer group"
                onClick={(e) => handleNavClick(e as any, '#top')}
                aria-label="Back to top"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand shadow-sm transition-transform group-hover:scale-110">
                  <img 
                    src={portfolioData.profileImage} 
                    alt={portfolioData.name} 
                    loading="lazy"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className={cn("text-2xl font-display font-bold tracking-tighter", darkMode ? "text-white" : "text-slate-900")}>
                  {portfolioData.name}<span className="text-brand">.</span>
                </span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed mb-8 text-justify text-base">
                Crafting high-performance digital experiences with precision and passion. Let's build something extraordinary together.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Github, href: portfolioData.github, label: "GitHub", color: darkMode ? "text-white hover:bg-white hover:text-slate-900 bg-white/20" : "text-slate-900 hover:bg-slate-900/10" },
                  { icon: Linkedin, href: portfolioData.linkedin, label: "LinkedIn", color: darkMode ? "text-white hover:bg-[#0077B5] hover:text-white bg-[#0077B5]/20" : "text-[#0077B5] hover:bg-[#0077B5]/10" },
                  { icon: Mail, href: `mailto:${portfolioData.email}`, label: "Email", color: darkMode ? "text-white hover:bg-[#EA4335] hover:text-white bg-[#EA4335]/20" : "text-[#EA4335] hover:bg-[#EA4335]/10" },
                  { icon: WhatsAppIcon, href: `https://api.whatsapp.com/send?phone=${portfolioData.whatsapp.replace(/\D/g, '')}`, label: "WhatsApp", color: darkMode ? "text-white hover:bg-[#25D366] hover:text-white bg-[#25D366]/20" : "text-[#25D366] hover:bg-[#25D366]/10" }
                ].map((social, i) => (
                  <motion.a 
                    key={i} 
                    href={social.href} 
                    target="_blank" 
                    rel="noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all border border-transparent hover:border-current/20 shadow-lg",
                      social.color
                    )}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-brand">Quick Links</h4>
              <ul className="space-y-4">
                {[
                  { name: 'About Me', href: '#about', icon: User, color: "text-blue-500" },
                  { name: 'Technical Skills', href: '#skills', icon: Cpu, color: "text-purple-500" },
                  { name: 'Projects', href: '#projects', icon: Layout, color: "text-brand" },
                  { name: 'Experience', href: '#experience', icon: Briefcase, color: "text-accent" },
                ].map(link => (
                  <li key={link.name}>
                    <motion.a 
                      href={link.href} 
                      onClick={(e) => handleNavClick(e, link.href)}
                      whileHover={{ x: 5 }}
                      className="text-slate-500 hover:text-brand transition-colors text-base font-medium flex items-center gap-3"
                    >
                      <link.icon className={cn("w-6 h-6", link.color)} />
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-brand">Contact</h4>
              <ul className="space-y-4">
                <motion.li whileHover={{ x: 5 }} className="flex items-center gap-3 sm:gap-4 text-slate-500 text-sm sm:text-base group">
                  <a href={`mailto:${portfolioData.email}`} className="flex items-center gap-3 sm:gap-4 hover:text-brand transition-colors font-medium break-all">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#EA4335] shrink-0" />
                    {portfolioData.email}
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="flex items-center gap-3 sm:gap-4 text-slate-500 text-sm sm:text-base group">
                  <a href={`https://api.whatsapp.com/send?phone=${portfolioData.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 sm:gap-4 hover:text-brand transition-colors font-medium whitespace-nowrap">
                    <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#25D366] shrink-0" />
                    {portfolioData.whatsapp}
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="flex items-center gap-4 text-slate-500 text-base group cursor-default">
                  <MapPin className="w-6 h-6 text-blue-500" />
                  <span className="font-medium">Gujrat, Pakistan</span>
                </motion.li>
              </ul>
            </div>
          </div>
          
          <div className={cn(
            "mt-12 pt-8 px-8 pb-8 border-t flex flex-col md:flex-row justify-between items-center gap-6 rounded-[2rem]",
            darkMode ? "border-white/10 bg-white/[0.02]" : "border-slate-100 bg-slate-50/50"
          )}>
            <p className="text-brand text-base font-bold">
              © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <a href="#" className="text-brand hover:text-brand/80 text-base font-bold uppercase tracking-widest transition-colors">Privacy Policy</a>
              <a href="#" className="text-brand hover:text-brand/80 text-base font-bold uppercase tracking-widest transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
