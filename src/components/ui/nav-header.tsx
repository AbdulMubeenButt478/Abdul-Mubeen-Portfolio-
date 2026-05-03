"use client"; 

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface NavHeaderProps {
  links: { name: string; href: string }[];
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  darkMode: boolean;
}

export function NavHeader({ links, handleNavClick, darkMode }: NavHeaderProps) {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className={cn(
        "relative mx-auto flex w-fit rounded-full p-1 transition-all duration-500",
        darkMode 
          ? "border-2 border-brand/40 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_0_1px_rgba(99,102,241,0.2),0_0_20px_rgba(99,102,241,0.25),0_0_40px_rgba(99,102,241,0.1)]" 
          : "border-2 border-indigo-100 bg-white shadow-md shadow-indigo-100/60"
      )}
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {links.map((link) => (
        <Tab 
          key={link.name} 
          setPosition={setPosition} 
          href={link.href} 
          onClick={(e) => handleNavClick(e, link.href)}
          darkMode={darkMode}
        >
          {link.name}
        </Tab>
      ))}

      <Cursor position={position} darkMode={darkMode} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
  onClick,
  darkMode
}: {
  children: React.ReactNode;
  setPosition: any;
  href: string;
  onClick: (e: any) => void;
  darkMode: boolean;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block"
    >
      <a 
        href={href}
        onClick={onClick}
        className={cn(
          "block cursor-pointer whitespace-nowrap px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 md:px-5 md:py-3 md:text-xs",
          darkMode 
            ? "text-slate-300 hover:text-white" 
            : "text-slate-500 hover:text-indigo-600"
        )}
      >
        {children}
      </a>
    </li>
  );
};

const Cursor = ({ position, darkMode }: { position: any, darkMode: boolean }) => {
  return (
    <motion.li
      animate={{
        ...position,
        transition: { type: "spring", stiffness: 400, damping: 35 }
      }}
      className={cn(
        "absolute z-0 top-1 bottom-1 rounded-full pointer-events-none",
        darkMode 
          ? "bg-brand/30 border border-brand/60 shadow-[0_0_25px_rgba(99,102,241,0.35)]" 
          : "bg-indigo-50 border border-indigo-200 shadow-sm"
      )}
    />
  );
};

export default NavHeader;
