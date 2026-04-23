"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { 
  Save, 
  Loader2, 
  Globe, 
  Phone, 
  Share2, 
  BarChart3, 
  CheckCircle2, 
  Layout,
  Star,
  BookOpen,
  Coffee,
  Store,
  Eye,
  EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Setting {
  key: string;
  value: string;
  group: string;
  label: string;
  type: string;
}

const tabGroups = [
  {
    groupLabel: "Configurações",
    tabs: [
      { id: "geral", label: "Geral", icon: Globe },
      { id: "contato", label: "Contatos", icon: Phone },
      { id: "social", label: "Redes Sociais", icon: Share2 },
      { id: "marketing", label: "Marketing & SEO", icon: BarChart3 },
    ],
  },
  {
    groupLabel: "Seções do Site",
    tabs: [
      { id: "hero", label: "Destaque (Hero)", icon: Layout },
      { id: "destaques", label: "Queridinhos", icon: Star },
      { id: "cardapio", label: "Cardápio", icon: Coffee },
      { id: "historia", label: "Sobre Nós", icon: BookOpen },
      { id: "franquia", label: "Franquia", icon: Store },
    ],
  },
];

// Flat list para lookup
const allTabs = tabGroups.flatMap(g => g.tabs);

// Abas que têm preview visual
const previewableTabs = ["hero", "destaques", "historia", "cardapio", "franquia"];

export default function SettingsAdmin() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [originalSettings, setOriginalSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("geral");
  const [successMessage, setSuccessMessage] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  // Detectar se há alterações não salvas
  const hasUnsavedChanges = useMemo(() => {
    return settings.some(s => s.value !== originalSettings[s.key]);
  }, [settings, originalSettings]);

  // Aviso ao sair com alterações não salvas
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  useEffect(() => {
    fetchSettings();
  }, [supabase]);

  async function fetchSettings() {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('group');
    
    if (error) {
      console.error('Erro ao buscar configurações:', error);
    } else if (data) {
      setSettings(data);
      const map: Record<string, string> = {};
      data.forEach(s => { map[s.key] = s.value; });
      setOriginalSettings(map);
    }
    setLoading(false);
  }

  const handleUpdateValue = (key: string, value: string) => {
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
  };

  // Helper para pegar valor atual de uma setting pelo key
  const getValue = (key: string) => {
    return settings.find(s => s.key === key)?.value || "";
  };

  async function handleSave() {
    setIsSaving(true);
    
    const changedSettings = settings.filter(s => s.value !== originalSettings[s.key]);
    
    if (changedSettings.length === 0) {
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
      setIsSaving(false);
      return;
    }

    const updates = changedSettings.map(setting => 
      supabase
        .from('site_settings')
        .update({ 
          value: setting.value, 
          updated_at: new Date().toISOString() 
        })
        .eq('key', setting.key)
    );

    const results = await Promise.all(updates);
    const hasError = results.some(r => r.error);

    if (hasError) {
      alert("Algumas configurações não puderam ser salvas.");
    } else {
      const map: Record<string, string> = {};
      settings.forEach(s => { map[s.key] = s.value; });
      setOriginalSettings(map);
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
    }
    
    setIsSaving(false);
  }

  const groupedSettings = settings.filter(s => s.group === activeTab);
  const hasPreview = previewableTabs.includes(activeTab);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-ink-900 tracking-tight">Configurações</h1>
          <p className="text-ink-500 mt-1">Gerencie as informações globais e o conteúdo das seções.</p>
        </div>
        <div className="flex items-center gap-3">
          {hasPreview && (
            <button 
              onClick={() => setShowPreview(!showPreview)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all border",
                showPreview 
                  ? "bg-blue-50 text-blue-600 border-blue-200" 
                  : "bg-white text-ink-500 border-ink-200 hover:border-blue-200 hover:text-blue-600"
              )}
            >
              {showPreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              Preview
            </button>
          )}
          {hasUnsavedChanges && (
            <span className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 text-amber-700 text-xs font-bold rounded-xl border border-amber-200">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              Alterações não salvas
            </span>
          )}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-brand-red text-white px-6 py-2.5 rounded-xl font-bold hover:bg-brand-red/90 transition-all disabled:opacity-50 shadow-lg shadow-brand-red/20 active:scale-95"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-5">
          {tabGroups.map((group) => (
            <div key={group.groupLabel}>
              <p className="text-[10px] font-bold text-ink-400 uppercase tracking-[0.15em] px-4 mb-2">{group.groupLabel}</p>
              <div className="space-y-1">
                {group.tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left",
                      activeTab === tab.id 
                        ? "bg-white text-brand-red shadow-sm border border-ink-100" 
                        : "text-ink-500 hover:bg-white/50 hover:text-brand-red"
                    )}
                  >
                    <tab.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">{tab.label}</span>
                    {previewableTabs.includes(tab.id) && (
                      <Eye className="w-3 h-3 ml-auto text-ink-300 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">

          {/* Preview Section */}
          {hasPreview && showPreview && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`preview-${activeTab}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white border border-blue-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-5 py-3 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Preview em Tempo Real</span>
                  </div>
                  <div className="p-0">
                    <SectionPreview activeTab={activeTab} getValue={getValue} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Form Area */}
          <div className="bg-white border border-ink-100 rounded-2xl shadow-sm overflow-hidden min-h-[400px]">
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="border-b border-ink-100 pb-4 mb-6">
                    <h3 className="text-xl font-display font-black text-ink-900 capitalize">
                      {allTabs.find(t => t.id === activeTab)?.label}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {groupedSettings.map((setting) => (
                      <div key={setting.key} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-bold text-ink-700">{setting.label}</label>
                          <span className="text-[10px] text-ink-300 font-mono hidden sm:inline">{setting.key}</span>
                        </div>
                        
                        {setting.type === 'switch' ? (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleUpdateValue(setting.key, setting.value === 'true' ? 'false' : 'true')}
                              className={cn(
                                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red/20",
                                setting.value === 'true' ? "bg-brand-red" : "bg-ink-200"
                              )}
                            >
                              <span
                                className={cn(
                                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                  setting.value === 'true' ? "translate-x-6" : "translate-x-1"
                                )}
                              />
                            </button>
                            <span className="text-sm text-ink-500">{setting.value === 'true' ? 'Ativado' : 'Desativado'}</span>
                          </div>
                        ) : setting.type === 'textarea' ? (
                          <textarea
                            value={setting.value || ""}
                            onChange={e => handleUpdateValue(setting.key, e.target.value)}
                            className="w-full px-4 py-3 border border-ink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red min-h-[120px] text-sm resize-none transition-all"
                          />
                        ) : (
                          <input
                            type={setting.type === 'url' ? 'url' : 'text'}
                            value={setting.value || ""}
                            onChange={e => handleUpdateValue(setting.key, e.target.value)}
                            className="w-full px-4 py-2.5 border border-ink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red text-sm transition-all"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {groupedSettings.length === 0 && (
                    <div className="text-center py-12 text-ink-400">
                      Nenhuma configuração neste grupo.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      <AnimatePresence>
        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 z-50"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold">Salvo com sucesso!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ==============================================================
   PREVIEW COMPONENT - Renderiza mini-preview de cada seção
   ============================================================== */

interface SectionPreviewProps {
  activeTab: string;
  getValue: (key: string) => string;
}

function SectionPreview({ activeTab, getValue }: SectionPreviewProps) {
  switch (activeTab) {
    case "hero":
      return <HeroPreview getValue={getValue} />;
    case "destaques":
      return <DestaquesPreview getValue={getValue} />;
    case "historia":
      return <HistoriaPreview getValue={getValue} />;
    case "cardapio":
      return <CardapioPreview getValue={getValue} />;
    case "franquia":
      return <FranquiaPreview getValue={getValue} />;
    default:
      return null;
  }
}

/* --- Hero Preview --- */
function HeroPreview({ getValue }: { getValue: (key: string) => string }) {
  const title = getValue("hero_title") || "O sabor que conquista o Brasil";
  const subtitle = getValue("hero_subtitle") || "Desde 1980, transformando sorvetes em momentos de felicidade.";

  return (
    <div className="relative bg-cream-50 p-8 flex flex-col items-center text-center overflow-hidden">
      {/* Mini product images */}
      <div className="flex items-end justify-center gap-4 mb-6">
        <div className="w-12 h-16 relative -rotate-10">
          <Image src="/imagens_originais/cardapio_2.png" alt="" fill className="object-contain drop-shadow-md" />
        </div>
        <div className="w-16 h-20 relative z-10">
          <Image src="/imagens_originais/produtos_capa_shakemix_01.png" alt="" fill className="object-contain drop-shadow-md" />
        </div>
        <div className="w-12 h-16 relative rotate-10">
          <Image src="/imagens_originais/cardapio_1.png" alt="" fill className="object-contain drop-shadow-md" />
        </div>
      </div>

      <span className="inline-block text-brand-red font-bold text-[9px] uppercase tracking-[0.2em] mb-2 bg-brand-bg px-3 py-1 rounded-full border border-brand-red/10">Qualidade Premium</span>
      <h2 className="text-lg font-display font-black text-ink-900 tracking-tight leading-tight mb-2">
        {title}
      </h2>
      <p className="text-ink-500 text-xs leading-relaxed max-w-xs">{subtitle}</p>
      <div className="flex gap-2 mt-4">
        <span className="px-3 py-1.5 bg-brand-red text-white text-[10px] font-bold rounded-lg">Ver Cardápio</span>
        <span className="px-3 py-1.5 border border-ink-200 text-ink-700 text-[10px] font-bold rounded-lg">Mais Pedidos</span>
      </div>
    </div>
  );
}

/* --- Destaques Preview --- */
function DestaquesPreview({ getValue }: { getValue: (key: string) => string }) {
  const title = getValue("destaques_title") || "Nossos Queridinhos";
  const subtitle = getValue("destaques_subtitle") || "Descubra os sabores que fazem a fama da Chiquinho em todo o país.";

  const mockProducts = [
    { name: "Shake Mix", tag: "Novidade" },
    { name: "Cascão Trufado", tag: "Mais Pedido" },
    { name: "Sundae Clássico", tag: "Tradicional" },
  ];

  return (
    <div className="bg-white p-6">
      <div className="text-center mb-4">
        <span className="text-brand-red text-[9px] font-bold uppercase tracking-[0.2em] block mb-1">Nossos Destaques</span>
        <h3 className="text-lg font-display font-black text-ink-900 tracking-tight">{title}</h3>
        <p className="text-ink-500 text-xs mt-1 max-w-xs mx-auto">{subtitle}</p>
      </div>
      <div className="flex gap-3 justify-center">
        {mockProducts.map(p => (
          <div key={p.name} className="bg-cream-50 border border-ink-100/60 rounded-xl p-3 w-24 text-center">
            <div className="w-10 h-10 bg-white rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Star className="w-4 h-4 text-brand-red" />
            </div>
            <span className="text-brand-red text-[8px] font-bold uppercase block">{p.tag}</span>
            <span className="text-ink-900 text-[10px] font-bold block leading-tight mt-0.5">{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Historia Preview --- */
function HistoriaPreview({ getValue }: { getValue: (key: string) => string }) {
  const title = getValue("history_title") || "Nossa História";
  const text = getValue("history_text") || "A Chiquinho Sorvetes nasceu em 1980, em Frutal/MG, com o sonho de levar alegria através do sorvete.";

  return (
    <div className="bg-white p-6">
      <div className="flex gap-5 items-start">
        <div className="flex-1 min-w-0">
          <span className="text-brand-red text-[9px] font-bold uppercase tracking-[0.2em] block mb-1">A Nossa História</span>
          <h3 className="text-lg font-display font-black text-ink-900 tracking-tight mb-2">{title}</h3>
          <p className="text-ink-500 text-xs leading-relaxed line-clamp-3">{text}</p>
          <span className="inline-block mt-3 px-3 py-1.5 bg-brand-bg text-brand-red text-[10px] font-bold rounded-lg">
            Conheça a história completa →
          </span>
        </div>
        <div className="relative flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden bg-cream-50 border-2 border-white shadow-md">
          <Image 
            src="/imagens_originais/sobre-a-marca-primeira-chiquinho-01.png" 
            alt="" 
            fill 
            className="object-cover" 
          />
          <div className="absolute bottom-1 left-1 bg-white px-1.5 py-0.5 rounded-md shadow flex items-center gap-1">
            <div className="w-4 h-4 bg-brand-red rounded-full flex items-center justify-center text-white text-[7px] font-bold">80</div>
            <span className="text-[7px] font-bold text-ink-700">Década de Origem</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Cardápio Preview --- */
function CardapioPreview({ getValue }: { getValue: (key: string) => string }) {
  const title = getValue("menu_title") || "Explore nosso Cardápio";
  const subtitle = getValue("menu_subtitle") || "Mais de 100 opções preparadas com carinho para você.";

  return (
    <div className="bg-cream-50 p-6">
      <div className="text-center mb-4">
        <span className="text-brand-red text-[9px] font-bold uppercase tracking-[0.2em] block mb-1">Cardápio</span>
        <h3 className="text-lg font-display font-black text-ink-900 tracking-tight">{title}</h3>
        <p className="text-ink-400 text-xs mt-1">{subtitle}</p>
      </div>
      <div className="flex gap-2 justify-center mb-3">
        <span className="px-3 py-1 bg-brand-red text-white text-[9px] font-bold rounded-full">Todos</span>
        <span className="px-3 py-1 bg-white text-ink-500 text-[9px] font-medium rounded-full border border-ink-100">Shake Mix</span>
        <span className="px-3 py-1 bg-white text-ink-500 text-[9px] font-medium rounded-full border border-ink-100">Casquinha</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white border border-ink-100/50 rounded-lg p-2 text-center">
            <div className="h-8 bg-cream-50 rounded mb-1.5 flex items-center justify-center">
              <Coffee className="w-3 h-3 text-ink-300" />
            </div>
            <div className="h-1.5 bg-ink-100 rounded w-3/4 mx-auto mb-1" />
            <div className="h-1 bg-ink-100/60 rounded w-1/2 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Franquia Preview --- */
function FranquiaPreview({ getValue }: { getValue: (key: string) => string }) {
  const title = getValue("franchise_section_title") || "Seja um Franqueado";
  const description = getValue("franchise_section_description") || "Faça parte da maior rede de sorveterias do Brasil.";

  return (
    <div className="bg-brand-soft/10 p-6">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-brand-red/10">
        <div className="flex gap-4 p-5">
          <div className="flex-1 min-w-0">
            <span className="text-brand-red text-[9px] font-bold uppercase tracking-[0.2em] block mb-1">Expansão</span>
            <h3 className="text-base font-display font-black text-ink-900 tracking-tight mb-1.5">{title}</h3>
            <p className="text-ink-500 text-[10px] leading-relaxed line-clamp-2 mb-3">{description}</p>
            <div className="flex gap-4 mb-3">
              <div>
                <div className="text-brand-red font-display font-black text-sm">700+</div>
                <div className="text-ink-400 text-[8px] font-bold uppercase">Unidades</div>
              </div>
              <div>
                <div className="text-brand-red font-display font-black text-sm">40+</div>
                <div className="text-ink-400 text-[8px] font-bold uppercase">Anos</div>
              </div>
            </div>
            <span className="inline-block px-3 py-1.5 bg-brand-red text-white text-[10px] font-bold rounded-lg">
              Quero Abrir uma Unidade →
            </span>
          </div>
          <div className="w-24 h-24 relative flex-shrink-0 rounded-lg overflow-hidden">
            <Image 
              src="/imagens_originais/img_mapa-unidades.png.webp" 
              alt="" 
              fill 
              className="object-contain" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
