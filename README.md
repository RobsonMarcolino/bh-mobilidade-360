# 🏙️ BH Mobilidade 360

> Plataforma cidadã inteligente para reportar, acompanhar e resolver problemas de mobilidade e infraestrutura urbana em Belo Horizonte, MG.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)
![Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=flat-square&logo=google)

---

## 📋 Sobre o Projeto

O **BH Mobilidade 360** é uma plataforma web completa que permite aos cidadãos de Belo Horizonte:

- 🕳️ **Reportar problemas urbanos** (buracos, postes apagados, alagamentos, etc.) com classificação automática por IA
- 🗺️ **Visualizar no mapa** todos os problemas reportados com filtros e clusters
- 🚌 **Consultar transporte público** (ônibus, MOVE, metrô) com avaliações
- 🤖 **Conversar com IA** sobre mobilidade e infraestrutura de BH
- 📊 **Acompanhar indicadores** de qualidade urbana por regional
- 🏆 **Gamificação** — ganhe pontos e badges por contribuir

## 🛠️ Stack Tecnológica

| Tecnologia | Uso |
|---|---|
| **Next.js 14** | Framework full-stack (App Router) |
| **React 18** | Interface de usuário |
| **TypeScript** | Tipagem estática |
| **Tailwind CSS** | Estilização |
| **Framer Motion** | Animações |
| **Prisma ORM** | Acesso ao banco de dados |
| **PostgreSQL** | Banco de dados (via Supabase) |
| **Supabase** | Auth, Storage, Realtime |
| **Google Gemini** | IA (texto + visão) — FREE |
| **Leaflet** | Mapas interativos |
| **Recharts** | Gráficos e dashboards |
| **Lucide React** | Ícones |

## 🚀 Como Rodar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no [Google AI Studio](https://aistudio.google.com) (gratuita)
- Conta no [Supabase](https://supabase.com) (gratuita)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/bh-mobilidade-360.git
cd bh-mobilidade-360
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.local.example .env.local
```

Edite o `.env.local` com suas chaves:

- **GEMINI_API_KEY**: Obtenha em https://aistudio.google.com/apikey
- **Supabase**: Crie um projeto em https://supabase.com e copie as chaves
- **DATABASE_URL**: URL do PostgreSQL do Supabase

### 4. Configure o banco de dados

```bash
npx prisma generate
npx prisma db push
```

### 5. Rode o projeto

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
bh-mobilidade-360/
├── prisma/              # Schema do banco de dados
├── public/              # Assets estáticos
├── src/
│   ├── app/             # App Router (páginas e API)
│   │   ├── api/         # API Routes
│   │   ├── chat/        # Página do Chat IA
│   │   ├── dashboard/   # Página do Dashboard
│   │   ├── mapa/        # Página do Mapa
│   │   ├── reportar/    # Página de Reportar
│   │   └── transporte/  # Página de Transporte
│   ├── components/      # Componentes React
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Configurações (Gemini, Supabase, Prisma)
│   ├── types/           # TypeScript types
│   └── utils/           # Utilitários e constantes
├── .env.local.example   # Template de variáveis de ambiente
├── tailwind.config.ts   # Configuração do Tailwind
└── package.json
```

## 🤖 Inteligência Artificial

O projeto utiliza o **Google Gemini 2.5 Flash** (gratuito) para:

1. **Classificação de imagens** — O cidadão envia foto de um problema urbano e a IA classifica:
   - Tipo (buraco, poste apagado, alagamento, etc.)
   - Severidade (baixa, média, alta, crítica)
   - Órgão responsável
   - Recomendação

2. **Chatbot inteligente** — Responde perguntas sobre mobilidade e infraestrutura de BH:
   - Canais de atendimento
   - Informações de transporte
   - Orientações para o cidadão

## 📊 Dados Abertos

O projeto pode ser integrado com os **Dados Abertos da Prefeitura de BH**:
- Portal: https://dados.pbh.gov.br
- API CKAN com ~588 datasets
- Dados de transporte, infraestrutura, regionais

## 🌐 Deploy

O projeto pode ser deployado gratuitamente:

- **Frontend/Backend**: [Vercel](https://vercel.com) (free tier)
- **Banco de dados**: [Supabase](https://supabase.com) (free tier)
- **IA**: [Google Gemini](https://aistudio.google.com) (free tier)

```bash
# Deploy na Vercel
npx vercel
```

## 👨‍💻 Autor

**Robson Marcolino da Silva Junior**
- Analista de Vendas | Embaixador IA @ Ambev GEO Minas
- Formação em Desenvolvimento de Sistemas
- LinkedIn: [seu-linkedin]

---

*Projeto de portfólio — Não possui vínculo oficial com a Prefeitura de Belo Horizonte.*
