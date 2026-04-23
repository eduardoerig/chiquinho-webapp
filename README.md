<p align="center">
  <img src="public/imagens_originais/chiquinho-logo-horizontal.png" alt="Chiquinho Sorvetes" width="280" />
</p>

<h1 align="center">Chiquinho Sorvetes — Web App</h1>

<p align="center">
  <strong>Site institucional + Painel Administrativo</strong><br/>
  Desenvolvido com Next.js 16, React 19, Supabase e Tailwind CSS 4
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3FCF8E?logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0050?logo=framer" alt="Framer Motion" />
</p>

---

## 📋 Sobre o Projeto

Aplicação web completa para a **Chiquinho Sorvetes**, a maior rede de sorveterias do Brasil. O projeto inclui um site público institucional de alta performance com animações premium e um painel administrativo robusto para gerenciamento de conteúdo.

### ✨ Destaques

- 🎨 **Design Premium** — UI moderna com glassmorphism, micro-animações e identidade visual fiel à marca
- ⚡ **Performance** — Server Components, React.cache(), lazy loading e otimização de imagens
- 📱 **Responsivo** — Layout adaptável para desktop, tablet e mobile
- 🔒 **Admin Seguro** — Autenticação via Supabase Auth com painel completo de gestão
- 🛠️ **Modo Manutenção** — Ativável pelo admin para exibir tela de manutenção aos visitantes

---

## 🏗️ Arquitetura

```
src/
├── app/
│   ├── page.tsx                    # Página principal (pública)
│   ├── layout.tsx                  # Layout raiz com SEO dinâmico
│   └── admin/
│       ├── login/                  # Autenticação
│       └── (dashboard)/
│           ├── page.tsx            # Visão geral
│           ├── products/           # CRUD de produtos
│           ├── categories/         # Gerenciamento de categorias
│           ├── leads/              # Leads de franquia + export CSV
│           └── settings/           # Configurações do site com preview
├── components/
│   ├── admin/                      # Sidebar responsiva
│   ├── layout/                     # Navbar, Footer, FranchiseModal
│   ├── sections/                   # Hero, Destaques, Menu, Sobre, Franchise
│   └── ui/                         # WhatsApp, Skeletons, ScrollIndicator
├── context/                        # FranchiseContext (modal global)
├── utils/
│   ├── settings.ts                 # getSettings() com React.cache()
│   └── supabase/                   # Client, Server, Middleware
└── lib/
    └── utils.ts                    # cn() helper (clsx + tailwind-merge)
```

---

## 🌐 Site Público

| Seção | Descrição |
|-------|-----------|
| **Hero** | Vídeo de fundo, animações escalonadas com Framer Motion e scroll indicator |
| **Destaques** | Carrossel horizontal com navegação por setas e dots indicadores |
| **Cardápio** | Grid filtrável por categoria com skeleton loading e geração de PDF premium |
| **Sobre Nós** | História da marca com imagens e dados dinâmicos do admin |
| **Franquia** | Formulário de leads com modal elegante |
| **WhatsApp** | Botão flutuante com tooltip e animação pulse |

---

## 🔧 Painel Administrativo

| Funcionalidade | Detalhes |
|----------------|----------|
| **Dashboard** | Visão geral com métricas (produtos, categorias, leads) |
| **Produtos** | CRUD completo com upload de imagem e categorização |
| **Categorias** | Gerenciamento de categorias com slug automático |
| **Leads** | Tabela com busca, filtros por status, dropdown de status (novo/contatado/convertido/descartado) e export CSV |
| **Configurações** | Abas agrupadas com preview em tempo real, indicador de alterações não salvas e modo manutenção |
| **Sidebar** | Navegação responsiva com drawer mobile (hamburger + overlay) |

---

## 🚀 Começando

### Pré-requisitos

- **Node.js** 18+
- **npm** ou **yarn**
- Conta no **Supabase** (projeto configurado)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/eduardoerig/chiquinho-webapp.git
cd chiquinho-webapp

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
```

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
NEXT_PUBLIC_SITE_URL=https://seudominio.com.br
```

### Banco de Dados

Execute os scripts SQL no Supabase SQL Editor:

```bash
# 1. Configurações do site
supabase/settings-setup.sql

# 2. Configuração de storage
supabase/storage-setup.sql
```

### Rodando

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build
npm start
```

---

## 🧰 Stack Tecnológica

| Tecnologia | Uso |
|------------|-----|
| [Next.js 16](https://nextjs.org/) | Framework React com App Router e Turbopack |
| [React 19](https://react.dev/) | UI com Server Components e `React.cache()` |
| [Supabase](https://supabase.com/) | Auth, Database (PostgreSQL) e Storage |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilização utility-first |
| [Framer Motion](https://www.framer.com/motion/) | Animações e transições |
| [Lucide React](https://lucide.dev/) | Ícones |
| [jsPDF](https://github.com/parallax/jsPDF) | Geração de cardápio em PDF |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |

---

## 📁 Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento (Turbopack) |
| `npm run build` | Gera o build de produção |
| `npm start` | Inicia o servidor de produção |
| `npm run lint` | Executa o ESLint |

---

## 👨‍💻 Autor

**Eduardo Erig** — [@eduardoerig](https://github.com/eduardoerig)

Desenvolvido por [PrimoDev](https://primodev.com.br)

---

<p align="center">
  <sub>Feito com ❤️ e muito sorvete 🍦</sub>
</p>
