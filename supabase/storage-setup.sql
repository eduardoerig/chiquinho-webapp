-- Criar o bucket para produtos se não existir
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Política para permitir que qualquer pessoa veja as imagens (Público)
DROP POLICY IF EXISTS "Imagens de produtos são públicas" ON storage.objects;
CREATE POLICY "Imagens de produtos são públicas"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

-- Política para permitir que usuários autenticados façam upload
DROP POLICY IF EXISTS "Usuários autenticados podem subir imagens" ON storage.objects;
CREATE POLICY "Usuários autenticados podem subir imagens"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'products');

-- Política para permitir que usuários autenticados atualizem suas imagens
DROP POLICY IF EXISTS "Usuários autenticados podem editar imagens" ON storage.objects;
CREATE POLICY "Usuários autenticados podem editar imagens"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'products');

-- Política para permitir que usuários autenticados deletem imagens
DROP POLICY IF EXISTS "Usuários autenticados podem deletar imagens" ON storage.objects;
CREATE POLICY "Usuários autenticados podem deletar imagens"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'products');
