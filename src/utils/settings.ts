import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export type SettingKey = 
  | 'general_site_name' 
  | 'general_maintenance_mode' 
  | 'contact_whatsapp' 
  | 'contact_email' 
  | 'contact_address' 
  | 'social_instagram' 
  | 'social_facebook' 
  | 'social_tiktok' 
  | 'marketing_ga_id' 
  | 'marketing_pixel_id' 
  | 'marketing_ifood_link'
  | 'seo_description'
  | 'hero_title'
  | 'hero_subtitle'
  | 'destaques_title'
  | 'destaques_subtitle'
  | 'history_title'
  | 'history_text'
  | 'menu_title'
  | 'menu_subtitle'
  | 'franchise_section_title'
  | 'franchise_section_description';

/**
 * Busca todas as configurações do banco de dados e as retorna em um objeto chave-valor.
 * Envolvida com React.cache() para deduplicar chamadas no mesmo request (Server Components).
 */
export const getSettings = cache(async (): Promise<Record<string, string>> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value');

    if (error) {
      console.error('Error fetching settings:', error);
      return {};
    }

    if (!data) return {};

    return data.reduce((acc: Record<string, string>, curr) => {
      acc[curr.key] = curr.value || "";
      return acc;
    }, {});
  } catch (err) {
    console.error('Unexpected error fetching settings:', err);
    return {};
  }
});

