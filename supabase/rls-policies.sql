-- =======================================================
-- POLÍTICAS DE RLS PARA O PAINEL ADMIN - CHIQUINHO SORVETES
-- Cole este SQL no SQL Editor do Supabase e execute.
-- =======================================================

-- -------------------------------------------------------
-- TABELA: products
-- -------------------------------------------------------
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Leitura pública (site público)
DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

-- CRUD completo para usuários autenticados (admin)
DROP POLICY IF EXISTS "admin_all_products" ON products;
CREATE POLICY "admin_all_products"
  ON products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- -------------------------------------------------------
-- TABELA: categories
-- -------------------------------------------------------
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Leitura pública
DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- CRUD completo para usuários autenticados (admin)
DROP POLICY IF EXISTS "admin_all_categories" ON categories;
CREATE POLICY "admin_all_categories"
  ON categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- -------------------------------------------------------
-- TABELA: leads
-- -------------------------------------------------------
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Qualquer visitante pode enviar um lead (formulário público)
DROP POLICY IF EXISTS "public_insert_leads" ON leads;
CREATE POLICY "public_insert_leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Somente admins autenticados podem ver os leads
DROP POLICY IF EXISTS "admin_read_leads" ON leads;
CREATE POLICY "admin_read_leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

-- Admins podem atualizar status dos leads
DROP POLICY IF EXISTS "admin_update_leads" ON leads;
CREATE POLICY "admin_update_leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admins podem excluir leads
DROP POLICY IF EXISTS "admin_delete_leads" ON leads;
CREATE POLICY "admin_delete_leads"
  ON leads FOR DELETE
  TO authenticated
  USING (true);
