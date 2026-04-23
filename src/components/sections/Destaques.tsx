"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { CardSkeleton } from "@/components/ui/Skeletons";

interface DestaqueItem {
  id: string | number;
  name: string;
  tag: string;
  image: string;
}

interface DestaquesProps {
  settings?: Record<string, string>;
}

const defaultDestaques: DestaqueItem[] = [
  { id: 1, name: "Shake Mix Frutas Vermelhas", tag: "Novidade", image: "/imagens_originais/produtos_capa_shakemix_01.png" },
  { id: 2, name: "Cascão Trufado", tag: "Mais Pedido", image: "/imagens_originais/cardapio_1.png" },
  { id: 3, name: "Sundae Clássico", tag: "Tradicional", image: "/imagens_originais/cardapio_4.png" },
  { id: 4, name: "Shake Mix Chocotino", tag: "Crocante", image: "/imagens_originais/chiquinho_milkshake_chocotino.png" },
];

export function Destaques({ settings }: DestaquesProps) {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [items, setItems] = useState<DestaqueItem[]>(defaultDestaques);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const supabase = useMemo(() => createClient(), []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 280 + 24; // card width + gap
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, items.length - 1));
  };

  const title = settings?.destaques_title || "Nossos Queridinhos";
  const subtitle = settings?.destaques_subtitle || "Descubra os sabores que fazem a fama da Chiquinho em todo o país.";

  useEffect(() => {
    async function fetchDestaques() {
      try {
        const { data } = await supabase
          .from('products')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          setItems(data.map(p => ({
            id: p.id,
            name: p.title,
            tag: p.tag || 'Destaque',
            image: p.image_url || '/imagens_originais/cardapio_1.png'
          })));
        }
      } finally {
        setLoading(false);
      }
    }
    fetchDestaques();
  }, [supabase]);

  return (
    <section id="destaques" className="py-24 bg-white overflow-hidden perspective-1000">
      <div className="max-w-6xl mx-auto px-6">
        
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-red text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Nossos Destaques</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-ink-900 tracking-tight mb-6">
            {title}
          </h2>
          <p className="text-ink-500 max-w-md mx-auto leading-relaxed text-lg">
            {subtitle}
          </p>
        </motion.div>

        {/* Skeleton loading */}
        {loading ? (
          <div className="flex overflow-x-auto gap-6 pb-12 pt-4 px-4 -mx-4 scrollbar-hide">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-none w-[260px] md:w-[280px]">
                <CardSkeleton />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          /* Empty state */
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-cream-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-ink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-ink-900 font-display font-bold text-xl mb-2">Nenhum destaque ainda</h3>
            <p className="text-ink-400 text-sm">Os produtos em destaque aparecerão aqui em breve.</p>
          </div>
        ) : (
          <>
            <div className="relative">
            {/* Seta esquerda */}
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
              className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-ink-100 rounded-full items-center justify-center shadow-lg text-ink-500 hover:text-brand-red hover:border-brand-red/30 transition-all"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory pt-4 px-4 -mx-4 scrollbar-hide"
            >
              {items.map((item, i) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 50, rotateX: -10 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -10 }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className="group relative flex-none w-[260px] md:w-[280px] snap-start bg-white border border-ink-100/60 rounded-[28px] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer isolate"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-brand-soft/80 rounded-full opacity-0 blur-xl group-hover:blur-3xl group-hover:scale-[15] group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none -z-10" />
                  
                  <div className="relative h-[240px] flex items-center justify-center bg-cream-50 overflow-visible z-10 transition-colors duration-500 group-hover:bg-transparent">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      width={250} 
                      height={250} 
                      className="max-h-[190px] w-auto drop-shadow-md z-20 group-hover:scale-[1.15] group-hover:-translate-y-3 group-hover:drop-shadow-[0_25px_30px_rgba(168,21,31,0.25)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                    />
                  </div>

                  <div className="p-6 relative z-10 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-brand-red text-[10px] font-bold uppercase tracking-widest">{item.tag}</span>
                      <div className="w-8 h-8 rounded-full bg-cream-50 flex items-center justify-center text-ink-300 group-hover:bg-brand-red group-hover:text-white transition-colors duration-300">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-ink-900 text-xl leading-tight">{item.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Seta direita */}
            <button
              onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
              className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white border border-ink-100 rounded-full items-center justify-center shadow-lg text-ink-500 hover:text-brand-red hover:border-brand-red/30 transition-all"
              aria-label="Próximo"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            </div>

            {/* Dots indicadores */}
            <div className="flex items-center justify-center gap-2 mt-6">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  const cardWidth = 280 + 24; // card + gap
                  el.scrollTo({ left: i * cardWidth, behavior: "smooth" });
                }}
                className={`rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "w-6 h-2 bg-brand-red"
                    : "w-2 h-2 bg-ink-200 hover:bg-ink-300"
                }`}
                aria-label={`Ir para destaque ${i + 1}`}
              />
            ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
}

