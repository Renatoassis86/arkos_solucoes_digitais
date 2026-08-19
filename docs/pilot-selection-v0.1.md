# ARKOS Digital Benchmark — Pilot Selection v0.1

```
Status: Pilot Selection — Pre-Measurement
Depends on: benchmark-intelligence-architecture-v0.2.md,
            benchmark-sampling-research-methodology-v0.1.md,
            benchmark-research-questions-v0.1.md,
            data/research/benchmark-candidate-universe-v0.1.csv,
            data/research/engineering-candidate-universe-v0.1.csv
```

## Nota metodológica — onde este documento se encaixa

```text
Candidate Universe → Sampling Frame → Pilot Study
```

```text
Sampling Frame → Sample Size Calculation → Research Sample
```

O Pilot NÃO substitui a Research Sample nem tem finalidade de inferência estatística populacional — serve para validar instrumentos, taxonomia, variáveis, coleta, classificação, rubrics, IA, evidência, medição de performance, medição de GitHub, missing data, custo, tempo e consistência. Resultados do piloto nunca devem ser chamados de Market Pattern, industry standard ou estatisticamente representativos.

Este documento seleciona subconjuntos dos dois universos de candidatos (`data/research/benchmark-candidate-universe-v0.1.csv`, 56 organizações; `data/research/engineering-candidate-universe-v0.1.csv`, 42 candidatos de engenharia) para validação de instrumento — não para produzir conclusões de mercado.

---

## Heurística de seleção — PILOT HEURISTIC, NOT SCIENTIFIC INDEX

```text
Reference Diversity + Evidence Quality + RQ Coverage (das 5 MVP RQs)
+ Geographic/Business Diversity + Pilot Feasibility − Redundancy Penalty
```

Esta heurística é uma ferramenta de julgamento qualitativo para priorização de piloto, **não um índice científico, não um score validado estatisticamente, e não deve ser citada como método de ranqueamento de qualidade digital em nenhum entregável ARKOS**. Redundancy Penalty penaliza candidatos que adicionam pouca informação nova ao conjunto (ex.: o quinto "SaaS B2B enterprise americano sales-led" tem menos valor marginal que o primeiro).

---

## Digital Experience Pilot

10 organizações selecionadas, cobrindo 5 verticais, 4 regiões, múltiplos modelos de negócio, múltiplos Reference Types e níveis de maturidade distintos — deliberadamente não uma grade rígida 2×5.

### 1. Duolingo
```
Vertical: Education/EdTech
Region: North America (USA)
Business Model: B2C, Subscription, Freemium, mobile-first
Reference Types: Digital Leader (TRUE), Design Reference (TRUE)
Why Selected: única empresa do universo com prêmio formal de design (Apple Design Award 2023) e GitHub org oficial ativa — evidência de alta qualidade rara no conjunto
RQs Supported: RQ-A1-02 (Hero Structures, app-like), RQ-A2-02 (Pricing Visibility, freemium), RQ-B-01 (TypeScript, org confirmada)
Evidence Quality: HIGH
Official Domain: duolingo.com
GitHub Relationship: github.com/duolingo (VERIFIED)
Risks/Limitations: GitHub org pequena (12 repositórios) — cobertura de Track B limitada em volume, ainda que de alta qualidade evidencial
```

### 2. iFood
```
Vertical: Services
Region: Latin America (Brazil)
Business Model: B2C/B2B2C, Marketplace, Transactional
Reference Types: Market Leader (TRUE)
Why Selected: domínio de mercado mais extremo e documentado do universo (80-89% share) — caso ideal para testar se dominância de mercado se traduz em qualidade digital superior (RQ-A3-01)
RQs Supported: RQ-A3-01 (Mobile Performance por Reference Type), RQ-A1-01 (Navigation Patterns em marketplace complexo)
Evidence Quality: HIGH
Official Domain: ifood.com.br
GitHub Relationship: não pesquisada nesta sessão (UNKNOWN)
Risks/Limitations: sem GitHub org confirmada — Track B para esta empresa ficaria como gap conhecido, não fabricado
```

### 3. Vercel
```
Vertical: Cross-industry Digital Leaders
Region: North America (USA)
Business Model: B2B, Platform, Product-led
Reference Types: Technology Reference (TRUE)
Why Selected: mantenedora do Next.js, framework de maior influência para produção frontend atual — ancora RQ-B-01 em um candidato de altíssima relevância técnica
RQs Supported: RQ-B-01 (TypeScript Prevalence), RQ-A1-01/A1-02 (site oficial como referência de navegação/hero em produto developer-first)
Evidence Quality: HIGH
Official Domain: vercel.com
GitHub Relationship: github.com/vercel/next.js (VERIFIED)
Risks/Limitations: relação entre vercel.com (propriedade digital) e o repositório next.js (produto de engenharia) é indireta — não confundir avaliação do framework com avaliação do site comercial
```

### 4. Shopify
```
Vertical: Cross-industry Digital Leaders
Region: North America (Canada)
Business Model: B2B2C, Platform, Product-led + Sales-led hybrid
Reference Types: Technology Reference (TRUE)
Why Selected: design system Polaris maduro (TypeScript-first, tokens, 60+ componentes) — candidato de altíssima qualidade evidencial para RQ-B-01 e RQ-B-03
RQs Supported: RQ-B-01 (TypeScript Prevalence), RQ-A2-02 (Pricing Visibility, modelo de planos públicos)
Evidence Quality: HIGH
Official Domain: shopify.com
GitHub Relationship: github.com/Shopify/polaris (VERIFIED)
Risks/Limitations: nenhuma crítica — um dos dossiês mais bem evidenciados do universo
```

### 5. 37signals / Basecamp — CONTRAST CASE
```
Vertical: Cross-industry Digital Leaders
Region: North America (USA)
Business Model: B2B, SaaS, Bootstrapped, deliberadamente anti-VC/anti-growth
Reference Types: Design Reference (TRUE), Technology Reference (TRUE) — Market Leader = FALSE (checado ativamente)
Why Selected: CONTRAST CASE — empresa pequena e bootstrapped, sem ambição de dominância de mercado, mas criadora do Ruby on Rails (usado por Shopify, GitHub, Airbnb, Coinbase); testa diretamente a hipótese "tamanho ≠ qualidade/influência de engenharia"
RQs Supported: RQ-B-01 (TypeScript Prevalence — Rails não é TypeScript, contraste relevante), RQ-A1-02 (Hero Structures — filosofia de design minimalista declarada)
Evidence Quality: HIGH
Official Domain: basecamp.com
GitHub Relationship: github.com/basecamp (VERIFIED)
Risks/Limitations: por ser pequena, alguns instrumentos de medição de performance/porte podem não se aplicar da mesma forma que a empresas maiores — declarar isso explicitamente na análise, não esconder
```

### 6. TOTVS — CONTRAST CASE
```
Vertical: Business/B2B
Region: Latin America (Brazil)
Business Model: B2B, Enterprise, Sales-led
Reference Types: Market Leader (TRUE, 50% Brasil / 32% LatAm) — Digital Leader = UNVERIFIED (não pesquisado a fundo)
Why Selected: CONTRAST CASE — maior empresa de tecnologia do Brasil por market share documentado, mas SEM evidência de reconhecimento de qualidade digital coletada nesta sessão; testa diretamente se "market leader" implica "digital leader" (hipótese central do projeto)
RQs Supported: RQ-A3-01 (Mobile Performance por Reference Type — comparação Market Leader vs. Digital Leader), RQ-A2-02 (Pricing Visibility em B2B enterprise sales-led)
Evidence Quality: MEDIUM
Official Domain: totvs.com
GitHub Relationship: não pesquisada nesta sessão (UNKNOWN)
Risks/Limitations: evidência de market leadership vem de fonte secundária (portalerp.com citando Gartner, não o relatório original) — recomenda-se confirmação direta no Pilot Measurement
```

### 7. Zoho CRM
```
Vertical: Sales/CRM/Revenue Technology
Region: Asia-Pacific (India)
Business Model: B2B, SaaS, Bootstrapped (não venture-backed)
Reference Types: Conversion Reference (TRUE, via transparência de pricing)
Why Selected: CRM indiano bootstrapped com pricing 100% público e granular — contraponto ao viés "Silicon Valley venture-backed" que domina o restante do universo; cobre região Asia-Pacific e modelo de negócio pouco representado (bootstrapped enterprise SaaS)
RQs Supported: RQ-A2-02 (Pricing Visibility — caso de altíssima transparência), RQ-A1-01 (Navigation Patterns em CRM enterprise)
Evidence Quality: MEDIUM
Official Domain: zoho.com
GitHub Relationship: não pesquisada nesta sessão (UNKNOWN)
Risks/Limitations: menor cobertura de imprensa internacional que concorrentes americanos — pode dificultar triangulação de evidência em ciclos futuros
```

### 8. Grab
```
Vertical: Services
Region: Asia-Pacific (Singapore)
Business Model: B2C/B2B2C, Marketplace, Transactional, super-app
Reference Types: Market Leader (TRUE, 55% mobilidade+delivery SEA)
Why Selected: único super-app do Sudeste Asiático no pilot — modelo de negócio (super-app) ausente em qualquer outra seleção; fecha a lacuna geográfica de Asia-Pacific continental (distinta de Índia/Zoho)
RQs Supported: RQ-A3-01 (Mobile Performance — super-apps são intrinsecamente mobile-heavy), RQ-A1-01 (Navigation Patterns em app com múltiplos verticais de serviço)
Evidence Quality: MEDIUM
Official Domain: grab.com
GitHub Relationship: não pesquisada nesta sessão (UNKNOWN)
Risks/Limitations: possível dificuldade de acesso/captura de app mobile-first com pouca superfície web tradicional — risco de missing data alto, declarar como tal, não forçar substituto
```

### 9. Booking.com
```
Vertical: Services
Region: Europe (Netherlands)
Business Model: B2C/B2B2C, Marketplace, Transactional (OTA)
Reference Types: Conversion Reference (TRUE)
Why Selected: caso mais documentado de cultura de experimentação/CRO do universo (múltiplas fontes independentes citam ~1.000 testes A/B concorrentes) — evidência direta e robusta para Conversion Reference; único representante europeu do vertical Services no pilot
RQs Supported: RQ-A2-02 (Pricing Visibility em travel/OTA), RQ-A1-05/A2-04 (mecanismos de confiança — fora do MVP mas relevante para ciclos futuros)
Evidence Quality: MEDIUM
Official Domain: booking.com
GitHub Relationship: não pesquisada nesta sessão (UNKNOWN)
Risks/Limitations: evidência de CRO vem de análises de terceiros sintetizando um case da Harvard Business Review, não o case original consultado diretamente
```

### 10. Khan Academy
```
Vertical: Education/EdTech
Region: North America (USA)
Business Model: Nonprofit, B2C + B2B2C institucional, gratuito
Reference Types: Technology Reference (TRUE, 472 repositórios públicos)
Why Selected: único candidato nonprofit do pilot — modelo de negócio (gratuito/nonprofit) estruturalmente diferente de todos os outros 9; maior footprint open-source verificado do universo inteiro, com design system próprio (Wonder Blocks), forte para validar RQ-B-01 num contexto não-comercial
RQs Supported: RQ-B-01 (TypeScript Prevalence), RQ-A1-01/A1-02 (site educacional gratuito como contraponto a produtos comerciais)
Evidence Quality: MEDIUM
Official Domain: khanacademy.org
GitHub Relationship: github.com/Khan (VERIFIED)
Risks/Limitations: 472 repositórios é volume alto demais para revisão manual completa — Pilot Measurement precisará de critério de amostragem dentro da própria org, não avaliar todos
```

---

## Digital Alternates

5 substitutos documentados para o caso de algum dos 10 principais se mostrar inviável (evidência insuficiente, bloqueio técnico, problema de ToS/legal, relação não verificável).

```
1. Gong — Sales/CRM/Revenue Technology, North America (USA), B2B enterprise sales-led
   Reference Type: Digital Leader + Innovation Reference (AI Breakthrough Award 2024)
   Substitui: Zoho CRM (caso pricing transparency não seja suficiente para MVP) — cobre a lacuna de Innovation Reference, ausente nos 10 principais
   Evidence Quality: MEDIUM

2. Mercado Livre / Mercado Pago — Services / Business/B2B, Latin America (Argentina), Marketplace + fintech
   Reference Type: Technology Reference (GitHub org confirmada, 101 repos; design system Andes documentado via Figma)
   Substitui: iFood ou TOTVS (caso um dos dois candidatos LatAm se mostre inviável)
   Evidence Quality: MEDIUM

3. Notion — Cross-industry Digital Leaders, North America (USA), B2C/B2B Product-led
   Reference Type: Digital Leader (Fast Company Most Innovative Companies 2025, #14)
   Substitui: Duolingo (caso de necessidade de segundo caso de Digital Leader com fonte editorial independente)
   Evidence Quality: MEDIUM

4. SAP — Business/B2B, Europe (Germany), B2B Enterprise Sales-led
   Reference Type: Technology Reference (múltiplos repositórios GitHub oficiais, Fiori design system)
   Substitui: TOTVS (contrast case alternativo de "market leader enterprise" com base europeia em vez de latino-americana)
   Evidence Quality: MEDIUM

5. Coupang — Services, Asia-Pacific (South Korea), B2C Marketplace
   Reference Type: Market Leader (22,5% e-commerce sul-coreano, fonte acadêmica peer-reviewed)
   Substitui: Grab (caso de dificuldade de captura de app mobile-first; Coupang tem superfície web mais tradicional)
   Evidence Quality: MEDIUM
```

---

## Engineering Pilot

15 candidatos selecionados do universo de 42, priorizando relevância frontend, diversidade de sinal de TypeScript, vínculo oficial com empresas (quando existente) e cobertura de design systems / ecosystem references.

```
1. Next.js (Vercel) — FRAMEWORK_OR_PLATFORM
   GitHub: github.com/vercel/next.js/
   Engineering Relevance: framework React dominante para produção; Turbopack (Rust) otimizado para JS/TS
   RQ-B-01 Relevance: ALTA — TypeScript confirmado como parte central do toolchain
   Official Status: VERIFIED (vínculo com Vercel/DC-0037)
   Evidence Quality: HIGH
   Risks/Limitations: nenhuma crítica relevante

2. TypeScript (Microsoft) — FRAMEWORK_OR_PLATFORM
   GitHub: github.com/microsoft/typescript
   Engineering Relevance: repositório da própria linguagem — âncora conceitual, não "amostra" de prevalência
   RQ-B-01 Relevance: MÁXIMA (é o objeto de estudo em si)
   Official Status: VERIFIED (vínculo com Microsoft/DC-0041)
   Evidence Quality: HIGH
   Risks/Limitations: não deve ser contado como "um repositório com TypeScript" da mesma forma que os demais — é referência de ecossistema, não amostra

3. React (Meta) — FRAMEWORK_OR_PLATFORM
   GitHub: github.com/facebook/react
   Engineering Relevance: biblioteca base do ecossistema frontend moderno
   RQ-B-01 Relevance: ALTA (indireta — grande parte do universo de design systems é construído sobre React)
   Official Status: VERIFIED; relationship_status: NOT_APPLICABLE (Meta não está na Parte A)
   Evidence Quality: HIGH

4. Vue.js (core) — FRAMEWORK_OR_PLATFORM
   GitHub: github.com/vuejs/core
   Engineering Relevance: segundo framework frontend mais relevante do universo; ecossistema independente (Evan You)
   RQ-B-01 Relevance: ALTA — contraponto ao domínio de React entre os design systems pesquisados
   Official Status: VERIFIED; relationship_status: NOT_APPLICABLE
   Evidence Quality: MEDIUM

5. Carbon Design System (IBM) — DESIGN_SYSTEM
   GitHub: github.com/carbon-design-system/carbon
   Engineering Relevance: design system enterprise multi-framework (React/Angular/Vue/Svelte/Web Components)
   RQ-B-01 Relevance: ALTA
   Official Status: VERIFIED (vínculo com IBM/DC-0040)
   Evidence Quality: HIGH

6. Vibe Design System (monday.com) — DESIGN_SYSTEM
   GitHub: github.com/mondaycom/vibe
   Engineering Relevance: design system oficial de empresa do Digital Pilot indireto (monday.com está no universo, não no pilot final)
   RQ-B-01 Relevance: ALTA (TypeScript confirmado, 50+ componentes)
   Official Status: VERIFIED (vínculo com monday.com/DC-0013)
   Evidence Quality: HIGH

7. React Spectrum (Adobe) — DESIGN_SYSTEM
   GitHub: github.com/adobe/react-spectrum
   Engineering Relevance: design system com foco explícito em acessibilidade
   RQ-B-01 Relevance: ALTA; também relevante para sinal de acessibilidade (fora do MVP, mas registrado)
   Official Status: VERIFIED (vínculo com Adobe/DC-0042)
   Evidence Quality: HIGH

8. Ant Design — DESIGN_SYSTEM / ECOSYSTEM_REFERENCE
   GitHub: github.com/ant-design/ant-design
   Engineering Relevance: um dos maiores design systems open source do mundo (~90.000 stars, tratado como metadata secundária)
   RQ-B-01 Relevance: ALTA — explicitamente descrito como TypeScript-first
   Official Status: VERIFIED; relationship_status: NOT_APPLICABLE (Ant Group não está na Parte A)
   Evidence Quality: HIGH

9. shadcn/ui — DESIGN_SYSTEM
   GitHub: github.com/shadcn-ui/ui
   Engineering Relevance: modelo de distribuição atípico (copy-paste de código-fonte, não dependência instalada) — relevante nota metodológica
   RQ-B-01 Relevance: ALTA
   Official Status: VERIFIED; relationship_status: NOT_APPLICABLE
   Evidence Quality: MEDIUM

10. Storybook — FRAMEWORK_OR_PLATFORM (tooling)
    GitHub: github.com/storybookjs/storybook
    Engineering Relevance: padrão de facto para desenvolvimento/documentação/teste de componentes isolados
    RQ-B-01 Relevance: MÉDIA (indireta); relevância direta para RQ-B-02/B-03 (fora do MVP, mas registrado)
    Official Status: VERIFIED; relationship_status: NOT_APPLICABLE
    Evidence Quality: HIGH

11. Khan Academy (org) — COMPANY_OFFICIAL
    GitHub: github.com/Khan
    Engineering Relevance: 472 repositórios; inclui Wonder Blocks (design system) e Perseus (exercise engine)
    RQ-B-01 Relevance: ALTA (par direto do Khan Academy no Digital Pilot)
    Official Status: VERIFIED (vínculo com Khan Academy/DC-0003)
    Evidence Quality: MEDIUM

12. Atlaskit (Atlassian) — DESIGN_SYSTEM
    Repositório: bitbucket.org/atlassian/atlaskit (NÃO GitHub)
    Engineering Relevance: design system de empresa relevante, mas hospedado fora do GitHub
    RQ-B-01 Relevance: MÉDIA — incluído deliberadamente para documentar a limitação "nem toda engenharia pública relevante está no GitHub"
    Official Status: VERIFIED; github_link_status: NOT_APPLICABLE
    Evidence Quality: MEDIUM

13. 37signals / Basecamp (org) — COMPANY_OFFICIAL
    GitHub: github.com/basecamp
    Engineering Relevance: mantenedora do Ruby on Rails; contraste não-TypeScript relevante
    RQ-B-01 Relevance: ALTA como caso de contraste (par direto do contrast case Basecamp no Digital Pilot)
    Official Status: VERIFIED (vínculo com 37signals/DC-0039)
    Evidence Quality: HIGH

14. Zendesk Garden (react-components) — DESIGN_SYSTEM
    GitHub: github.com/zendeskgarden/react-components
    Engineering Relevance: design system maduro com múltiplos pacotes (CSS/React)
    RQ-B-01 Relevance: ALTA
    Official Status: VERIFIED (vínculo com Zendesk/DC-0014)
    Evidence Quality: MEDIUM

15. Fluent UI (Microsoft) — DESIGN_SYSTEM
    GitHub: github.com/microsoft/fluentui
    Engineering Relevance: design system cross-platform de Big Tech, evolução do Office UI Fabric React
    RQ-B-01 Relevance: ALTA
    Official Status: VERIFIED (vínculo com Microsoft/DC-0041)
    Evidence Quality: HIGH
```

---

## Engineering Alternates

```
1. Radix UI — DESIGN_SYSTEM
   GitHub: github.com/radix-ui (URL inferida por padrão de nomenclatura, NÃO clicada/confirmada diretamente nesta sessão)
   Substitui: shadcn/ui (que é construído sobre Radix UI) — usar apenas após confirmação direta da URL da org
   Evidence Quality: LOW

2. Netflix (org) — COMPANY_OFFICIAL
   GitHub: github.com/Netflix
   Substitui: qualquer design system Big Tech caso um dos titulares apresente problema de acesso
   Evidence Quality: MEDIUM

3. Mercado Libre (org) — COMPANY_OFFICIAL
   GitHub: github.com/mercadolibre
   Substitui: Khan Academy (caso segundo candidato LatAm de engenharia seja necessário, pareado com o Digital Alternate Mercado Livre)
   Evidence Quality: MEDIUM

4. Coursera (org) — COMPANY_OFFICIAL
   GitHub: github.com/coursera
   Substitui: Khan Academy (caso segundo candidato EdTech de engenharia seja necessário, pareado com Digital Pilot Coursera)
   Evidence Quality: MEDIUM

5. GitHub Primer (css) — DESIGN_SYSTEM
   GitHub: github.com/primer/css
   Substitui: Zendesk Garden ou Fluent UI (design system adicional de referência de plataforma developer-first)
   Evidence Quality: MEDIUM
```

---

## Contrast Cases

Dois candidatos do Digital Pilot foram incluídos deliberadamente como contrast cases, testando a hipótese central do projeto de que "empresa grande/dominante ≠ automaticamente melhor experiência digital":

1. **37signals / Basecamp** — Design Reference e Technology Reference confirmados (criadora do Ruby on Rails, filosofia de design amplamente documentada), mas explicitamente **SEM** Market Leadership (`market_leader = FALSE`, checado ativamente): é uma empresa pequena, bootstrapped, deliberadamente anti-crescimento/anti-VC. Testa se qualidade/influência de engenharia pode existir independentemente de escala ou dominância de mercado.

2. **TOTVS** — Market Leader confirmado com evidência numérica forte (50% de market share no Brasil, 32% na América Latina em software de gestão), mas **SEM** evidência de Digital Leadership coletada nesta sessão (`digital_leader = UNVERIFIED`, não `FALSE` — não foi ativamente refutado, apenas não pesquisado a fundo). Testa diretamente se dominância de mercado documentada se traduz em reconhecimento de qualidade digital — a pergunta central de RQ-A3-01.

Estes dois casos foram escolhidos por representarem os dois lados opostos da mesma hipótese: um "pequeno mas influente" e um "grande mas digitalmente não verificado" — nenhum dos dois foi escolhido por ser "o melhor" ou "o pior", e sim por sua capacidade de gerar tensão informativa dentro do piloto.
