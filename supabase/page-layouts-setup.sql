-- Tabela de layouts de página (Editor Visual)
CREATE TABLE IF NOT EXISTS public.page_layouts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sections JSONB NOT NULL DEFAULT '[]',
  is_published BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- RLS
ALTER TABLE public.page_layouts ENABLE ROW LEVEL SECURITY;

-- Leitura pública (site renderiza o layout)
DROP POLICY IF EXISTS "Leitura pública dos layouts" ON public.page_layouts;
CREATE POLICY "Leitura pública dos layouts"
ON public.page_layouts FOR SELECT
USING (true);

-- Admins podem inserir
DROP POLICY IF EXISTS "Admin pode inserir layouts" ON public.page_layouts;
CREATE POLICY "Admin pode inserir layouts"
ON public.page_layouts FOR INSERT
TO authenticated
WITH CHECK (true);

-- Admins podem atualizar
DROP POLICY IF EXISTS "Admin pode atualizar layouts" ON public.page_layouts;
CREATE POLICY "Admin pode atualizar layouts"
ON public.page_layouts FOR UPDATE
TO authenticated
USING (true);

-- Admins podem deletar
DROP POLICY IF EXISTS "Admin pode deletar layouts" ON public.page_layouts;
CREATE POLICY "Admin pode deletar layouts"
ON public.page_layouts FOR DELETE
TO authenticated
USING (true);

-- Seed: layout padrão da home com as seções atuais
INSERT INTO public.page_layouts (id, name, sections, is_published)
VALUES (
  'home',
  'Página Principal',
  '[
    {
      "id": "sec_hero",
      "type": "hero",
      "visible": true,
      "props": {
        "badge": "Qualidade Premium",
        "title": "O sabor que conquista o Brasil",
        "subtitle": "Desde 1980, transformando sorvetes em momentos de felicidade.",
        "ctaText": "Ver Cardápio",
        "ctaLink": "#cardapio",
        "ctaSecondaryText": "Mais Pedidos",
        "ctaSecondaryLink": "#destaques",
        "products": [
          {"src": "/imagens_originais/cardapio_2.png", "alt": "Açaí Premium", "description": "Açaí cremoso com frutas frescas e toppings irresistíveis."},
          {"src": "/imagens_originais/produtos_capa_shakemix_01.png", "alt": "Shake Mix", "description": "Combinação perfeita de sorvete, frutas e toppings premium."},
          {"src": "/imagens_originais/cardapio_1.png", "alt": "Sorvete Premium", "description": "Sorvete artesanal com ingredientes selecionados desde 1980."}
        ]
      }
    },
    {
      "id": "sec_divider_scroll",
      "type": "divider",
      "visible": true,
      "props": {
        "style": "scroll_arrow"
      }
    },
    {
      "id": "sec_highlights",
      "type": "highlights",
      "visible": true,
      "props": {
        "title": "Nossos Queridinhos",
        "subtitle": "Descubra os sabores que fazem a fama da Chiquinho em todo o país."
      }
    },
    {
      "id": "sec_menu",
      "type": "menu",
      "visible": true,
      "props": {
        "title": "Explore nosso Cardápio",
        "subtitle": "Mais de 100 opções preparadas com carinho para você."
      }
    },
    {
      "id": "sec_about",
      "type": "about",
      "visible": true,
      "props": {
        "title": "Nossa História",
        "content": "<p>A Chiquinho Sorvetes nasceu em 1980, em Frutal/MG, com o sonho de levar alegria através do sorvete mais saboroso e cremoso.</p>",
        "buttonText": "Conheça a história completa",
        "buttonLink": "https://chiquinho.com.br/a-chiquinho/",
        "image": "/imagens_originais/sobre-a-marca-primeira-chiquinho-01.png"
      }
    },
    {
      "id": "sec_franchise",
      "type": "franchise",
      "visible": true,
      "props": {
        "title": "Seja um Franqueado",
        "description": "<p>Faça parte da maior rede de sorveterias do Brasil e transforme o mercado de sobremesas na sua região.</p>",
        "buttonText": "Quero Abrir uma Unidade",
        "stats": [
          {"value": "700+", "label": "Unidades"},
          {"value": "40+", "label": "Anos de Sucesso"}
        ],
        "image": "/imagens_originais/img_mapa-unidades.png.webp"
      }
    }
  ]'::jsonb,
  true
)
ON CONFLICT (id) DO NOTHING;
