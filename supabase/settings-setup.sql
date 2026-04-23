-- Tabela de configurações do site
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    "group" TEXT NOT NULL,
    label TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'text',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
-- Leitura pública para o site carregar links, contatos, etc.
DROP POLICY IF EXISTS "Permitir leitura pública das configurações" ON public.site_settings;
CREATE POLICY "Permitir leitura pública das configurações"
ON public.site_settings FOR SELECT
USING (true);

-- Apenas admins podem atualizar
DROP POLICY IF EXISTS "Permitir atualização apenas para admins autenticados" ON public.site_settings;
CREATE POLICY "Permitir atualização apenas para admins autenticados"
ON public.site_settings FOR UPDATE
TO authenticated
USING (true);

-- Inserir/Atualizar dados iniciais com as chaves corretas
INSERT INTO public.site_settings (key, value, "group", label, type)
VALUES 
    -- Geral
    ('general_site_name', 'Chiquinho Sorvetes', 'geral', 'Nome do Site', 'text'),
    ('general_maintenance_mode', 'false', 'geral', 'Modo Manutenção', 'switch'),
    
    -- Contato
    ('contact_whatsapp', '(11) 99999-9999', 'contato', 'WhatsApp (com DDD)', 'text'),
    ('contact_email', 'contato@chiquinho.com.br', 'contato', 'E-mail de Contato', 'text'),
    ('contact_address', 'Av. Paulista, 1000 - São Paulo, SP', 'contato', 'Endereço Comercial', 'textarea'),
    
    -- Redes Sociais
    ('social_instagram', 'https://instagram.com/chiquinhosorvetes', 'social', 'Instagram URL', 'url'),
    ('social_facebook', 'https://facebook.com/chiquinhosorvetes', 'social', 'Facebook URL', 'url'),
    ('social_tiktok', 'https://tiktok.com/@chiquinho', 'social', 'TikTok URL', 'url'),
    
    -- Marketing & SEO
    ('marketing_ga_id', '', 'marketing', 'Google Analytics ID (GA4)', 'text'),
    ('marketing_pixel_id', '', 'marketing', 'Facebook Pixel ID', 'text'),
    ('marketing_ifood_link', 'https://www.ifood.com.br/delivery/descobrir/lista/chain:fabf2493-6ce0-4534-8cce-c4ae743a59d1', 'marketing', 'Link do iFood', 'url'),
    ('seo_description', 'A maior rede de sorveterias do Brasil. Venha conhecer nossos produtos deliciosos!', 'marketing', 'Meta Descrição Global', 'textarea')
ON CONFLICT (key) DO UPDATE 
SET "group" = EXCLUDED."group", 
    label = EXCLUDED.label, 
    type = EXCLUDED.type;
