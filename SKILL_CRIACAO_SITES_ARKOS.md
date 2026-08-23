# 🚀 ARKOS Digital Studio — Guia Oficial de Engenharia & Criação de Sites

Este documento consolida todas as diretrizes técnicas, arquiteturais, estéticas, de ciência de dados e de negócios da **ARKOS Soluções Digitais** para o desenvolvimento de sites e plataformas web de alta conversão.

---

## 📁 1. Regra de Diretórios & Reprodutibilidade

Cada novo site de cliente deve ser criado em uma **pasta isolada e independente** dentro de `c:\repositorio\<NomeDoProjeto>`:
- Exemplo 1: `c:\repositorio\Promisse` (Projeto Promisse / Promossi de Calebe)
- Exemplo 2: `c:\repositorio\ESP_Consultoria` (Projeto ESP Consultoria de Emmanuel Pires)

### Estrutura Padrão de Cada Projeto:
```
c:\repositorio\<NomeDoProjeto>\
├── src/
│   ├── app/
│   │   ├── layout.tsx         (Metadados OpenGraph, Fontes, Scripts GA4/Meta Pixel)
│   │   ├── page.tsx           (Página principal de alta conversão)
│   │   ├── globals.css        (Design System, Cores Tailored, Viewport Lock)
│   │   └── api/
│   │       └── lead/route.ts  (Webhook / Salvamento de Leads no Supabase)
│   └── components/
│       ├── Header.tsx         (Navegação e CTA rápido de WhatsApp)
│       ├── Hero.tsx           (Headline de impacto, prova e formulário express)
│       ├── Features.tsx       (Diferenciais e quebra de objeções)
│       ├── PricingTable.tsx   (Planos, cotações e tabelas de valor)
│       ├── LeadForm.tsx       (Formulário de qualificação inteligente)
│       ├── Analytics.tsx      (Rastreamento de conversões GTM / Meta Pixel)
│       └── Footer.tsx         (Autoridade, dados institucionais e compliance)
├── public/
│   └── assets/                (Fotografias reais geradas via IA sem placeholders)
├── .env.local                 (Credenciais Supabase, GA4_ID, PIXEL_ID)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎯 2. O Método em 10 Fases Aplicado a Cada Projeto

1. **Fase 01 · Entendimento & Diagnóstico**: Leitura minuciosa do briefing do cliente.
2. **Fase 02 · Pesquisa & Benchmarking do Nicho**: Estudo dos concorrentes líderes de mercado.
3. **Fase 03 · Estratégia Comercial & Arquitetura**: Jornada de persuasão, UVP e quebra de objeções.
4. **Fase 04 · Design Visual & Paleta Tailored**: Teoria das cores aplicada ao nicho, tipografia premium Google Fonts e fotos cinematográficas reais.
5. **Fase 05 · Estrutura Técnica & Integrações**: Supabase para armazenamento de leads, WhatsApp integrado e APIs.
6. **Fase 06 · Construção em Código Puro**: Next.js 16 + React 19 + TypeScript.
7. **Fase 07 · Validação Mobile-First**: Viewport travado sem vazamento lateral (`overflow-x: hidden`, `width: 100%`).
8. **Fase 08 · Publicação & SEO**: Metadados dinâmicos, OpenGraph e Schema.org.
9. **Fase 09 · Ciência de Dados & Analytics**: Google Tag Manager, GA4 e Meta Pixel integrados no `window.dataLayer`.
10. **Fase 10 · Evolução & Escala**: Preparado para crescimento de catálogo, blog e portais.
