import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Destaques } from "@/components/sections/Destaques";
import { MenuSection } from "@/components/sections/MenuSection";
import { Sobre } from "@/components/sections/Sobre";
import { Franchise } from "@/components/sections/Franchise";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { getSettings } from "@/utils/settings";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Home() {
  const settings = await getSettings();
  const isMaintenanceMode = settings.general_maintenance_mode === "true";

  if (isMaintenanceMode) {
    return (
      <main className="min-h-screen bg-cream-50 flex items-center justify-center p-6 selection:bg-brand-red selection:text-white">
        <div className="text-center max-w-lg">
          <div className="mb-8">
            <Image
              src="/imagens_originais/chiquinho-logo-horizontal.png"
              alt="Chiquinho Sorvetes"
              width={220}
              height={60}
              className="mx-auto opacity-80"
            />
          </div>

          <div className="w-20 h-20 mx-auto mb-8 bg-white rounded-full shadow-sm flex items-center justify-center">
            <svg className="w-10 h-10 text-brand-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-black text-ink-900 tracking-tight mb-4">
            Estamos em manutenção
          </h1>
          <p className="text-ink-500 text-lg leading-relaxed mb-8">
            Nosso site está passando por uma atualização rápida para ficar ainda melhor. Voltamos em breve!
          </p>

          <div className="flex items-center justify-center gap-2 text-ink-300 text-sm">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            Trabalhando nisso agora
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream-50 selection:bg-brand-red selection:text-white">
      <Navbar settings={settings} />
      
      <Hero settings={settings} />
      
      <ScrollIndicator />
      
      <Destaques settings={settings} />
      
      <MenuSection settings={settings} />
      
      <Sobre settings={settings} />
      
      <Franchise settings={settings} />
      
      <WhatsAppButton phone={settings.contact_whatsapp} />
      <Footer />
    </main>
  );
}
