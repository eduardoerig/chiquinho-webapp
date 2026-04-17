"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Franchise() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="franqueado" className="py-24 bg-cream-50 border-t border-ink-100/60 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="bg-white border border-ink-100/70 rounded-[32px] p-8 lg:p-14 shadow-[0_20px_80px_rgba(26,16,8,0.06)] relative overflow-hidden"
        >
          <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] bg-brand-red/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-brand-soft/50 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            
            <div>
              <span className="inline-block bg-cream-100 text-ink-500 font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 relative">
                <span className="absolute inset-0 border border-ink-100/80 rounded-full animate-ping opacity-20" />
                Seja um Franqueado
              </span>
              
              <h2 className="text-3xl md:text-5xl font-display font-black text-ink-900 leading-[1.1] mb-6">
                Leve a <em className="text-brand-red not-italic italic">Chiquinho</em> para sua cidade.
              </h2>
              
              <p className="text-ink-500 text-lg leading-relaxed mb-6">
                Faça parte da maior rede de sorveterias do Brasil. Oferecemos suporte completo: escolha do ponto comercial à inauguração. Modelo de negócio testado e comprovado, com alta lucratividade.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-bg flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-brand-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="text-ink-900 font-medium text-sm">Estruturação Completa e Treinamento</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-bg flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-brand-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="text-ink-900 font-medium text-sm">Mais de 1000 franquias no país</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-bg flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-brand-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="text-ink-900 font-medium text-sm">Rentabilidade Alta e Retorno Rápido</span>
                </div>
              </div>

              <a href="https://chiquinho.com.br/seja-um-franqueado/" target="_blank" rel="noreferrer" className="inline-flex group relative bg-brand-red text-white font-bold px-8 py-4 rounded-full shadow-brand overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                <span className="relative z-10">Quero ser um franqueado</span>
                <div className="absolute inset-0 bg-brand-dark transition-transform duration-300 translate-y-full group-hover:translate-y-0" />
              </a>
            </div>

            <div className="relative mx-auto w-full max-w-sm lg:max-w-none origin-bottom xl:-mr-10">
              <motion.div animate={{ y: [-5, 5] }} transition={{ repeat: Infinity, duration: 4, repeatType: "reverse", ease: "easeInOut" }}>
                <Image 
                  src="/imagens_originais/img_mapa-unidades.png.webp" 
                  alt="Mapa de Franquias Chiquinho pelo Brasil" 
                  width={600} 
                  height={600} 
                  className="w-full h-auto object-contain drop-shadow-2xl" 
                />
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
