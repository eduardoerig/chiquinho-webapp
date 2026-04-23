"use client";

import Image from "next/image";
import { useFranchiseModal } from "@/context/FranchiseContext";

interface FooterClientProps {
  settings: Record<string, string>;
}

export function FooterClient({ settings }: FooterClientProps) {
  const { openModal } = useFranchiseModal();

  // Fallback para valores caso não estejam no banco
  const whatsapp = settings.contact_whatsapp || "+55 17 3211-8200";
  const email = settings.contact_email || "contato@chiquinho.com.br";
  const instagram = settings.social_instagram || "https://www.instagram.com/chiquinhosorvetes/";
  const facebook = settings.social_facebook || "https://www.facebook.com/ChiquinhoSorvetesOficial/";
  const tiktok = settings.social_tiktok || "https://www.tiktok.com/@chiquinho";

  return (
    <footer className="bg-cream-100 border-t border-ink-100/50 pt-16 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          <div className="md:col-span-1">
            <Image src="/imagens_originais/chiquinho-logo-horizontal.png" alt="Logo Chiquinho Sorvetes" width={180} height={50} className="h-10 w-auto mb-6 drop-shadow-sm" />
            <p className="text-ink-400 text-sm leading-relaxed mb-6 pe-4">
              A maior rede de sorveterias do Brasil. Oferecemos felicidade em cada colherada com receitas exclusivas e qualidade premium.
            </p>
            <div className="flex items-center gap-4">
              <a href={instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white border border-ink-100 flex items-center justify-center text-ink-900 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all duration-200">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href={facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white border border-ink-100 flex items-center justify-center text-ink-900 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all duration-200">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z"/></svg>
              </a>
              <a href={tiktok} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white border border-ink-100 flex items-center justify-center text-ink-900 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all duration-200">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.023C5.29.273 0 5.862 0 12.511c0 3.135 1.25 5.977 3.284 8.067.42.43 1.05.474 1.58.125l.43-.284c.333-.22.42-.663.2-.991-1.636-2.438-2.593-5.367-2.593-8.528 0-7.397 6.002-13.4 13.398-13.4 7.397 0 13.4 6.002 13.4 13.399 0 7.396-6.003 13.398-13.4 13.398-1.528 0-2.988-.258-4.354-.73-.418-.145-.884.01-1.125.378l-.242.368c-.244.372-.15.864.218 1.12.364.254.757.472 1.168.654 1.4.619 2.943.958 4.568.958 6.294 0 11.4-5.105 11.4-11.4 0-6.294-5.106-11.4-11.4-11.4-.047 0-.094 0-.14.001z"/></svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-display font-bold text-ink-900 text-xs uppercase tracking-widest mb-5">Navegue</h4>
            <ul className="space-y-3">
              <li><a href="#hero-section" className="text-ink-400 text-sm hover:text-brand-red transition-colors duration-150">Início</a></li>
              <li><a href="#destaques" className="text-ink-400 text-sm hover:text-brand-red transition-colors duration-150">Destaques</a></li>
              <li><a href="#sobre" className="text-ink-400 text-sm hover:text-brand-red transition-colors duration-150">Nossa História</a></li>
              <li><a href="#cardapio" className="text-ink-400 text-sm hover:text-brand-red transition-colors duration-150">Cardápio</a></li>
              <li><a href="https://chiquinho.com.br/nossas-lojas/" target="_blank" rel="noreferrer" className="text-ink-400 text-sm hover:text-brand-red transition-colors duration-150">Nossas Lojas</a></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-display font-bold text-ink-900 text-xs uppercase tracking-widest mb-5">Institucional</h4>
            <ul className="space-y-3">
              <li><button onClick={openModal} className="text-ink-400 text-sm hover:text-brand-red transition-colors duration-150">Seja um Franqueado</button></li>
              <li><a href="https://chiquinho.com.br/contato/" target="_blank" rel="noreferrer" className="text-ink-400 text-sm hover:text-brand-red transition-colors duration-150">Contato</a></li>
              <li><a href="https://chiquinho.com.br/privacidade/" target="_blank" rel="noreferrer" className="text-ink-400 text-sm hover:text-brand-red transition-colors duration-150">Política de Privacidade</a></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-display font-bold text-ink-900 text-xs uppercase tracking-widest mb-5">Ajuda</h4>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${whatsapp.replace(/\D/g, '')}`} className="text-ink-400 text-sm hover:text-brand-red transition-colors duration-150 inline-flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l1.62-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {whatsapp}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="text-ink-400 text-sm hover:text-brand-red transition-colors duration-150 inline-flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 text-xs text-ink-300 border-t border-ink-100/50">
          <div className="flex flex-col gap-1.5 items-center sm:items-start text-center sm:text-left">
            <p>© {new Date().getFullYear()} C.S.B.F. Chiquinho Sorvetes B.F. Ltda. CNPJ: 12.184.975/0001-44</p>
            <p>
              Feito com ⚡ por{" "}
              <a 
                href="https://www.instagram.com/_primodev/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-ink-500 font-bold hover:text-brand-red transition-colors"
              >
                @_primodev
              </a>
            </p>
          </div>
          <div className="flex gap-4">
            <a href="https://chiquinho.com.br/termos-de-uso/" target="_blank" rel="noreferrer" className="hover:text-brand-red transition-colors">Termos</a>
            <a href="https://chiquinho.com.br/privacidade/" target="_blank" rel="noreferrer" className="hover:text-brand-red transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
