"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yProducts = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityInfo = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section 
      ref={containerRef}
      id="hero-section" 
      className="relative min-h-[100vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-cream-50"
    >
      {/* Decorative Brand Blurs */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-brand-soft rounded-full blur-[140px] opacity-40 pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#fbbf24]/20 rounded-full blur-[120px] opacity-30 pointer-events-none mix-blend-multiply" />
      
      {/* 1. MASSIVE PRODUCT CENTER STAGE (Top/Visual Anchor) */}
      <motion.div 
        style={{ y: yProducts }}
        className="relative z-40 w-full max-w-4xl mx-auto flex items-center justify-center mt-12 mb-8"
      >
        {/* Left Ice Cream: Top Mix */}
        <motion.div 
          initial={{ x: 100, opacity: 0, rotate: 25, scale: 0.5 }}
          animate={{ x: -120, opacity: 1, rotate: -15, scale: 1 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4, delay: 0.1 }}
          className="absolute z-20 group cursor-crosshair hover:z-[60]"
        >
          <motion.div animate={{ y: [-6, 6] }} transition={{ repeat: Infinity, duration: 3.5, repeatType: "reverse", ease: "easeInOut", delay: 1 }}>
            <Image src="/imagens_originais/cardapio_2.png" alt="Top Mix" width={200} height={200} className="w-24 md:w-32 lg:w-40 h-auto drop-shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12" priority />
          </motion.div>
          <div className="absolute top-[80%] left-[-20%] bg-white/95 backdrop-blur-md border border-ink-100 p-3 rounded-2xl shadow-xl w-40 z-50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none">
            <span className="text-brand-red text-[10px] font-bold uppercase tracking-widest block mb-0.5">Top Mix</span>
            <h4 className="font-display font-bold text-ink-900 text-sm leading-tight">Crocância Máxima</h4>
          </div>
        </motion.div>

        {/* Right Ice Cream: Sundae */}
        <motion.div 
          initial={{ x: -100, opacity: 0, rotate: -25, scale: 0.5 }}
          animate={{ x: 120, opacity: 1, rotate: 15, scale: 1 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4, delay: 0.2 }}
          className="absolute z-20 group cursor-crosshair hover:z-[60]"
        >
          <motion.div animate={{ y: [-10, 10] }} transition={{ repeat: Infinity, duration: 4.5, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}>
            <Image src="/imagens_originais/cardapio_4.png" alt="Sundae" width={200} height={200} className="w-24 md:w-32 lg:w-40 h-auto drop-shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" priority />
          </motion.div>
          <div className="absolute top-[80%] right-[-20%] bg-white/95 backdrop-blur-md border border-ink-100 p-3 rounded-2xl shadow-xl w-40 z-50 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none text-right">
            <span className="text-brand-red text-[10px] font-bold uppercase tracking-widest block mb-0.5">Sundae Clássico</span>
            <h4 className="font-display font-bold text-ink-900 text-sm leading-tight">Calda Quente</h4>
          </div>
        </motion.div>

        {/* Center Ice Cream: The Shake Mix Hero */}
        <motion.div 
          initial={{ scale: 0.3, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="relative z-30 group cursor-crosshair hover:z-[70]"
        >
          <motion.div animate={{ y: [-12, 12] }} transition={{ repeat: Infinity, duration: 4, repeatType: "reverse", ease: "easeInOut" }}>
            <Image src="/imagens_originais/produtos_capa_shakemix_01.png" alt="Shake Mix Exclusivo" width={300} height={300} className="w-32 md:w-48 lg:w-64 h-auto drop-shadow-3xl transition-transform duration-500 group-hover:scale-105" priority />
          </motion.div>
          <div className="absolute top-[45%] left-[85%] bg-white/95 backdrop-blur-md border border-ink-100 p-4 rounded-3xl shadow-2xl w-48 md:w-56 z-50 opacity-0 scale-95 -translate-y-1/2 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none">
            <span className="text-brand-red text-[11px] font-bold uppercase tracking-widest block mb-1">Carro Chefe</span>
            <h4 className="font-display font-bold text-ink-900 text-base leading-tight mb-2">Shake Mix® Exclusivo</h4>
            <p className="text-ink-400 text-xs leading-snug">A receita mais cobiçada do cardápio, com camadas incrivelmente saborosas.</p>
          </div>
        </motion.div>
      </motion.div>

      {/* 2. THE TYPOGRAPHY SHOWCASE (Bottom/Informational) */}
      <motion.div 
        style={{ opacity: opacityInfo }}
        className="relative z-30 flex flex-col items-center text-center px-6 mt-12 md:mt-16"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-brand-red/20 text-brand-red text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full mb-6 relative overflow-hidden shadow-sm"
        >
          <span className="absolute inset-0 bg-brand-red/5 w-full h-full" />
          <span className="w-2 h-2 rounded-full bg-brand-red animate-ping absolute left-5" />
          <span className="w-2 h-2 rounded-full bg-brand-red relative ml-4" />
          Sua Pausa Pede Chiquinho
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-6xl md:text-7xl lg:text-8xl leading-tight font-display font-black text-ink-900 tracking-tight max-w-5xl"
        >
          O sorvete que <br className="hidden md:block" />
          <span className="text-brand-red block">você ama.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="text-lg md:text-2xl text-ink-500 mt-8 mb-12 leading-relaxed max-w-3xl font-medium"
        >
          Uma sobremesa gelada que vai além do pós-almoço. Com nossa receita exclusiva, já levamos sorrisos a cada colherada em <strong className="text-brand-red">mais de 1.000 lojas</strong>.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <a href="https://chiquinho.com.br/nossas-lojas/" className="group relative bg-brand-red text-white text-lg font-bold px-10 py-5 rounded-full shadow-brand flex items-center justify-center gap-3 overflow-hidden transition-all duration-300 w-full sm:w-auto hover:scale-105">
            <span className="relative z-10">Encontrar Nossa Loja</span>
            <svg className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
          </a>
          
          <a href="#cardapio" className="group flex items-center justify-center gap-2 bg-white text-ink-900 text-lg font-bold px-10 py-5 rounded-full border-2 border-ink-100 shadow-sm hover:shadow-md hover:border-brand-red hover:text-brand-red transition-all duration-300 w-full sm:w-auto">
            Explorar Cardápio
          </a>
        </motion.div>
      </motion.div>

    </section>
  );
}
