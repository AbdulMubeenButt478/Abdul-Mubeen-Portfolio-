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
  ChevronDown,
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
  ArrowUpRight,
  Building2,
  Calendar,
  Sparkles,
  Zap,
  Home,
  Phone
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

const skillIconMap: Record<string, { icon: any, level: number, highlight: string, group: 'Frontend' | 'Tools' | 'Optimization' }> = {
  "HTML5": { icon: Globe, level: 95, highlight: "Semantic Structure & Accessibility", group: "Frontend" },
  "CSS3": { icon: Palette, level: 92, highlight: "Modern Layouts, Animations & Responsive", group: "Frontend" },
  "JavaScript": { icon: Code2, level: 90, highlight: "ES6+, Async, APIs & DOM Dynamics", group: "Frontend" },
  "React": { icon: Layers, level: 88, highlight: "SPA Architecture, Hooks & Component Flow", group: "Frontend" },
  "Tailwind CSS": { icon: Layout, level: 95, highlight: "Rapid Utility Styling & Modern Design", group: "Frontend" },
  "Git & GitHub": { icon: Github, level: 90, highlight: "Version Control, Branching & Collab", group: "Tools" },
  "SEO Optimization": { icon: Search, level: 94, highlight: "Core Web Vitals, Audits & Indexing", group: "Optimization" },
  "UI/UX Design": { icon: Monitor, level: 88, highlight: "User Experience, Layouts & Visual Flow", group: "Optimization" },
  "Web Management": { icon: Settings, level: 94, highlight: "Website Health, Speed & Maintenance", group: "Optimization" },
  "CMS Management": { icon: Database, level: 88, highlight: "Content Workflows, Publishing & Setup", group: "Tools" }
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

  if (isCurrent) {
    return (
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        whileHover={{ y: -10 }}
        className={cn(
          "group relative overflow-hidden rounded-[24px] transition-all duration-500 hover:shadow-2xl shadow-sm flex flex-col h-full border block",
          darkMode
            ? "bg-white/[0.04] backdrop-blur-xl border-[#5a968f]/30 hover:border-[#5a968f] cursor-pointer shadow-xl shadow-[#5a968f]/20"
            : "bg-white backdrop-blur-lg border border-[#5a968f]/20 hover:border-[#5a968f] cursor-pointer shadow-[0_20px_50px_rgba(90,150,143,0.1)] transition-all duration-500"
        )}
      >
        {CardContent}
      </motion.a>
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
          ? "bg-white/[0.02] backdrop-blur-xl border-white/10 hover:bg-white/[0.05] hover:border-[#5a968f]/50 hover:shadow-[0_0_40px_rgba(90,150,143,0.2)]"
          : "bg-white/80 backdrop-blur-2xl border-slate-200/60 hover:bg-white hover:border-[#5a968f]/40 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)] transition-all duration-500"
      )}
    >
      {CardContent}
    </motion.div>
  );
};

export default function App() {
  const containerRef = useRef(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formFeedback, setFormFeedback] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('#top');
  const [skillFilter, setSkillFilter] = useState<'All' | 'Frontend' | 'Tools' | 'Optimization'>('All');

  const [scrollTarget, setScrollTarget] = useState<'top' | 'bottom'>('bottom');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    try {
      const lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        syncTouch: true,
      });
      lenisRef.current = lenis;

      let running = true;
      function raf(time: number) {
        if (!running) return;
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        running = false;
        try {
          lenis.destroy();
        } catch (_) {}
        lenisRef.current = null;
      };
    } catch (e) {
      console.warn('Lenis could not be initialized:', e);
    }
  }, []);


  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(element, { offset: -80, duration: 1 });
      } else {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }

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
      if (lenisRef.current) {
        lenisRef.current.scrollTo(document.body.scrollHeight, { duration: 1.2 });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    } else {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
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
        setFormFeedback(null);
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
        setFormFeedback('Action Required: Please check your email (mubeenbutt375@gmail.com) and click the "Activate Form" link to start receiving messages. This is a one-time security step.');
      } else {
        setFormFeedback('Something went wrong sending your message. Please try again or reach out directly via WhatsApp or email.');
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
                {portfolioData.name}.
              </span>
              <br />
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

      {/* Key Metrics / Stats Section - White Section Background & Brand Green (#344d36) Cards */}
      <section 
        className="py-12 sm:py-16 px-6 sm:px-12 md:px-20 transition-all duration-700 relative overflow-hidden z-10 border-y border-slate-200/80 bg-white"
        style={{ background: '#ffffff' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#faab19] animate-pulse" />
              <h2 className="text-xl sm:text-2xl font-black tracking-wider uppercase text-[#344d36]">
                Key Metrics
              </h2>
            </div>
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#faab19] to-[#344d36] rounded-full shadow-[0_0_12px_rgba(250,171,25,0.35)]" />
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
                  staggerChildren: 0.15,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }
              }
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 p-5 sm:p-7 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[36px] bg-amber-50/20 border-2 border-[#faab19] shadow-xl shadow-[#faab19]/10"
          >
            {[
              { label: "Years Experience", value: "1+", badge: "Active" },
              { label: "Projects Completed", value: "15+", badge: "Delivered" },
              { label: "Web Performance", value: "99%", badge: "Optimized" },
              { label: "Certifications", value: "10+", badge: "Verified" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ y: -7, scale: 1.02 }}
                className="relative text-center p-5 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-[#faab19] transition-all duration-300 group cursor-default overflow-hidden shadow-xl shadow-[#344d36]/15 hover:shadow-2xl hover:shadow-[#faab19]/35 hover:border-[#faab19]"
                style={{ background: '#344d36' }}
              >
                {/* Subtle top golden indicator bar on hover */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-20 h-1 bg-[#faab19] rounded-full transition-all duration-300" />

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#faab19] mb-2 tracking-tight group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                  {stat.value}
                </h3>
                <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white transition-colors">
                  {stat.label}
                </p>
                <div className="mt-3 flex justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-white/10 border-white/20 text-white/90 group-hover:bg-[#faab19]/20 group-hover:border-[#faab19]/60 group-hover:text-[#faab19] transition-all">
                    {stat.badge}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section — Reference-style redesign matching uploaded image */}
      <section id="about" className="py-16 lg:py-24 px-6 sm:px-12 md:px-20 overflow-hidden z-10 relative" style={{ background: '#344d36' }}>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Circular Portrait + Overlaid Skill Badges matching user image ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center w-full py-4"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] aspect-square flex items-center justify-center">

              {/* Decorative background contour ripple line art (like the reference) */}
              <svg 
                className="absolute -top-8 -left-8 w-24 sm:w-32 h-24 sm:h-32 text-[#faab19] opacity-25 pointer-events-none"
                viewBox="0 0 100 100" 
                fill="none"
              >
                <circle cx="20" cy="20" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
                <circle cx="20" cy="20" r="50" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <svg 
                className="absolute -bottom-8 -right-8 w-28 sm:w-36 h-28 sm:h-36 text-[#faab19] opacity-25 pointer-events-none"
                viewBox="0 0 100 100" 
                fill="none"
              >
                <circle cx="80" cy="80" r="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
                <circle cx="80" cy="80" r="60" stroke="currentColor" strokeWidth="2" />
              </svg>

              {/* 1. Main Large Yellow Circle & Profile Photo Frame */}
              <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px] flex items-center justify-center">
                
                {/* Yellow Circle with Overflow Hidden for the base photo */}
                <div className="absolute inset-0 rounded-full bg-[#faab19] overflow-hidden shadow-2xl shadow-black/40 flex items-center justify-center border-4 border-white/20">
                  {/* Subtle topographic / concentric ripple lines inside the yellow circle */}
                  <svg 
                    className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" 
                    viewBox="0 0 400 400" 
                    fill="none"
                  >
                    <circle cx="200" cy="200" r="185" stroke="#000" strokeWidth="2.5" strokeDasharray="8 8" />
                    <circle cx="200" cy="200" r="145" stroke="#000" strokeWidth="2" />
                    <circle cx="200" cy="200" r="105" stroke="#000" strokeWidth="2" strokeDasharray="6 6" />
                    <circle cx="330" cy="90" r="50" stroke="#000" strokeWidth="2" opacity="0.7" />
                    <circle cx="70" cy="290" r="45" stroke="#000" strokeWidth="2" opacity="0.7" />
                  </svg>

                  {/* Profile Photo: Full head & hair completely visible with comfortable breathing room at top */}
                  <img
                    src={portfolioData.profileImage}
                    alt={portfolioData.name}
                    className="w-[94%] sm:w-[94%] h-[94%] sm:h-[94%] object-contain select-none pointer-events-none transform translate-y-2 sm:translate-y-3 drop-shadow-xl"
                  />
                </div>

                {/* 2. Floating Overlaid Skill Pill Cluster (positioned on tie/lower suit chest, overlapping the bottom rim cleanly) */}
                <div className="absolute inset-x-0 -bottom-4 sm:-bottom-5 z-20 flex flex-col items-center gap-1 sm:gap-1.5 px-2 pointer-events-auto">
                  {/* Row 1: UX/UI Design (Top Centered - on tie knot/collar, clear of beard) */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="bg-[#faab19] text-slate-950 text-xs sm:text-sm font-extrabold px-5 sm:px-6 py-1 sm:py-1.5 rounded-full border-2 border-white shadow-xl shadow-black/30 tracking-wide select-none cursor-default"
                  >
                    UX/UI Design
                  </motion.div>

                  {/* Row 2: Mobile App Design (Left / Green) + Website Design (Right / Yellow) */}
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 w-full -mt-0.5">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: -4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="bg-[#233a2d] text-white text-[11px] sm:text-xs font-bold px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border-2 border-white shadow-xl shadow-black/30 -rotate-3 select-none cursor-default"
                    >
                      Mobile App Design
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="bg-[#faab19] text-slate-950 text-[11px] sm:text-xs font-extrabold px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border-2 border-white shadow-xl shadow-black/30 rotate-3 select-none cursor-default"
                    >
                      Website Design
                    </motion.div>
                  </div>

                  {/* Row 3: Design System (Left / Yellow), Prototype (Center / Green), Dashboard (Right / Green) */}
                  <div className="flex items-center justify-center gap-1 sm:gap-2 w-full -mt-0.5">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: -6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="bg-[#faab19] text-slate-950 text-[10px] sm:text-[11px] font-extrabold px-3 sm:px-3.5 py-1 rounded-full border-2 border-white shadow-xl shadow-black/30 -rotate-6 select-none cursor-default"
                    >
                      Design System
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="bg-[#233a2d] text-white text-[10px] sm:text-[11px] font-bold px-3 sm:px-3.5 py-1 rounded-full border-2 border-white shadow-xl shadow-black/30 select-none cursor-default"
                    >
                      Prototype
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="bg-[#233a2d] text-white text-[10px] sm:text-[11px] font-bold px-3 sm:px-3.5 py-1 rounded-full border-2 border-white shadow-xl shadow-black/30 rotate-6 select-none cursor-default"
                    >
                      Dashboard
                    </motion.div>
                  </div>

                  {/* Row 4: Wireframe Design (Bottom Centered - overlaps the bottom curve cleanly) */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="bg-[#faab19] text-slate-950 text-xs sm:text-sm font-extrabold px-5 sm:px-6 py-1 sm:py-1.5 rounded-full border-2 border-white shadow-xl shadow-black/30 -mt-0.5 select-none cursor-default"
                  >
                    Wireframe Design
                  </motion.div>
                </div>

              </div>

            </div>
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

            {/* Heading — Abdul Mubeen in yellow with a dot */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Who is <span className="text-[#faab19] font-extrabold">Abdul Mubeen.</span>
            </h2>

            {/* Summary paragraphs — Proper White Color */}
            <div className="mb-6 space-y-3">
              {Array.isArray(portfolioData.summary) ? (
                portfolioData.summary.map((para, i) => (
                  <p key={i} className="text-white text-base sm:text-lg leading-relaxed font-normal">
                    {para}
                  </p>
                ))
              ) : (
                <p className="text-white text-base sm:text-lg leading-relaxed font-normal">{portfolioData.summary}</p>
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
                  <span className="text-white text-xs sm:text-sm mt-1 font-medium">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Download CV Button — Black text, no dot */}
            <div className="flex items-center gap-4 flex-wrap">
              <motion.a
                href={portfolioData.cvLink}
                rel="noreferrer"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 bg-white hover:bg-slate-100 rounded-full pl-6 pr-2 py-2 shadow-xl cursor-pointer group transition-all"
              >
                <span className="text-black font-bold text-sm sm:text-base">
                  Download CV
                </span>
                <span className="w-9 h-9 rounded-full bg-[#faab19] flex items-center justify-center shadow-md flex-shrink-0 group-hover:bg-[#233a2d] transition-colors">
                  <Download className="w-4 h-4 text-black group-hover:text-white transition-colors" />
                </span>
              </motion.a>

              {/* Signature */}
              <span
                className="text-[#faab19] italic font-bold text-xl tracking-wide hidden sm:inline"
                style={{ fontFamily: 'cursive' }}
              >
                Abdul Mubeen.
              </span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Technical Skills Section - Modern High-End UI with Brand Green (#344d36) & Yellow (#faab19) */}
      <section 
        id="skills" 
        className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 transition-colors duration-500 relative overflow-hidden z-10 border-b border-slate-200/80 bg-white"
        style={{ background: '#ffffff' }}
      >
        {/* Ambient brand color glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#faab19]/5 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#344d36]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Main Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            {/* Top Tag: — Technical Arsenal */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[3px] bg-[#faab19] rounded-full inline-block" />
              <span className="text-sm sm:text-base font-bold text-slate-800 tracking-wide uppercase">
                Technical Arsenal
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] mb-4">
              <span className="font-black text-black">My Technical </span>
              <span className="italic text-[#faab19] font-extrabold">Skills & Stack</span>
            </h2>

            {/* Description under main heading: 16px font-size, 24px line-height, font-weight 500 */}
            <p className="text-[16px] leading-[24px] font-[500] text-slate-700 max-w-2xl mx-auto">
              A specialized set of frontend technologies, optimization tools, and web management expertise delivering fast, modern, and reliable digital experiences.
            </p>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10 sm:mb-12">
            {[
              { id: 'All', label: 'All Technologies', count: portfolioData.skills.length },
              { id: 'Frontend', label: 'Frontend Development', count: portfolioData.skills.filter(s => skillIconMap[s.name]?.group === 'Frontend').length },
              { id: 'Tools', label: 'Tools & CMS', count: portfolioData.skills.filter(s => skillIconMap[s.name]?.group === 'Tools').length },
              { id: 'Optimization', label: 'Optimization & Design', count: portfolioData.skills.filter(s => skillIconMap[s.name]?.group === 'Optimization').length }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSkillFilter(tab.id as any)}
                className={cn(
                  "px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black transition-all duration-300 flex items-center gap-2 cursor-pointer",
                  skillFilter === tab.id
                    ? "bg-[#344d36] text-white border-2 border-[#344d36] shadow-lg shadow-[#344d36]/25 scale-105"
                    : "bg-white hover:bg-[#344d36]/5 text-black border-2 border-[#344d36] shadow-xs"
                )}
              >
                <span>{tab.label}</span>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-black",
                  skillFilter === tab.id
                    ? "bg-[#faab19] text-black"
                    : "bg-[#344d36]/10 text-black"
                )}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Skills Cards Grid - Inactive state has green color border (#344d36) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {portfolioData.skills
              .filter(skill => {
                if (skillFilter === 'All') return true;
                const group = skillIconMap[skill.name]?.group;
                return group === skillFilter;
              })
              .map(skill => {
                const info = skillIconMap[skill.name] || {
                  icon: Code2,
                  level: 85,
                  highlight: "Web Development Skill",
                  group: "Frontend"
                };
                const Icon = info.icon;

                return (
                  <motion.div
                    layout
                    key={skill.name}
                    initial={{ opacity: 0.85, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="relative p-5 sm:p-6 rounded-2xl border-2 border-[#344d36] hover:border-[#faab19] bg-white transition-all duration-300 group cursor-default overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#faab19]/20 flex flex-col items-center text-center justify-center gap-3"
                  >
                    {/* Top yellow-green accent line on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#faab19] via-[#344d36] to-[#faab19] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Compact Centered Brand Icon */}
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#344d36] border-2 border-[#faab19] flex items-center justify-center text-[#faab19] shadow-sm shadow-[#344d36]/20 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#faab19]" />
                    </div>

                    {/* Skill Name in Solid Black */}
                    <h4 className="text-sm sm:text-base font-black text-black group-hover:text-[#344d36] transition-colors tracking-tight">
                      {skill.name}
                    </h4>

                    {/* Category Pill Tag */}
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                      {skill.category}
                    </span>
                  </motion.div>
                );
              })}
          </div>

        </div>
      </section>

      {/* Experience & Education Section - Clean White Background with Custom Academic/Professional Journey Header */}
      <section 
        id="experience" 
        className="py-20 sm:py-28 px-6 sm:px-12 md:px-20 transition-colors duration-500 relative overflow-hidden z-10 border-b border-slate-200/80 bg-white"
        style={{ background: '#ffffff' }}
      >
        {/* Subtle ambient brand color glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#faab19]/5 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#344d36]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Main Section Header matching uploaded reference image */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            {/* Top Tag: — Education & Work */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[3px] bg-[#faab19] rounded-full inline-block" />
              <span className="text-sm sm:text-base font-bold text-slate-800 tracking-wide">
                Education & Work
              </span>
            </div>

            {/* Main Title: My Academic and / Professional Journey */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15]">
              <span className="font-extrabold text-slate-950">My </span>
              <span className="italic text-[#faab19] font-extrabold">Academic and</span>
              <br />
              <span className="italic text-[#faab19] font-extrabold">Professional </span>
              <span className="font-extrabold text-slate-950">Journey</span>
            </h2>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20">
            {/* 1. Experience Column */}
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 relative">
                <div className="w-12 h-12 rounded-2xl bg-[#344d36] border-2 border-[#faab19] flex items-center justify-center shadow-lg shadow-[#344d36]/20">
                  <Briefcase className="w-6 h-6 text-[#faab19]" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1e2d20]">
                    Experience
                  </h3>
                  <div className="h-1.5 w-20 bg-gradient-to-r from-[#faab19] to-[#344d36] rounded-full mt-1.5 shadow-[0_0_10px_rgba(250,171,25,0.4)]" />
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8 relative before:absolute before:left-[19px] sm:before:left-[23px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-[#faab19] before:via-[#344d36] before:to-[#faab19]">
                {portfolioData.experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.85, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="relative pl-12 sm:pl-16"
                  >
                    {/* Timeline Node with pulsing golden center */}
                    <div className="absolute left-0 top-1 w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center z-10 border-2 border-[#faab19] bg-[#344d36] shadow-md shadow-[#faab19]/25">
                      <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#faab19] shadow-[0_0_8px_#faab19]" />
                    </div>

                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -5, scale: 1.01 }}
                      className="relative p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border-2 border-slate-200/90 hover:border-[#faab19] bg-white transition-all duration-300 group overflow-hidden shadow-lg shadow-[#344d36]/5 hover:shadow-2xl hover:shadow-[#faab19]/20"
                    >
                      {/* Top yellow-green accent border on hover */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#faab19] via-[#344d36] to-[#faab19] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Period Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#faab19]/15 text-[#9e6b00] border border-[#faab19]/40 mb-3 shadow-xs">
                        <Calendar className="w-3.5 h-3.5 text-[#faab19]" />
                        <span>{exp.period}</span>
                      </div>

                      {/* Role */}
                      <h4 className="text-xl sm:text-2xl font-black mb-1.5 text-[#1e2d20] transition-colors group-hover:text-[#faab19]">
                        {exp.role}
                      </h4>

                      {/* Company */}
                      <p className="text-sm sm:text-base font-bold text-[#344d36] mb-3.5 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#faab19] shrink-0" />
                        <span>{exp.company}</span>
                      </p>

                      {/* Description */}
                      <p className="text-sm sm:text-base leading-relaxed text-slate-600 text-justify">
                        {exp.description}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 2. Education Column */}
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 relative">
                <div className="w-12 h-12 rounded-2xl bg-[#344d36] border-2 border-[#faab19] flex items-center justify-center shadow-lg shadow-[#344d36]/20">
                  <GraduationCap className="w-6 h-6 text-[#faab19]" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1e2d20]">
                    Education
                  </h3>
                  <div className="h-1.5 w-20 bg-gradient-to-r from-[#faab19] to-[#344d36] rounded-full mt-1.5 shadow-[0_0_10px_rgba(250,171,25,0.4)]" />
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8 relative before:absolute before:left-[19px] sm:before:left-[23px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-[#faab19] before:via-[#344d36] before:to-[#faab19]">
                {portfolioData.education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.85, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="relative pl-12 sm:pl-16"
                  >
                    {/* Timeline Node with pulsing golden center */}
                    <div className="absolute left-0 top-1 w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center z-10 border-2 border-[#faab19] bg-[#344d36] shadow-md shadow-[#faab19]/25">
                      <span className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-[#faab19] shadow-[0_0_8px_#faab19]" />
                    </div>

                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -5, scale: 1.01 }}
                      className="relative p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border-2 border-slate-200/90 hover:border-[#faab19] bg-white transition-all duration-300 group overflow-hidden shadow-lg shadow-[#344d36]/5 hover:shadow-2xl hover:shadow-[#faab19]/20"
                    >
                      {/* Top yellow-green accent border on hover */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#faab19] via-[#344d36] to-[#faab19] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Period Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#faab19]/15 text-[#9e6b00] border border-[#faab19]/40 mb-3 shadow-xs">
                        <Calendar className="w-3.5 h-3.5 text-[#faab19]" />
                        <span>{edu.period}</span>
                      </div>

                      {/* Degree */}
                      <h4 className="text-lg sm:text-xl font-black mb-1.5 text-[#1e2d20] transition-colors group-hover:text-[#faab19]">
                        {edu.degree}
                      </h4>

                      {/* School */}
                      <p className="text-sm sm:text-base font-bold text-[#344d36] flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#faab19] shrink-0" />
                        <span>{edu.school}</span>
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
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

      {/* ─── LET'S CREATE AN AMAZING PROJECT TOGETHER / CONTACT SECTION (Matching Reference Image) ─── */}
      <section id="contact" className="w-full relative overflow-hidden bg-white">
        
        {/* TOP CALLOUT ON WHITE BACKGROUND */}
        <div className="pt-20 sm:pt-28 pb-12 sm:pb-16 max-w-7xl mx-auto px-6 text-center">
          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.2] mb-6"
          >
            Let’s Create an <span className="text-[#faab19] italic font-semibold">Amazing</span>
            <br />
            <span className="text-[#faab19] italic font-semibold">Project</span> Together!
          </motion.h2>

          {/* Composite CTA Pill Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center mb-8 sm:mb-12"
          >
            <button
              type="button"
              onClick={() => {
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center rounded-full bg-[#344d36] hover:bg-[#283c2a] pl-6 sm:pl-7 pr-1.5 py-1.5 text-white font-bold text-sm shadow-xl shadow-[#344d36]/25 transition-all duration-300 group cursor-pointer"
            >
              <span className="pr-4 tracking-wide">Contact Us Now</span>
              <span className="w-8 h-8 rounded-full bg-[#faab19] flex items-center justify-center text-[#344d36] transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
                <ArrowRight className="w-4 h-4 text-[#344d36]" />
              </span>
            </button>
          </motion.div>
        </div>

        {/* SCATTERED OVERLAPPING DESIGN & DEV PILLS ACROSS THE BORDER */}
        <div className="relative z-20 -mb-4 sm:-mb-5 flex flex-wrap justify-center items-center gap-2 sm:gap-2.5 px-4 max-w-6xl mx-auto">
          {[
            { text: "Design System", bg: "bg-[#faab19]", textCol: "text-slate-950", rotate: "-rotate-6" },
            { text: "Prototype", bg: "bg-[#344d36]", textCol: "text-white border border-white/20", rotate: "rotate-3" },
            { text: "Wireframe Design", bg: "bg-[#faab19]", textCol: "text-slate-950", rotate: "-rotate-2" },
            { text: "Mobile App Design", bg: "bg-[#344d36]", textCol: "text-white border border-white/20", rotate: "rotate-6" },
            { text: "Website Design", bg: "bg-[#faab19]", textCol: "text-slate-950", rotate: "-rotate-3" },
            { text: "Illustration", bg: "bg-[#344d36]", textCol: "text-white border border-white/20", rotate: "-rotate-8" },
            { text: "UX/UI Design", bg: "bg-[#faab19]", textCol: "text-slate-950", rotate: "rotate-4" },
            { text: "Brand Identity", bg: "bg-[#344d36]", textCol: "text-white border border-white/20", rotate: "-rotate-2" },
            { text: "Landing Page", bg: "bg-[#faab19]", textCol: "text-slate-950", rotate: "rotate-3" },
            { text: "Dashboard", bg: "bg-[#344d36]", textCol: "text-white border border-white/20", rotate: "-rotate-6" },
            { text: "UI Design", bg: "bg-[#faab19]", textCol: "text-slate-950", rotate: "rotate-5" },
            { text: "Product Design", bg: "bg-[#344d36]", textCol: "text-white border border-white/20", rotate: "-rotate-3" },
            { text: "Brand Identity", bg: "bg-[#faab19]", textCol: "text-slate-950", rotate: "rotate-6" },
          ].map((pill, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.1, rotate: 0 }}
              className={cn(
                "inline-block px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold tracking-tight shadow-md select-none transition-transform cursor-default",
                pill.bg,
                pill.textCol,
                pill.rotate
              )}
            >
              {pill.text}
            </motion.span>
          ))}
        </div>

        {/* MAIN DARK GREEN SECTION */}
        <div id="contact-form" className="w-full bg-[#344d36] text-white pt-20 sm:pt-28 pb-20 sm:pb-28 px-6 sm:px-12 md:px-20 relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start w-full">
            
            {/* LEFT COLUMN: CONTACT DETAILS (Strictly 50% width on desktop) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col"
            >
              {/* Tag */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-5 h-[2px] bg-[#faab19] inline-block" />
                <span className="text-[#faab19] text-sm sm:text-base font-bold tracking-wide">
                  Contact Us
                </span>
              </div>

              {/* Heading */}
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight mb-5">
                Let’s Talk for <span className="text-[#faab19] italic font-semibold">Your</span>
                <br />
                <span className="text-[#faab19] italic font-semibold">Next Projects</span>
              </h3>

              {/* Description */}
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 font-normal">
                Have a project in mind or need assistance with frontend development, web performance, or modern UI/UX? Feel free to reach out and let's create something remarkable together.
              </p>

              {/* 4 Contact Items arranged in 2x2 grid */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2">
                <a
                  href={`https://api.whatsapp.com/send?phone=${portfolioData.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 sm:gap-3.5 group hover:translate-x-1 transition-transform min-w-0"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#faab19] text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <WhatsAppIcon className="w-5 h-5 text-slate-950" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#faab19] transition-colors truncate">
                    {portfolioData.whatsapp}
                  </span>
                </a>

                <a
                  href={`mailto:${portfolioData.email}`}
                  className="flex items-center gap-3 sm:gap-3.5 group hover:translate-x-1 transition-transform min-w-0"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#faab19] text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-slate-950" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#faab19] transition-colors truncate" title={portfolioData.email}>
                    {portfolioData.email}
                  </span>
                </a>

                <a
                  href={portfolioData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 sm:gap-3.5 group hover:translate-x-1 transition-transform min-w-0"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#faab19] text-slate-950 flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    <Linkedin className="w-5 h-5 text-slate-950" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#faab19] transition-colors truncate">
                    Abdul Mubeen
                  </span>
                </a>

                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#faab19] text-slate-950 flex items-center justify-center shrink-0 shadow-md">
                    <MapPin className="w-5 h-5 text-slate-950" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white truncate" title="Gujrat / Lahore, Pakistan">
                    Gujrat / Lahore, Pakistan
                  </span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: THE FORM (Strictly 50% width on desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col"
            >
              {formStatus === 'sent' ? (
                <div className="bg-[#273d29] border border-white/10 rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#faab19] text-slate-950 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h4>
                  <p className="text-slate-300 max-w-md mb-6 text-sm">
                    Thank you for reaching out. I'll review your project details and get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormStatus('idle')}
                    className="px-6 py-2.5 rounded-full bg-[#faab19] text-slate-950 font-bold text-sm hover:bg-[#e59910] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-5">
                  {formFeedback && (
                    <div className="p-3.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs sm:text-sm flex items-start justify-between gap-3">
                      <span>{formFeedback}</span>
                      <button
                        type="button"
                        onClick={() => setFormFeedback(null)}
                        className="text-amber-300 hover:text-white font-bold text-xs shrink-0"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Ex. John Doe"
                        className="w-full bg-[#273d29] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-[#faab19] transition-all text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="example@gmail.com"
                        className="w-full bg-[#273d29] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-[#faab19] transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  {/* Row 2: WhatsApp & Interested in */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-2">
                        WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Enter WhatsApp Number"
                        className="w-full bg-[#273d29] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-[#faab19] transition-all text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-2">
                        I'm Interested in *
                      </label>
                      <div className="relative">
                        <select
                          name="interest"
                          defaultValue=""
                          required
                          className="w-full bg-[#273d29] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#faab19] transition-all text-sm font-medium appearance-none cursor-pointer pr-10"
                        >
                          <option value="" disabled className="bg-[#273d29] text-slate-400">Select</option>
                          <option value="Frontend Development" className="bg-[#273d29] text-white">Frontend Development</option>
                          <option value="Web Performance & SEO" className="bg-[#273d29] text-white">Web Performance & SEO</option>
                          <option value="Modern UI/UX Design" className="bg-[#273d29] text-white">Modern UI/UX Design</option>
                          <option value="Full Website Build" className="bg-[#273d29] text-white">Full Website Build</option>
                          <option value="Consultation & Review" className="bg-[#273d29] text-white">Consultation & Review</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Your Message */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-200 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Enter here..."
                      className="w-full bg-[#273d29] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-[#faab19] transition-all text-sm font-medium resize-none"
                    />
                  </div>

                  {/* Row 4: Submit Composite Pill Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="inline-flex items-center rounded-full bg-[#203222] hover:bg-[#1a281c] border border-white/15 pl-6 sm:pl-7 pr-1.5 py-1.5 text-white font-bold text-sm shadow-xl transition-all duration-300 group cursor-pointer disabled:opacity-50"
                    >
                      <span className="pr-4 tracking-wide">
                        {formStatus === 'sending' ? 'Sending...' : 'Submit'}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-[#faab19] flex items-center justify-center text-[#344d36] transition-transform duration-300 group-hover:translate-x-1 shadow-sm">
                        <ArrowRight className="w-4 h-4 text-[#344d36]" />
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

          </div>
        </div>

      </section>

      {/* Footer - Matching Uploaded Reference Design */}
      <footer className="w-full bg-white border-t border-slate-200/80 pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 mb-14 sm:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
            
            {/* 1. Left Brand Column: Profile Pic + Bio + Yellow Social Buttons */}
            <div className="md:col-span-5 lg:col-span-5 flex flex-col">
              {/* Brand Logo & Name */}
              <div
                className="flex items-center gap-3.5 mb-5 cursor-pointer group select-none self-start"
                onClick={(e) => handleNavClick(e as any, '#top')}
                aria-label="Back to top"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#faab19] shadow-md group-hover:scale-105 transition-transform shrink-0">
                  <img
                    src={portfolioData.profileImage}
                    alt={portfolioData.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                  {portfolioData.name}<span className="text-[#faab19]">.</span>
                </span>
              </div>

              {/* Bio Paragraph in Solid Black */}
              <p className="text-black text-sm sm:text-base leading-relaxed mb-6 max-w-sm font-medium">
                Front-End Developer & Web Manager crafting high-performance digital experiences with precision, modern UI/UX design, and clean scalable code.
              </p>

              {/* Circular Golden-Yellow Social Buttons */}
              <div className="flex items-center gap-3">
                {[
                  { icon: Github, href: portfolioData.github, label: "GitHub" },
                  { icon: Linkedin, href: portfolioData.linkedin, label: "LinkedIn" },
                  { icon: WhatsAppIcon, href: `https://api.whatsapp.com/send?phone=${portfolioData.whatsapp.replace(/\D/g, '')}`, label: "WhatsApp" },
                  { icon: Mail, href: `mailto:${portfolioData.email}`, label: "Email" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-[#faab19] hover:bg-[#e59910] text-black flex items-center justify-center shadow-sm transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5 text-black" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* 2. Middle Quick Links Column with matching icons */}
            <div className="md:col-span-3 lg:col-span-3">
              <h4 className="text-[#faab19] font-black text-lg sm:text-xl mb-5 tracking-tight">
                Quick Links
              </h4>
              <ul className="space-y-3 sm:space-y-3.5">
                {[
                  { name: 'Home', href: '#top', icon: Home },
                  { name: 'About Me', href: '#about', icon: User },
                  { name: 'Technical Skills', href: '#skills', icon: Code2 },
                  { name: 'Experience', href: '#experience', icon: Briefcase },
                  { name: 'Projects', href: '#projects', icon: Layout },
                  { name: 'Contact', href: '#contact', icon: Phone },
                ].map(link => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-black hover:text-[#faab19] text-sm sm:text-base font-semibold transition-colors inline-flex items-center gap-2.5 cursor-pointer group"
                    >
                      <link.icon className="w-4 h-4 text-[#faab19] shrink-0 transition-transform group-hover:scale-110" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Right Contact Column with matching icons (#faab19) and Solid Black Text */}
            <div className="md:col-span-4 lg:col-span-4">
              <h4 className="text-[#faab19] font-black text-lg sm:text-xl mb-5 tracking-tight">
                Contact
              </h4>
              <ul className="space-y-3.5 sm:space-y-4 text-black text-sm sm:text-base font-semibold">
                <li>
                  <a
                    href={`https://api.whatsapp.com/send?phone=${portfolioData.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#faab19] transition-colors inline-flex items-center gap-3"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-[#faab19] shrink-0" />
                    <span>{portfolioData.whatsapp}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${portfolioData.email}`}
                    className="hover:text-[#faab19] transition-colors break-all inline-flex items-center gap-3"
                  >
                    <Mail className="w-5 h-5 text-[#faab19] shrink-0" />
                    <span>{portfolioData.email}</span>
                  </a>
                </li>
                <li className="inline-flex items-center gap-3 text-black">
                  <MapPin className="w-5 h-5 text-[#faab19] shrink-0" />
                  <span>Gujrat / Lahore, Pakistan</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Full-Width Dark Green Bar with Centered Copyright Text */}
        <div className="w-full bg-[#344d36] py-5 px-6 sm:px-12 md:px-20 text-white">
          <div className="max-w-7xl mx-auto flex justify-center items-center text-xs sm:text-sm">
            <p className="text-white font-medium text-center">
              Copyright © {new Date().getFullYear()} <span className="text-[#faab19] font-bold">{portfolioData.name}</span>. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
