"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { PremiumMenuTemplate } from "@/components/ui/PremiumMenuTemplate";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: 1, category: "shake-mix", title: "Shake Mix Clássico", desc: "Camadas de sorvete, calda e toppings", img: "/imagens_originais/produtos_capa_shakemix_01.png" },
  { id: 2, category: "casquinha", title: "Cascão Recheado", desc: "Crocante, recheado com sorvete e cobertura", img: "/imagens_originais/cardapio_1.png" },
  { id: 3, category: "sundae", title: "Sundae", desc: "Sorvete Chiquinho com calda quente", img: "/imagens_originais/cardapio_4.png" },
  { id: 4, category: "top-mix", title: "Milkshake Chocotino", desc: "Sabor exclusivo", img: "/imagens_originais/chiquinho_milkshake_chocotino.png" },
  { id: 5, category: "shake-mix", title: "Shake Mix KitKat", desc: "A pausa perfeita com KitKat", img: "/imagens_originais/chiquinho-banner-kitkat-selo-02-1.png" }
];

const categories = [
  { id: "all", label: "Todos" },
  { id: "shake-mix", label: "Shake Mix" },
  { id: "casquinha", label: "Casquinha e Cascão" },
  { id: "sundae", label: "Sundae" },
  { id: "top-mix", label: "Top Mix" }
];

export function MenuSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeFilter === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeFilter);

  const handleDownloadPDF = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("PDF generation triggered. pdfRef:", !!pdfRef.current, "isGeneratingPDF:", isGeneratingPDF);
    if (!pdfRef.current || isGeneratingPDF) return;

    setIsGeneratingPDF(true);
    try {
      const { domToPng } = await import("modern-screenshot");
      const { default: jsPDF } = await import("jspdf");

      // Captura o elemento oculto (modern-screenshot suporta CSS cores modernas como oklab no Tailwind v4)
      const imgData = await domToPng(pdfRef.current, {
        scale: 2, // Maior qualidade (retina)
        backgroundColor: "#FAF5F0", // cor creme para segurança
      });
      
      // Cria o PDF no formato A4 (210x297mm)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      // O ref possui tamanho fixo w-[800px] h-[1131px] (proporção A4)
      const pdfHeight = (1131 * pdfWidth) / 800;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("cardapio-chiquinho-premium.pdf");
      
    } catch (error) {
      console.error("Erro ao gerar PDF", error);
      alert("Houve um erro ao gerar o cardápio interativo. Tente novamente.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <section id="cardapio" className="py-24 bg-cream-50 relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-12">
          <span className="text-brand-red text-xs font-bold uppercase tracking-[0.2em] mb-3 block">Cardápio</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-ink-900 tracking-tight">O que vai ser <em className="text-brand-red not-italic italic">hoje?</em></h2>
        </div>

        {/* Filters */}
        <div className="flex overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap md:justify-center gap-2 mb-8 md:mb-10 snap-x snap-mandatory scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={cn(
                "whitespace-nowrap flex-shrink-0 snap-start text-xs md:text-sm font-medium px-5 py-2 rounded-full border transition-all duration-200",
                activeFilter === cat.id 
                  ? "bg-brand-red text-white border-brand-red" 
                  : "bg-white text-ink-500 border-ink-100 hover:border-brand-red hover:text-brand-red"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid animada */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-white border border-ink-100/50 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_12px_30px_rgba(26,16,8,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="h-[120px] md:h-[180px] flex items-center justify-center p-3 md:p-6 bg-cream-50 group-hover:bg-brand-bg transition-colors duration-300">
                  <Image src={item.img} alt={item.title} width={150} height={150} className="max-h-20 md:max-h-32 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-3 md:p-4 flex-1 flex flex-col">
                  <span className="text-brand-red text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{item.category.replace("-", " ")}</span>
                  <h3 className="font-display font-bold text-ink-900 mt-1 mb-1 text-sm md:text-base leading-tight md:leading-snug line-clamp-2">{item.title}</h3>
                  <p className="text-ink-400 text-[10px] md:text-xs leading-relaxed line-clamp-2 md:line-clamp-none mt-auto pt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-14 text-center relative z-10">
          <button 
            onClick={handleDownloadPDF} 
            disabled={isGeneratingPDF}
            className="inline-block border border-ink-100 bg-white text-ink-900 font-bold px-8 py-4 rounded-full shadow-sm hover:shadow-md hover:border-brand-red hover:text-brand-red transition-all duration-300 cursor-pointer disabled:opacity-75 disabled:cursor-wait"
          >
            {isGeneratingPDF ? "Montando Revista..." : "Baixar Cardápio Premium"}
          </button>
        </div>
      </div>

      {/* Template PDF Oculto (fora da tela) */}
      <div className="absolute top-0 opacity-0 pointer-events-none -z-50" style={{ left: '-9999px' }}>
        <PremiumMenuTemplate ref={pdfRef} items={menuItems} />
      </div>
    </section>
  );
}
