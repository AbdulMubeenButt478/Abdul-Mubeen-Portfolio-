/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
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
  Quote,
  Play,
  ArrowUpRight
} from 'lucide-react';
import { portfolioData } from './data';
import { cn } from './lib/utils';
import ShaderBackground from './components/ui/shader-background';
import { GlowCard } from './components/ui/spotlight-card';
import { FlipFadeText } from './components/ui/flip-fade-text';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.554 4.189 1.605 6.006L0 24l6.149-1.613a11.771 11.771 0 005.9 1.574h.005c6.637 0 12.032-5.396 12.035-12.031a11.768 11.768 0 00-3.475-8.52z" />
  </svg>
);

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
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
  "Web Management": { icon: Settings, color: "text-[#5a968f]", glow: "group-hover:shadow-[#5a968f]/10" },
  "CMS Management": { icon: Database, color: "text-[#4a827b]", glow: "group-hover:shadow-[#4a827b]/10" }
};

const SectionTitle = ({ children, subtitle, darkMode, className }: { children: React.ReactNode; subtitle?: string, darkMode?: boolean, className?: string }) => (
  <div className={cn("mb-8 sm:mb-12 relative z-20", className)}>
    <h2
      className={cn(
        "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 transition-colors",
        darkMode ? "text-white" : "text-slate-900"
      )}
    >
      {children}
    </h2>
    <div
      className="h-1.5 w-20 bg-gradient-to-r from-[#5a968f] to-[#4a827b] mt-1 sm:mt-2 mb-3 sm:mb-4 rounded-full"
    />
    {subtitle && (
      <p
        className={cn(
          "text-sm sm:text-base lg:text-lg w-full leading-normal mb-1 text-justify [text-justify:inter-word] transition-colors",
          darkMode ? "text-slate-400" : "text-slate-500"
        )}
      >
        {subtitle}
      </p>
    )}
  </div>
);

const ProjectCard = ({ project, index, isCurrent, darkMode }: { project: any, index: number, isCurrent?: boolean, darkMode?: boolean, key?: any }) => {
  const CardContent = (
    <>
      <div className={cn(
        "relative overflow-hidden aspect-video",
        isCurrent ? cn("h-48 flex items-center justify-center p-8 transition-colors duration-500", darkMode ? "bg-gradient-to-br from-slate-200/90 to-emerald-100/90 backdrop-blur-sm" : "bg-white") : ""
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
            <span className="bg-[#5a968f]/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-xl flex items-center gap-2 border border-white/20 tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              In Progress
            </span>
          </div>
        )}
        {!isCurrent && <div className={cn("absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-[#111827]/10 to-transparent", darkMode ? "opacity-80" : "opacity-0 md:hidden")} />}
        <div className="absolute inset-0 bg-[#5a968f]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className={cn(
          "flex flex-wrap gap-2 mb-4",
          !isCurrent && "md:hidden"
        )}>
          {project.tech.map((t: string) => {
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
        <h3 className={cn("text-2xl font-bold mb-3 group-hover:text-[#5a968f] transition-colors leading-tight truncate", darkMode ? "text-white" : "text-slate-900")} title={project.title}>{project.title}</h3>
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
                darkMode ? "bg-white/[0.05] border-white/10 text-white hover:bg-white/[0.1] hover:border-[#5a968f]/50" : "bg-slate-50 text-slate-900 border-slate-100 hover:border-slate-900/20"
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
            className="mt-auto flex items-center gap-2 text-[#5a968f] font-bold text-sm uppercase tracking-widest transition-transform"
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
          glowColor="emerald"
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
            ? "bg-white/[0.04] backdrop-blur-xl border-[#5a968f]/30 hover:border-[#5a968f] cursor-pointer shadow-xl shadow-[#5a968f]/20"
            : "bg-white/[0.02] backdrop-blur-xl border-white/10 hover:bg-white/[0.05] hover:border-[#5a968f]/50 hover:shadow-[0_0_40px_rgba(90,150,143,0.2)]"
          : isCurrent
            ? "bg-white backdrop-blur-lg border border-[#5a968f]/20 hover:border-[#5a968f] cursor-pointer shadow-[0_20px_50px_rgba(90,150,143,0.1)] transition-all duration-500"
            : "bg-white/80 backdrop-blur-2xl border-slate-200/60 hover:bg-white hover:border-[#5a968f]/40 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)] transition-all duration-500"
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
  const [activeLink, setActiveLink] = useState<string>('#top');

  const [scrollTarget, setScrollTarget] = useState<'top' | 'bottom'>('bottom');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
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

  useEffect(() => {
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
    { name: 'About Me', href: '#about', icon: User },
    { name: 'Technical Skills', href: '#skills', icon: Cpu },
    { name: 'Projects', href: '#projects', icon: Layout },
    { name: 'Experience', href: '#experience', icon: Briefcase },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      ref={containerRef}
      className={cn(
        "relative min-h-screen",
        darkMode ? "bg-[#0f172a] text-slate-100" : "bg-slate-50/50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(90,150,143,0.1),rgba(255,255,255,0))] text-slate-900"
      )}
    >
      {/* Global Glow Overlay - Persistent for smoothness */}
      <div
        className={cn(
          "fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_50%_0%,rgba(90,150,143,0.15),transparent_70%)] transition-opacity duration-700",
          darkMode ? "opacity-50" : "opacity-0"
        )}
      />
      {/* Floating Background Glows - GPU accelerated, reduced blur */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5a968f]/10 rounded-full blur-[60px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#4a827b]/10 rounded-full blur-[60px]" />
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
        className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 w-12 sm:w-14 h-12 sm:h-14 bg-[#344d36] text-white rounded-full shadow-[0_0_20px_rgba(52,77,54,0.35)] z-[100] flex items-center justify-center hover:bg-[#283c2a] transition-all duration-500 group border-2 border-white/20 backdrop-blur-sm"
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
        <span className="absolute inset-0 rounded-full bg-[#faab19] animate-ping opacity-25 -z-10" />

        <span className="absolute -top-12 right-0 bg-slate-900/90 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap font-bold uppercase tracking-widest shadow-xl border border-white/10 translate-y-2 group-hover:translate-y-0">
          {scrollTarget === 'bottom' ? 'Explore Bottom' : 'Back to Top'}
        </span>
      </motion.button>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#344d36] to-[#faab19] z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation - Floating Pill Design matching reference */}
      <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
        <nav className="max-w-6xl mx-auto rounded-full bg-[#344d36] text-white px-4 sm:px-6 py-2.5 sm:py-3 shadow-2xl shadow-black/30 flex items-center justify-between border border-white/10 pointer-events-auto transition-all duration-300">
          
          {/* Left Brand: Profile Image + Full Name */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e as any, '#top')}
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
            aria-label="Back to top"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-[#faab19] shadow-sm group-hover:scale-105 transition-transform bg-[#faab19]/20 flex items-center justify-center shrink-0">
              <img
                src={portfolioData.profileImage}
                alt={portfolioData.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-white font-bold text-base sm:text-lg lg:text-xl tracking-tight whitespace-nowrap">
              {portfolioData.name}<span className="text-[#faab19]">.</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a
              href="#top"
              onClick={(e) => { setActiveLink('#top'); handleNavClick(e as any, '#top'); }}
              className={`font-semibold text-sm transition-all cursor-pointer ${
                activeLink === '#top'
                  ? 'text-[#faab19] underline underline-offset-4 decoration-[#faab19] decoration-2'
                  : 'text-white/85 hover:text-[#faab19]'
              }`}
            >
              Home
            </a>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { setActiveLink(link.href); handleNavClick(e as any, link.href); }}
                className={`font-medium text-sm transition-all cursor-pointer ${
                  activeLink === link.href
                    ? 'text-[#faab19] underline underline-offset-4 decoration-[#faab19] decoration-2'
                    : 'text-white/85 hover:text-[#faab19]'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Section: Contact Me Pill Button & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Contact Me Button */}
            <button
              onClick={(e) => { setActiveLink('#contact'); handleNavClick(e as any, '#contact'); }}
              className="rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold px-5 sm:px-7 py-2 sm:py-2.5 text-xs sm:text-sm active:scale-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              Contact Me
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              className="md:hidden p-1.5 text-white hover:text-[#faab19] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </nav>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden max-w-6xl mx-auto mt-2 rounded-3xl bg-[#344d36] border border-white/10 p-5 shadow-2xl text-white pointer-events-auto flex flex-col gap-2"
            >
              <a
                href="#top"
                onClick={(e) => { setIsMenuOpen(false); handleNavClick(e as any, '#top'); }}
                className="flex items-center gap-3 p-3 rounded-xl text-[#faab19] font-bold text-sm bg-white/5"
              >
                Home
              </a>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { setActiveLink(link.href); setIsMenuOpen(false); handleNavClick(e as any, link.href); }}
                  className={`flex items-center gap-3 p-3 rounded-xl font-medium text-sm transition-colors ${
                    activeLink === link.href
                      ? 'text-[#faab19] bg-white/5 underline underline-offset-4 decoration-[#faab19]'
                      : 'text-white/85 hover:text-[#faab19] hover:bg-white/5'
                  }`}
                >
                  <link.icon className="w-4 h-4 text-[#faab19]" />
                  <span>{link.name}</span>
                </a>
              ))}
              <button
                onClick={(e) => { setIsMenuOpen(false); handleNavClick(e as any, '#contact'); }}
                className="mt-2 w-full py-3 rounded-full bg-white text-slate-900 font-bold text-sm shadow-md"
              >
                Contact Me
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        id="top"
        className="relative min-h-[85vh] lg:min-h-screen flex items-center px-4 sm:px-8 lg:px-14 pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden z-10 bg-white"
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* LEFT COLUMN: TEXT CONTENT & CTAS */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* 1. Hello There! Selection Box Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative inline-flex items-center px-5 py-1.5 sm:py-2 bg-white border border-slate-900 mb-6 sm:mb-8 self-start shadow-sm"
            >
              {/* 4 Corner Anchor Handles (Figma / Canvas selection box style) */}
              <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#faab19] border border-slate-900" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#faab19] border border-slate-900" />
              <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#faab19] border border-slate-900" />
              <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#faab19] border border-slate-900" />
              
              <span className="font-semibold text-sm sm:text-base text-slate-900 tracking-wide select-none">
                Hello There!
              </span>
            </motion.div>

            {/* 2. Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[32px] sm:text-[40px] md:text-[46px] leading-[36px] sm:leading-[42px] md:leading-[46px] font-semibold tracking-tight text-slate-900 mb-6"
            >
              I'm{' '}
              <span className="text-[#faab19] relative inline-block underline decoration-[#faab19] decoration-[3px] sm:decoration-4 underline-offset-8 sm:underline-offset-[10px]">
                {portfolioData.name}
              </span>
              ,<br />
              Front-End Developer<br />
              Based in Pakistan.
            </motion.h1>

            {/* 3. Description Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[18px] leading-[30px] font-medium text-black max-w-xl mb-8 sm:mb-10 text-left"
            >
              I'm an experienced Front-End Developer with a passion for building fast, responsive, and easy-to-use digital experiences, collaborating with innovative companies and startups.
            </motion.p>

            {/* 4. Action Buttons (Composite Pill + Hire Me Outline Pill) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              {/* Primary Composite Pill Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center rounded-full bg-[#344d36] hover:bg-[#283c2a] pl-6 sm:pl-8 pr-2 sm:pr-2.5 py-2 sm:py-2.5 text-white font-bold text-sm sm:text-base shadow-xl shadow-[#344d36]/25 transition-all duration-300 cursor-pointer"
              >
                <span>View My Portfolio</span>
                <span className="ml-4 sm:ml-5 w-9 sm:w-11 h-9 sm:h-11 rounded-full bg-[#faab19] flex items-center justify-center text-[#344d36] shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <Play className="w-4 sm:w-5 h-4 sm:h-5 fill-[#344d36] text-[#344d36] translate-x-0.5" />
                </span>
              </motion.button>

              {/* Secondary Outline Pill Button: Download CV */}
              <motion.a
                href={portfolioData.cvLink}
                rel="noreferrer"
                download
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full border-2 border-slate-900 bg-white hover:bg-slate-900 text-slate-900 hover:text-white px-7 sm:px-9 py-3 sm:py-3.5 font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer shadow-sm inline-flex items-center gap-2"
              >
                <span>Download CV</span>
                <Download className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: HERO GRAPHIC & PROFILE IMAGE */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[480px] flex items-center justify-center">

              {/* 1. Organic Backdrop Blob (#faab19) */}
              <div 
                className="absolute w-[82%] sm:w-[86%] aspect-[1/1] bg-[#faab19] -z-0"
                style={{
                  borderRadius: '45% 55% 62% 38% / 40% 48% 52% 60%',
                  transform: 'rotate(-4deg) translateY(-10px)'
                }}
              />

              {/* 2. Curved Accent Arc Line on the Left of Blob */}
              <svg 
                className="absolute -left-2 sm:-left-6 top-1/4 w-10 sm:w-14 h-24 sm:h-32 pointer-events-none -z-0"
                viewBox="0 0 50 100" 
                fill="none"
              >
                <path 
                  d="M40 10 C 15 35, 15 65, 40 90" 
                  stroke="#1a1a1a" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                />
              </svg>

              {/* 3. Profile Image */}
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                src={portfolioData.profileImage}
                alt={portfolioData.name}
                className="w-full h-auto max-h-[460px] sm:max-h-[520px] lg:max-h-[560px] object-contain relative z-10 select-none pointer-events-none drop-shadow-md"
              />

              {/* 4. Floating Badge 1 (Bottom Left / Dark Green): Front-End Developer */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-4 sm:bottom-8 -left-2 sm:-left-6 z-20 flex flex-col items-start"
              >
                {/* Custom Figma Selection Pointer Icon matching reference */}
                <div className="ml-1.5 -mb-1">
                  <svg
                    className="w-5 h-5 text-[#344d36]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  >
                    <path d="M4.5 3.5 L19.2 9.8 C20.5 10.4 20.5 12.3 19.2 12.9 L13.4 15.4 L10.9 21.2 C10.3 22.5 8.4 22.5 7.8 21.2 L3.6 5.2 C3.3 4.1 4.3 3.1 5.4 3.5 Z" />
                  </svg>
                </div>
                <div className="bg-[#344d36] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-xl shadow-[#344d36]/30 border border-white/20 whitespace-nowrap">
                  Front-End Developer
                </div>
              </motion.div>

              {/* 5. Floating Badge 2 (Right / Golden Yellow): Web Manager */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                className="absolute bottom-14 sm:bottom-20 -right-2 sm:-right-6 z-20 flex flex-col items-start"
              >
                {/* Custom Figma Selection Pointer Icon matching reference */}
                <div className="ml-1.5 -mb-1">
                  <svg
                    className="w-5 h-5 text-[#faab19]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  >
                    <path d="M4.5 3.5 L19.2 9.8 C20.5 10.4 20.5 12.3 19.2 12.9 L13.4 15.4 L10.9 21.2 C10.3 22.5 8.4 22.5 7.8 21.2 L3.6 5.2 C3.3 4.1 4.3 3.1 5.4 3.5 Z" />
                  </svg>
                </div>
                <div className="bg-[#faab19] text-slate-950 text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-xl shadow-amber-500/30 whitespace-nowrap">
                  Web Manager
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className={cn(
        "py-12 sm:py-16 px-6 sm:px-12 md:px-20 transition-all duration-700 relative overflow-hidden z-10 border-y",
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

      {/* About Section — Reference-style redesign */}
      <section id="about" className="py-16 lg:py-24 px-6 sm:px-12 md:px-20 overflow-hidden z-10 relative" style={{ background: '#344d36' }}>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── LEFT: Circular Photo + Overlaid Skill Tags ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex items-end justify-center"
            style={{ minHeight: '420px' }}
          >
            {/* Yellow circle — sits at bottom, image overflows above */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-full bg-[#faab19] shadow-2xl shadow-[#faab19]/30"
            />

            {/* Profile image — overflows above the circle */}
            <img
              src={portfolioData.profileImage}
              alt={portfolioData.name}
              className="relative z-10 w-[280px] sm:w-[340px] object-cover object-top select-none pointer-events-none"
              style={{ marginBottom: '-8px' }}
            />

            {/* Overlaid Skill Pills — on the lower half of the image like reference */}
            {[
              { label: 'UI/UX Design',      bottom: '34%', left: '54%',  delay: 0,    bg: '#faab19', text: '#1a1a1a', border: '#344d36' },
              { label: 'Web Management',    bottom: '26%', left: '-2%',  delay: 0.25, bg: '#344d36', text: '#fff',    border: '#faab19' },
              { label: 'Website Design',    bottom: '22%', left: '52%',  delay: 0.5,  bg: '#faab19', text: '#1a1a1a', border: '#344d36' },
              { label: 'SEO Optimization',  bottom: '14%', left: '-6%',  delay: 0.75, bg: '#344d36', text: '#fff',    border: '#faab19' },
              { label: 'Front-End Dev',     bottom: '10%', left: '50%',  delay: 1.0,  bg: '#faab19', text: '#1a1a1a', border: '#344d36' },
              { label: 'CMS Management',    bottom: '2%',  left: '4%',   delay: 1.25, bg: '#344d36', text: '#fff',    border: '#faab19' },
              { label: 'React & Tailwind',  bottom: '2%',  left: '52%',  delay: 1.5,  bg: '#faab19', text: '#1a1a1a', border: '#344d36' },
            ].map((tag, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: tag.delay, duration: 0.4 }}
                animate={{ y: [0, i % 2 === 0 ? -5 : 5, 0] }}
                style={{
                  position: 'absolute',
                  bottom: tag.bottom,
                  left: tag.left,
                  background: tag.bg,
                  color: tag.text,
                  border: `1.5px solid ${tag.border}`,
                }}
                className="px-3 py-1.5 rounded-full text-xs font-bold shadow-lg whitespace-nowrap z-20 cursor-default select-none"
              >
                {tag.label}
              </motion.div>
            ))}
          </motion.div>

          {/* ── RIGHT: Text Content ── */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Label */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-[#faab19] inline-block" />
              <span className="text-[#faab19] text-sm font-semibold tracking-widest uppercase">About Me</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Who is <span className="text-[#faab19] italic font-extrabold">Abdul Mubeen?</span>
            </h2>

            {/* Summary paragraphs */}
            <div className="mb-6 space-y-3">
              {Array.isArray(portfolioData.summary) ? (
                portfolioData.summary.map((para, i) => (
                  <p key={i} className="text-white/75 text-sm sm:text-base leading-relaxed">
                    {para}
                  </p>
                ))
              ) : (
                <p className="text-white/75 text-sm sm:text-base leading-relaxed">{portfolioData.summary}</p>
              )}
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-6 sm:gap-10 mb-8">
              {[
                { value: '15+', label: 'Projects Completed' },
                { value: '10+', label: 'Certifications' },
                { value: '1+',  label: 'Years of Experience' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                  className="flex flex-col"
                >
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#faab19] leading-none">{stat.value}</span>
                  <span className="text-white/60 text-xs sm:text-sm mt-1 font-medium">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Download CV Button */}
            <div className="flex items-center gap-4 flex-wrap">
              <motion.a
                href={portfolioData.cvLink}
                rel="noreferrer"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-white rounded-full pl-6 pr-2 py-2 shadow-xl cursor-pointer group"
              >
                <span className="text-[#faab19] font-bold text-sm sm:text-base group-hover:text-[#344d36] transition-colors">
                  Download CV <span className="text-[#344d36] group-hover:text-[#faab19] transition-colors">•</span>
                </span>
                <span className="w-9 h-9 rounded-full bg-[#faab19] flex items-center justify-center shadow-md flex-shrink-0 group-hover:bg-[#344d36] transition-colors">
                  <Download className="w-4 h-4 text-slate-900 group-hover:text-white transition-colors" />
                </span>
              </motion.a>

              {/* Signature */}
              <span
                className="text-white/40 italic font-bold text-xl tracking-wide hidden sm:inline"
                style={{ fontFamily: 'cursive' }}
              >
                Abdul Mubeen
              </span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={cn(
        "pt-8 pb-12 lg:py-20 px-6 sm:px-12 md:px-20 min-h-fit lg:min-h-screen flex items-center transition-colors duration-500 relative overflow-hidden z-10 border-b",
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
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 relative">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-2xl bg-brand/10 flex items-center justify-center">
                <Briefcase className="w-5 sm:w-6 h-5 sm:h-6 text-brand" />
              </div>
              <h2 className={cn("text-2xl sm:text-3xl font-bold", darkMode ? "text-white" : "text-slate-900")}>Experience</h2>
              <div className="absolute -bottom-4 left-0 h-1.5 w-20 bg-gradient-to-r from-brand to-accent rounded-full" />
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
              <div className="absolute -bottom-4 left-0 h-1.5 w-20 bg-gradient-to-r from-brand to-accent rounded-full" />
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
        "pt-8 pb-12 lg:py-20 px-6 sm:px-12 md:px-20 min-h-fit lg:min-h-screen flex items-center transition-colors duration-500 relative overflow-hidden z-10 border-b",
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
        "pt-8 pb-12 lg:py-20 px-6 sm:px-12 md:px-20 min-h-fit lg:min-h-screen flex items-center transition-colors duration-500 relative overflow-hidden z-10 border-b",
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            {portfolioData.projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} darkMode={darkMode} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Let's Work Together */}
      <section id="lets-talk" className={cn(
        "py-12 lg:py-24 px-6 sm:px-12 my-8 mx-auto max-w-[95%] xl:max-w-7xl relative overflow-hidden border transition-colors duration-500 rounded-[2.5rem]",
        darkMode ? "bg-white/[0.02] backdrop-blur-2xl border-white/5 hover:border-brand/30 shadow-[0_0_30px_rgba(37,99,235,0.03)] hover:shadow-[0_0_40px_rgba(37,99,235,0.1)] rounded-[2.5rem] transition-all duration-500" : "bg-white/40 backdrop-blur-3xl border-indigo-100/50 rounded-[3rem] shadow-[0_20px_50px_rgba(79,70,229,0.05)] transition-all duration-500"
      )}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={cn(
              "p-8 sm:p-12 rounded-[3rem] relative overflow-hidden group",
              "border-2 transition-all duration-500 shadow-2xl",
              darkMode
                ? "bg-white/[0.03] border-brand/40 shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:shadow-[0_0_50px_rgba(99,102,241,0.45)] hover:border-brand/70"
                : "bg-white border-brand/30 shadow-[0_0_25px_rgba(99,102,241,0.15)] hover:shadow-[0_0_45px_rgba(99,102,241,0.3)] hover:border-brand/60"
            )}
          >
            {/* Animated top & bottom glow bars */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent animate-pulse" />
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
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
        "py-8 lg:py-16 px-6 sm:px-12 md:px-20 transition-colors duration-500 relative overflow-hidden z-10 border-b",
        darkMode ? "bg-white/[0.01] border-white/5" : "bg-slate-50/30 border-indigo-50"
      )}>
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            subtitle="My philosophy is simple: keep it clean, make it fast, and focus on the user. Every pixel serves a purpose, and every line of code adds value."
            darkMode={darkMode}
            className="text-center flex flex-col items-center mb-10 sm:mb-16"
          >
            CORE PRINCIPLES
          </SectionTitle>

          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            {/* Left Column: Philosophy Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={cn(
                "px-5 py-6 sm:px-8 sm:py-8 rounded-[2.5rem] relative overflow-hidden group flex flex-col justify-center h-full",
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
                "text-base sm:text-lg font-medium leading-relaxed italic mb-3 relative z-10 text-justify",
                darkMode ? "text-slate-200" : "text-slate-700"
              )}>
                "Success in web development is not just about writing code; it's about creating digital experiences that solve real problems and leave a lasting impression."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#5a968f]/60 shadow-[0_0_12px_rgba(90,150,143,0.4)] flex-shrink-0">
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

            {/* Right Column: 4 Principle Cards */}
            <div className="grid grid-cols-2 gap-4 h-full">
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
                    "p-3 sm:p-5 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 text-center transition-all duration-300 relative overflow-hidden group",
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
      </section>

      {/* Footer */}
      <footer className={cn(
        "py-10 lg:py-20 px-6 transition-all duration-500 mt-4 lg:mt-12",
        "bg-[#f5faf9] border border-indigo-100/50 rounded-[3rem] shadow-[0_20px_50px_rgba(90,150,143,0.05)]"
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div
                className="flex items-center gap-3 mb-6 cursor-pointer group"
                onClick={(e) => handleNavClick(e as any, '#top')}
                aria-label="Back to top"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#5a968f] shadow-sm transition-transform group-hover:scale-110">
                  <img
                    src={portfolioData.profileImage}
                    alt={portfolioData.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-2xl font-display font-bold tracking-tighter text-black">
                  {portfolioData.name}<span className="text-brand">.</span>
                </span>
              </div>
              <p className="max-w-sm leading-relaxed mb-8 text-justify text-base text-black">
                Crafting high-performance digital experiences with precision and passion. Let's build something extraordinary together.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Github, href: portfolioData.github, label: "GitHub" },
                  { icon: Linkedin, href: portfolioData.linkedin, label: "LinkedIn" },
                  { icon: Mail, href: `mailto:${portfolioData.email}`, label: "Email" },
                  { icon: WhatsAppIcon, href: `https://api.whatsapp.com/send?phone=${portfolioData.whatsapp.replace(/\D/g, '')}`, label: "WhatsApp" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all border border-transparent shadow-lg text-white bg-[#5a968f] hover:bg-[#5a968f]/80"
                    )}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-[#5a968f]">Quick Links</h4>
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
                      className="transition-colors text-base font-medium flex items-center gap-3 text-black hover:text-brand"
                    >
                      <link.icon className={cn("w-6 h-6", link.color)} />
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-[#5a968f]">Contact</h4>
              <ul className="space-y-4">
                <motion.li whileHover={{ x: 5 }} className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base group text-black">
                  <a href={`mailto:${portfolioData.email}`} className="flex items-center gap-3 sm:gap-4 hover:text-brand transition-colors font-medium break-all">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#EA4335] shrink-0" />
                    {portfolioData.email}
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base group text-black">
                  <a href={`https://api.whatsapp.com/send?phone=${portfolioData.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 sm:gap-4 hover:text-brand transition-colors font-medium whitespace-nowrap">
                    <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#25D366] shrink-0" />
                    {portfolioData.whatsapp}
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} className="flex items-center gap-4 text-base group cursor-default text-black">
                  <MapPin className="w-6 h-6 text-blue-500" />
                  <span className="font-medium">Gujrat, Pakistan</span>
                </motion.li>
              </ul>
            </div>
          </div>

          <div className={cn(
            "mt-12 p-8 flex flex-col md:flex-row justify-between items-center gap-6 rounded-[2rem] shadow-inner",
            "bg-[#5a968f] text-white"
          )}>
            <p className="text-white text-base font-bold">
              © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
            </p>

            <div className="flex gap-6">
              <a href="#" className="text-white hover:text-white/80 text-base font-bold uppercase tracking-widest transition-colors">Privacy Policy</a>
              <a href="#" className="text-white hover:text-white/80 text-base font-bold uppercase tracking-widest transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
