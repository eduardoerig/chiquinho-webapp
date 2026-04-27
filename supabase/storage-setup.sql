-- Criar bucket de storage para os assets do site (se não existir)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- (RLS já é habilitado por padrão no Supabase para storage.objects)

-- Remover políticas antigas para evitar duplicação (se você for rodar o script novamente)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Auth Upload" ON storage.objects;
DROP POLICY IF EXISTS "Auth Update" ON storage.objects;
DROP POLICY IF EXISTS "Auth Delete" ON storage.objects;

-- Permitir acesso público de leitura para o bucket "site-assets"
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

-- Permitir upload para usuários autenticados no bucket "site-assets"
CREATE POLICY "Auth Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'site-assets');

-- Permitir update para usuários autenticados no bucket "site-assets"
CREATE POLICY "Auth Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'site-assets');

-- Permitir delete para usuários autenticados no bucket "site-assets"
CREATE POLICY "Auth Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'site-assets');
