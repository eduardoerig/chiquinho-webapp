/* eslint-disable @next/next/no-img-element */
import React from "react";

export type MenuItem = {
  id: number;
  category: string;
  title: string;
  desc: string;
  img: string;
};

interface PremiumMenuTemplateProps {
  items: MenuItem[];
}

export const PremiumMenuTemplate = React.forwardRef<HTMLDivElement, PremiumMenuTemplateProps>(
  ({ items }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[800px] h-[1131px] bg-cream-50 relative overflow-hidden flex flex-col"
        style={{ boxSizing: "border-box", fontFamily: 'var(--font-dm-sans), "DM Sans", sans-serif' }}
      >
        {/* Cabecalho de impacto - Tamanho flexivel mas contido */}
        <div className="h-[270px] bg-brand-red flex flex-col pt-8 px-10 text-white shadow-xl z-20 shrink-0 relative">
          {/* Fundo radial brilhante */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none mix-blend-overlay"></div>

          {/* Topo Logo + Badge */}
          <div className="w-full flex justify-between items-center z-10 border-b border-white/20 pb-4 mb-4">
            <h1 className="text-3xl font-black tracking-tighter" style={{ fontFamily: 'var(--font-fraunces), "Fraunces", serif' }}>
              CHIQUINHO<span className="font-light">SORVETES</span>
            </h1>
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium opacity-90 border border-white/30 px-3 py-1 rounded-full">
              Menu Exclusivo
            </span>
          </div>

          {/* Duas colunas para Texto e Imagem usando Flex (Sem Absolute) */}
          <div className="flex-1 flex w-full items-center justify-between z-10">

            {/* Texto lado esquerdo */}
            <div className="flex-1 pr-6 flex flex-col justify-center">
              <h2 className="text-[38px] leading-[1.1] font-black mb-2" style={{ fontFamily: 'var(--font-fraunces), "Fraunces", serif' }}>
                A felicidade <br />
                pede <em className="italic text-[#fbbf24] font-medium">sorvete!</em>
              </h2>
              <p className="text-white/90 text-sm leading-relaxed max-w-[320px]">
                Receitas únicas e sabor incomparável para todas as horas. Explore as novidades.
              </p>
            </div>

            {/* Imagem Lado Direito - Menor para ganhar espaco */}
            <div className="w-[180px] h-[180px] shrink-0 mt-0 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-center">
              <img
                src="/imagens_originais/produtos_capa_shakemix_01.png"
                alt="Shake Mix Hero"
                className="max-w-full max-h-full object-contain"
              />
            </div>

          </div>
        </div>

        {/* Corpo do Menu - Grid */}
        <div className="flex-1 px-12 pt-8 pb-4 z-10 flex flex-col">
          {/* Cabeçalho da seção */}
          <div className="flex items-center gap-4 mb-8 shrink-0">
            <h3 className="text-xl font-bold text-ink-900 uppercase tracking-widest border-l-4 border-brand-red pl-4">
              Nossas Delícias
            </h3>
            <div className="h-px flex-1 bg-ink-100"></div>
          </div>

          {/* Grid de 2 colunas: Espaçamentos menores para não quebrar a página  */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 flex-1 content-start">
            {items.map((item) => (
              /* mt-10 dá espaço pro copinho subir. O card é branco */
              <div key={item.id} className="relative bg-white border border-ink-100 rounded-[28px] px-6 pb-4 shadow-sm flex flex-col items-center mt-10 h-full">

                {/* Imagem do sorvete menor que antes */}
                <div className="w-[100px] h-[100px] -mt-[50px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)] mb-2 shrink-0 flex items-center justify-center">
                  <img src={item.img} alt={item.title} className="max-w-full max-h-full object-contain" />
                </div>

                {/* Textos inferiores */}
                <div className="flex flex-col items-center text-center flex-1 w-full">
                  <span className="bg-brand-red text-white text-[9px] font-bold uppercase tracking-widest px-3 py-[3px] rounded-full mb-2 shrink-0">
                    {item.category.replace("-", " ")}
                  </span>

                  <h4 className="font-bold text-ink-900 text-[16px] leading-tight mb-2 shrink-0" style={{ fontFamily: 'var(--font-fraunces), "Fraunces", serif' }}>
                    {item.title}
                  </h4>

                  {/* Linha que limita texto para evitar quebrar layout se descrição for gigante */}
                  <p className="text-ink-500 text-[12px] leading-snug line-clamp-2">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Rodapé Premium */}
        <div className="bg-brand-dark h-[80px] shrink-0 flex items-center justify-between px-12 text-white/50 text-[13px] z-20 mt-auto">
          <p>© {new Date().getFullYear()} Chiquinho Sorvetes.</p>
          <div className="flex gap-4">
            <span className="font-medium">chiquinho.com.br</span>
            <span>|</span>
            <span className="font-medium">@chiquinhosobremesas</span>
          </div>
        </div>
      </div>
    );
  }
);
PremiumMenuTemplate.displayName = "PremiumMenuTemplate";
