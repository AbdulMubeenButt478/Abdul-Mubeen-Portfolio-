import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const HeroBackground = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {/* Dynamic Mesh Gradients - Cleaned up for Light Mode */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 45, 0],
          x: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className={cn(
          "absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[140px] opacity-60",
          darkMode ? "bg-gradient-to-br from-brand/20 to-purple-500/20" : "bg-gradient-to-br from-brand/5 to-indigo-100/30"
        )}
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          rotate: [45, 0, 45],
          x: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className={cn(
          "absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full blur-[140px] opacity-60",
          darkMode ? "bg-gradient-to-tl from-accent/20 to-brand/20" : "bg-gradient-to-tl from-brand/5 to-teal-50/20"
        )}
      />

      {/* Floating Abstract Tech Symbols */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`symbol-${i}`}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: darkMode ? [0.05, 0.15, 0.05] : [0.03, 0.1, 0.03],
            y: [0, -30, 0],
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 15 + Math.random() * 10, 
            repeat: Infinity, 
            delay: i * 2,
            ease: "easeInOut" 
          }}
          className={cn(
            "absolute text-xl font-mono select-none pointer-events-none",
            darkMode ? "text-brand/40" : "text-brand/20"
          )}
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
        >
          {['< >', '{ }', '/', '[ ]', '01'][i % 5]}
        </motion.div>
      ))}

      {/* Floating Abstract Shapes - Minimalist for Light Mode */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: darkMode ? [0.1, 0.3, 0.1] : [0.05, 0.15, 0.05],
            scale: [1, 1.2, 1],
            x: [0, Math.random() * 80 - 40, 0],
            y: [0, Math.random() * 80 - 40, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 12 + Math.random() * 10, 
            repeat: Infinity, 
            delay: i * 3,
            ease: "easeInOut" 
          }}
          className={cn(
            "absolute w-24 h-24 border rounded-full",
            darkMode ? "border-brand/10 bg-white/[0.02] backdrop-blur-[2px]" : "border-brand/10 bg-transparent"
          )}
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${15 + Math.random() * 70}%`,
          }}
        />
      ))}

      {/* Grid Pattern - Extremely Subtle for Light Mode */}
      <div 
        className={cn(
          "absolute inset-0",
          darkMode ? "opacity-[0.1]" : "opacity-[0.03]"
        )}
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 90%)',
        }}
      />
      
      {/* Noise Texture - Removed for ultra-clean Light Mode */}
      {darkMode && <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />}
      
      {/* Bottom Fade - Optimized */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-b from-transparent via-transparent",
        darkMode ? "to-[#1a2333]/40" : "to-white/80"
      )} />
    </div>
  );
};
