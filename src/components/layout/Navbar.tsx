"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  settings?: Record<string, string>;
}

export function Navbar({ settings }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ifoodLink = settings?.marketing_ifood_link || "https://www.ifood.com.br/delivery/descobrir/lista/chain:fabf2493-6ce0-4534-8cce-c4ae743a59d1";

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-300",
          scrolled ? "py-3 bg-cream-50/90 backdrop-blur-md border-b border-ink-100 shadow-sm" : "py-5 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          <a href="#hero-section" className="flex items-center" aria-label="Home">
            <Image
              src="/imagens_originais/cropped-chiquinho-icone-1-270x270.png"
              alt="Logo Chiquinho Sorvetes"
              width={60}
              height={60}
              className={cn("transition-transform duration-300 object-contain drop-shadow-sm", scrolled ? "h-[50px] w-auto" : "h-[70px] w-auto scale-110")}
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#hero-section" className="nav-link text-ink-500 font-semibold text-sm hover:text-brand-red transition-colors relative">Início</a>
            <a href="#cardapio" className="nav-link text-ink-500 font-semibold text-sm hover:text-brand-red transition-colors relative">Cardápio</a>
            <a href="#sobre" className="nav-link text-ink-500 font-semibold text-sm hover:text-brand-red transition-colors relative">Nossa História</a>
            <a href="#franquia" className="nav-link text-ink-500 font-semibold text-sm hover:text-brand-red transition-colors relative">Franquia</a>
            <a
              href={ifoodLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-brand-red text-white text-sm font-bold tracking-wide px-6 py-2.5 rounded-full shadow-brand hover:-translate-y-0.5 hover:shadow-xl hover:bg-brand-dark transition-all duration-300"
            >
              <span>Pedir iFood</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-[5px] p-2 z-[1001]" aria-label="Abrir menu">
            <span className={cn("w-5 h-[2px] bg-ink-900 rounded-full transition-all duration-300 origin-center", menuOpen && "rotate-45 translate-y-[7px]")} />
            <span className={cn("w-5 h-[2px] bg-ink-900 rounded-full transition-all duration-200", menuOpen && "opacity-0")} />
            <span className={cn("w-5 h-[2px] bg-ink-900 rounded-full transition-all duration-300 origin-center", menuOpen && "-rotate-45 -translate-y-[7px]")} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6"
          >
            <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} href="#hero-section" onClick={() => setMenuOpen(false)} className="text-3xl font-display font-medium text-ink-900 tracking-tight hover:text-brand-red transition-colors">Início</motion.a>
            <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} href="#cardapio" onClick={() => setMenuOpen(false)} className="text-3xl font-display font-medium text-ink-900 tracking-tight hover:text-brand-red transition-colors">Cardápio</motion.a>
            <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} href="#sobre" onClick={() => setMenuOpen(false)} className="text-3xl font-display font-medium text-ink-900 tracking-tight hover:text-brand-red transition-colors">História</motion.a>
            <motion.a initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} href="#franquia" onClick={() => setMenuOpen(false)} className="text-3xl font-display font-medium text-ink-900 tracking-tight hover:text-brand-red transition-colors">Franquia</motion.a>
            <motion.a 
              initial={{ opacity: 0, y: 20, scale: 0.9 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              transition={{ delay: 0.35, ease: "backOut" }}
              href={ifoodLink} 
              target="_blank" 
              rel="noreferrer" 
              className="mt-6 flex items-center gap-2 bg-brand-red text-white text-lg font-bold px-8 py-4 rounded-full shadow-brand hover:scale-105 transition-transform"
            >
              <span>Peça pelo iFood</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
