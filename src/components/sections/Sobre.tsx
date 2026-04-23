"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SobreProps {
  settings?: Record<string, string>;
}

export function Sobre({ settings }: SobreProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const title = settings?.history_title || "Nossa História";
  const text = settings?.history_text || "A Chiquinho Sorvetes nasceu em 1980, em Frutal/MG, com o sonho de levar alegria através do sorvete mais saboroso e cremoso.";

  return (
    <section id="sobre" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-red text-xs font-bold uppercase tracking-[0.2em] mb-4 block">A Nossa História</span>
            <h2 className="text-3xl md:text-5xl lg:text-[56px] leading-[1.1] font-display font-black text-ink-900 tracking-tight mb-8">
              {title}
            </h2>
            
            <div className="space-y-6 text-ink-500 text-lg leading-relaxed mb-10">
              {text.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="flex gap-4">
              <a href="https://chiquinho.com.br/a-chiquinho/" target="_blank" rel="noreferrer" className="group rounded-full bg-brand-bg text-brand-red font-bold px-8 py-4 flex items-center gap-2 hover:bg-brand-red hover:text-white transition-colors duration-300">
                <span>Conheça a história completa</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-cream-100 rounded-[30px] rotate-3 scale-105 z-0" />
            <div className="relative z-10 w-full overflow-hidden rounded-[40px] shadow-2xl flex flex-col items-center border-[8px] border-white">
              <Image 
                src="/imagens_originais/sobre-a-marca-primeira-chiquinho-01.png" 
                alt="História da Chiquinho" 
                width={800} 
                height={800} 
                className="w-full object-cover object-center max-h-[500px]" 
              />
            </div>
            {/* Decal */}
            <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-xl z-20 flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-red rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl">80</div>
              <div>
                <div className="text-[10px] md:text-xs text-ink-400 font-bold uppercase tracking-widest leading-none">Década</div>
                <div className="font-display font-bold text-ink-900 text-base md:text-lg">De Origem</div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
