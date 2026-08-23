---
name: arkos-digital-studio
description: Metodologia, engenharia de software, design de alta conversão, ciência de dados e arquitetura de entrega da ARKOS Soluções Digitais para criação de sites e plataformas sob medida.
---

# ARKOS Digital Studio — Skill de Engenharia & Criação de Soluções Digitais

Esta skill estabelece o protocolo oficial de engenharia, arquitetura, design visual, ciência de dados, rastreamento analítico e inteligência comercial para a criação de sites e plataformas web de alta conversão pela **ARKOS Soluções Digitais**.

---

## 1. Regra Fundamental de Diretório e Reprodutibilidade

1. **Isolamento de Projetos**:
   - Cada novo site de cliente **DEVE** ser criado em seu próprio diretório independente dentro da raiz do repositório:  
     `c:\repositorio\<NomeDoProjeto>` (ex: `c:\repositorio\Promisse`, `c:\repositorio\ESP_Consultoria`, etc.).
   - Nunca misture arquivos de clientes dentro do repositório institucional da ARKOS.
   - Cada projeto deve conter seu próprio `package.json`, `next.config.ts`, `.env.local`, `tsconfig.json`, `tailwind.config.ts` ou `src/app/globals.css`, pasta `public/assets/` e documentação de projeto.

2. **Stack Tecnológica Padrão ARKOS**:
   - **Framework**: Next.js 16 (App Router) + React 19 + TypeScript.
   - **Estilização**: CSS Modular / Vanilla CSS de alto padrão com Tokens e Design System ou TailwindCSS quando apropriado.
   - **Banco de Dados**: Supabase (PostgreSQL) com RLS, tabelas de leads, logs de cotações e agendamentos.
   - **Hospedagem & Deploy**: Vercel / Cloudflare com DNS seguro e SSL automático.
   - **Data Science & Rastreamento**: Google Tag Manager (GTM), Google Analytics 4 (GA4), Meta Pixel (Facebook/Instagram Ads) com dataLayer customizado.

---

## 2. O Método ARKOS em 10 Fases de Execução

Cada projeto executado por esta skill deve seguir rigidamente o ciclo de vida de engenharia:

### Fase 01 · Entendimento & Diagnóstico Profundo
- Extrair todos os dados do Briefing submetido no Supabase:
  * Nome da empresa, nicho de atuação e modelo de monetização.
  * Perfil da Persona (B2B / B2C), ticket médio e dores latentes.
  * **A Maior Objeção do Cliente**: O que impede o cliente de fechar imediatamente.
  * Proposta Única de Valor (UVP): O diferencial incomparável da empresa.

### Fase 02 · Pesquisa & Benchmarking do Nicho
- Mapear os 3 a 5 maiores concorrentes globais e nacionais do nicho.
- Identificar padrões de autoridade visual, termos de busca de alta intenção comercial e referências estéticas de ponta.

### Fase 03 · Estratégia Comercial & Arquitetura de Conversão
- Desenhar a jornada de persuasão e tomada de decisão:
  * **Hero Section**: Headline de alto impacto que prende o visitante em 3 segundos.
  * **Dores & Agitação**: Espelhamento da realidade do cliente.
  * **Solução & Autoridade**: Como a empresa resolve a dor com maestria.
  * **Quebra de Objeções**: Seção explícita de esclarecimento de dúvidas críticas.
  * **Prova Social & Autoridade**: Depoimentos, números, certificações e selos.
  * **Chamadas para Ação (CTAs)**: Ação primária (WhatsApp/Formulário) e ação secundária.

### Fase 04 · Desenho, Visual & Teoria das Cores
- Construir a paleta de cores exclusiva e alinhada à psicologia do nicho:
  * *Saúde/Clínicas*: Azul profundo, esmeralda, branco hospitalar e verde sinal.
  * *B2B/Tecnologia/Finanças*: Obsidiana, grafite, dourado sutil, verde sinal ou azul elétrico.
  * *Varejo/E-commerce*: Contrastes vibrantes com fundos limpos e foco no produto.
- Tipografia com personalidade via Google Fonts (`DM Serif Display`, `Inter`, `Plus Jakarta Sans`, `Outfit`, `DM Mono`).
- **Zero Imagens Genéricas**: Todas as fotos devem ser geradas em alta resolução via `generate_image`, retratando pessoas reais em ação, computadores com o tipo de site do cliente e estética cinematográfica.

### Fase 05 · Estrutura Técnica & Integrações
- Configurar formulário de qualificação dinâmico.
- Botão inteligente de WhatsApp com mensagem pré-preenchida com dados do lead.
- Integração de webhook ou API com Supabase para salvar leads em tempo real.
- Disparo de e-mail transacional (se aplicável).

### Fase 06 · Construção & Engenharia de Código Puro
- Desenvolvimento em Next.js App Router com Server e Client Components balanceados.
- Código limpo, componentizado, com tipagem estrita no TypeScript.
- Sem dependências pesadas de bibliotecas lentas.

### Fase 07 · Testes, Validação & Mobile First Real
- Trava total contra vazamento lateral de viewport (`overflow-x: hidden`, `width: 100%`, `touch-action: pan-y`).
- Botões e campos táteis otimizados para o polegar em celulares.
- Testes de renderização em telas Mobile (360px a 430px), Tablet (768px a 1024px) e Desktop (1280px a 1920px).

### Fase 08 · Publicação, Domínio & SSL
- Configuração de `metadataBase`, OpenGraph tags (imagem 1200x630 para WhatsApp/LinkedIn), Twitter Cards e Favicons em SVG e PNG.
- Build validado com TypeScript e ESLint zerados.

### Fase 09 · Acompanhamento, Data Science & Analytics
- Inserção de scripts assíncronos de GTM, GA4 e Meta Pixel no `<head>` com suporte a consentimento (LGPD).
- Disparo de eventos no `window.dataLayer`:
  * `lead_form_submitted` (com nicho e ticket).
  * `whatsapp_click` (com botão de origem).
  * `video_watched` / `scroll_depth_75`.
- Painel para o gestor consultar métricas de conversão e origem de tráfego.

### Fase 10 · Evolução Contínua & Expansão
- Estrutura modular preparada para adição de blog de conteúdo SEO, novas landing pages de campanhas específicas e portal de clientes.

---

## 3. Checklist Obrigatório de Entrega de Cada Site

- [ ] **Diretório**: Criado em `c:\repositorio\<NomeDoProjeto>`.
- [ ] **Mobile-First**: 100% testado sem overflow lateral ou corte de texto.
- [ ] **Visual**: Paleta de cores sofisticada, tipografia Google Fonts e imagens geradas sob medida.
- [ ] **Persuasão**: Headline de impacto, quebra de objeções e CTA claro.
- [ ] **Banco de Dados**: Leads salvos no Supabase com timestamp, dados do contato e status.
- [ ] **Rastreamento**: GA4 + Meta Pixel configurados via GTM.
- [ ] **WhatsApp**: Link direto com número e mensagem estratégica.
- [ ] **SEO**: Tags de OpenGraph, title descritivo, meta description persuasiva e dados estruturados Schema.org.
- [ ] **Build**: `npm run build` executando com zero erros.
