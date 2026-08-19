# ARKOS Digital Benchmark

## Research Questions & Hypothesis Framework v0.1

```
Status: Research Design Draft — Pre-Data Collection
Depends on: benchmark-intelligence-architecture-v0.1.md, v0.2.md,
            benchmark-sampling-research-methodology-v0.1.md
            (todos preservados, não alterados)
```

Este documento transforma o ARKOS Benchmark Intelligence em um programa estruturado de pesquisa. Nenhuma empresa foi selecionada, nenhum dado foi coletado, nenhuma API foi acessada. O objetivo é definir **o que perguntar antes de coletar**, não analisar sites.

---

## 1. Princípio

Toda coleta futura responde a uma pergunta registrada previamente — nunca o inverso.

```text
Business / Research Problem
        ↓
Research Question
        ↓
Population
        ↓
Unit of Analysis
        ↓
Variables
        ↓
Sampling Frame
        ↓
Sample Size
        ↓
Data Collection
        ↓
Analysis
        ↓
Evidence
        ↓
Pattern / Trend
        ↓
Insight
        ↓
Recommendation
```

Fluxo proibido, explicitamente evitado por este documento: `Collect everything → Search for interesting correlations → Call them insights` — exatamente o padrão que o Hypothesis Registry (metodologia v0.1 §17) e a distinção Exploratory/Confirmatory (§18) existem para impedir.

---

## 2. Estrutura dos Tracks

| Track | Foco |
|---|---|
| **A1 — Digital Experience & UX** | arquitetura da informação, navegação, hero, hierarquia visual, layout, responsividade, interação, confiança, mobile, acessibilidade, design systems observáveis, consistência |
| **A2 — Conversion & Business** | CTAs, pricing, lead generation, forms, conversion architecture, social proof, trust signals, jornadas de venda, PLG, self-service, contato, fricção |
| **A3 — Web Technology & Performance** | performance, Core Web Vitals, structured data, tecnologia observável, SEO técnico, security headers, sinais de acessibilidade automatizados, scripts de terceiros |
| **B — Open-Source Engineering** | linguagens, frameworks, TypeScript, package managers, monorepos, component libraries, design systems, testes, CI/CD, containers, documentação, governança |
| **C — Cross-Layer Intelligence** | associações entre Digital Experience ↔ Business/Conversion ↔ Technology ↔ Public Engineering Practices, somente para pares `VERIFIED` (metodologia v0.1 §31) |

**Regra herdada e reforçada aqui:** Company Open-Source Evidence ≠ Production Website Implementation, salvo evidência explícita de vínculo (metodologia v0.1 §3). Nenhuma associação Cross-Layer é interpretada como causalidade automaticamente (metodologia v0.1 §8, §16).

Verticais iniciais aplicáveis quando pertinente: Education/EdTech, Business/B2B, Sales/CRM/Revenue Technology, Services, Cross-industry Digital Leaders — nem toda RQ precisa comparar todos os verticais.

---

## 3. As 20 Research Questions Prioritárias

Distribuição: 5 A1 · 4 A2 · 4 A3 · 4 B · 3 C = 20. Distribuição mantida conforme solicitado — sem razão metodológica forte para alterá-la; é proporcional ao peso relativo de cada track na arquitetura já aprovada (Track A tem três subtracks porque concentra a maior parte da Benchmark Taxonomy de v0.2 §4).

Legenda dos campos de cada ficha: **RQ** · **Track** · **Pergunta** · **Por que importa** · **Relevância de negócio** · **Tipo de pesquisa** · **População-alvo** · **Unidade de análise** · **Variáveis primárias** · **Variáveis secundárias** · **Confundidores potenciais** · **Requisito amostral** · **Métodos estatísticos candidatos** · **Output esperado** · **Aplicação ARKOS** · **Prioridade** · **Complexidade** · **Disponibilidade de dado**.

---

### RQ-A1-01 — Navigation Patterns

| Campo | Conteúdo |
|---|---|
| Pergunta | Quais padrões de navegação (estrutura, profundidade, mega-menu vs. menu simples) aparecem com maior frequência entre experiências digitais maduras, e isso varia por modelo de negócio? |
| Por que importa | Navegação é a decisão de IA mais recorrente em qualquer projeto de website/portal da ARKOS — ter base empírica reduz debate subjetivo em discovery |
| Relevância de negócio | Aplica-se a praticamente todo projeto de website/portal/plataforma — alto reuso |
| Tipo de pesquisa | DESCRIPTIVE, COMPARATIVE |
| População-alvo | Digital properties de empresas nas 5 verticais iniciais |
| Unidade de análise | DigitalProperty (nível de navegação primária, não por página) |
| Variáveis primárias | navigation_type, navigation_items, mega_menu |
| Variáveis secundárias | business_model, vertical |
| Confundidores potenciais | tamanho do catálogo de produtos/serviços da empresa (afeta necessidade de mega-menu independente de "boa prática") |
| Requisito amostral | Research Sample (Layer 2), estratificado por business_model |
| Métodos estatísticos candidatos | contingency tables, chi-square |
| Output esperado | Sample Pattern (metodologia v0.1 §26) sobre prevalência de estruturas de navegação por modelo de negócio |
| Aplicação ARKOS | discovery de IA para novos projetos de website/portal; argumento de proposta |
| Prioridade | P0 |
| Complexidade | LOW |
| Disponibilidade de dado | HIGH — navegação é sempre publicamente visível |

---

### RQ-A1-02 — Hero Structures

| Campo | Conteúdo |
|---|---|
| Pergunta | Quais estruturas de hero (layout, presença de vídeo/imagem, CTA embutido, headline pattern) são mais recorrentes por modelo de negócio? |
| Por que importa | Hero é o elemento de maior impacto de primeira impressão e o mais citado em briefings de redesign |
| Relevância de negócio | Referência direta para propostas de landing page e redesign de home |
| Tipo de pesquisa | DESCRIPTIVE, COMPARATIVE |
| População-alvo | Homepages das empresas nas 5 verticais |
| Unidade de análise | PageVersion (página home) |
| Variáveis primárias | hero_type, primary_cta |
| Variáveis secundárias | business_model, vertical, video (presença) |
| Confundidores potenciais | maturidade/idade do site (redesigns recentes podem não refletir "padrão estabelecido", apenas tendência isolada) |
| Requisito amostral | Research Sample, estratificado por business_model |
| Métodos estatísticos candidatos | contingency tables, chi-square |
| Output esperado | Sample Pattern sobre estrutura de hero predominante por segmento |
| Aplicação ARKOS | referência de design para propostas de landing page/homepage |
| Prioridade | P0 |
| Complexidade | MEDIUM (hero_type provavelmente requer classificação assistida por IA — ver seção 12) |
| Disponibilidade de dado | HIGH |

---

### RQ-A1-03 — Mobile vs. Desktop Conversion Architecture

| Campo | Conteúdo |
|---|---|
| Pergunta | Existem diferenças sistemáticas entre desktop e mobile na arquitetura de conversão (tipo de CTA, mecanismo de contato)? |
| Por que importa | Decide se a ARKOS deve tratar mobile como "responsivo" ou desenhar jornada de conversão própria |
| Relevância de negócio | Direto para projetos com forte tráfego mobile (ex.: e-commerce, serviços locais) |
| Tipo de pesquisa | COMPARATIVE |
| População-alvo | Digital properties com captura em ambos ViewportProfiles (v0.2 §10) |
| Unidade de análise | PageVersion, pareado por viewport (mesma página, dois viewports) |
| Variáveis primárias | primary_cta, cta_category, chat (presença) |
| Variáveis secundárias | business_model |
| Confundidores potenciais | páginas mobile podem ser capturadas em estado diferente (menu colapsado) — risco de viés de medição, não de comportamento real |
| Requisito amostral | Research Sample, desenho pareado (mesma página, 2 viewports) |
| Métodos estatísticos candidatos | McNemar's test (dados pareados categóricos) |
| Output esperado | Comparative Finding sobre diferença mobile/desktop |
| Aplicação ARKOS | briefing de responsive design e mobile-first decisions |
| Prioridade | P1 |
| Complexidade | MEDIUM |
| Disponibilidade de dado | HIGH |

---

### RQ-A1-04 — Distribuição de Indicadores de Acessibilidade

| Campo | Conteúdo |
|---|---|
| Pergunta | Qual é a distribuição de indicadores automatizados de acessibilidade entre diferentes grupos (vertical, business model)? |
| Por que importa | Acessibilidade é frequentemente subestimada em propostas — dado comparativo fortalece argumento comercial e de compliance |
| Relevância de negócio | Suporta ofertas de auditoria de acessibilidade e compliance |
| Tipo de pesquisa | DESCRIPTIVE, COMPARATIVE |
| População-alvo | Digital properties nas 5 verticais |
| Unidade de análise | PageVersion |
| Variáveis primárias | accessibility_metrics (sinais automatizados) |
| Variáveis secundárias | vertical, business_model, technology_signals |
| Confundidores potenciais | ferramentas automatizadas de acessibilidade capturam só parte do WCAG (viés de instrumento, metodologia v0.1 §22) — resultado não deve ser lido como "acessibilidade real" |
| Requisito amostral | Research Sample, estratificado por vertical |
| Métodos estatísticos candidatos | ANOVA/Kruskal-Wallis entre verticais |
| Output esperado | Sample Pattern com limitação de instrumento explicitada |
| Aplicação ARKOS | ofertas de auditoria/consultoria de acessibilidade |
| Prioridade | P1 |
| Complexidade | LOW (ferramenta automatizada existente) |
| Disponibilidade de dado | HIGH |

---

### RQ-A1-05 — Mecanismos de Confiança na Jornada

| Campo | Conteúdo |
|---|---|
| Pergunta | Quais mecanismos de confiança (social proof) são mais utilizados e em qual ponto da jornada aparecem? |
| Por que importa | Informa estratégia de conteúdo/prova social em propostas de conversão |
| Relevância de negócio | Direto para CRO e content strategy |
| Tipo de pesquisa | DESCRIPTIVE |
| População-alvo | Digital properties nas 5 verticais |
| Unidade de análise | PageVersion |
| Variáveis primárias | social_proof (presença/tipo), case_studies |
| Variáveis secundárias | page_type (onde na jornada aparece), business_model |
| Confundidores potenciais | disponibilidade real de clientes citáveis (empresas B2B enterprise podem ter menos logos públicos por NDA, não por escolha de design) |
| Requisito amostral | Research Sample |
| Métodos estatísticos candidatos | contingency tables, frequência descritiva por page_type |
| Output esperado | Sample Pattern sobre posicionamento de social proof na jornada |
| Aplicação ARKOS | content strategy, CRO |
| Prioridade | P0 |
| Complexidade | LOW |
| Disponibilidade de dado | HIGH |

---

### RQ-A2-01 — Arquitetura de CTA por Modelo de Negócio

| Campo | Conteúdo |
|---|---|
| Pergunta | Como a arquitetura de CTA varia entre SaaS B2B, B2C, Services e EdTech? |
| Por que importa | CTA é o elemento de conversão mais citado em qualquer proposta de CRO |
| Relevância de negócio | Alto reuso — quase todo projeto ARKOS envolve decisão de CTA |
| Tipo de pesquisa | COMPARATIVE |
| População-alvo | Digital properties nas 5 verticais |
| Unidade de análise | PageVersion |
| Variáveis primárias | primary_cta, cta_category |
| Variáveis secundárias | secondary_cta, page_type |
| Confundidores potenciais | página de captura (home vs. pricing vs. produto) altera o CTA esperado independentemente do modelo de negócio — controlar por page_type |
| Requisito amostral | Research Sample, estratificado por business_model × page_type |
| Métodos estatísticos candidatos | chi-square, regressão logística multinomial (cta_category como DV) |
| Output esperado | Comparative Finding |
| Aplicação ARKOS | CRO, propostas de conversão |
| Prioridade | P0 |
| Complexidade | MEDIUM (cta_category exige taxonomia controlada + possível classificação por IA) |
| Disponibilidade de dado | HIGH |

---

### RQ-A2-02 — Visibilidade de Pricing

| Campo | Conteúdo |
|---|---|
| Pergunta | Qual percentual de empresas apresenta pricing público, e há associação entre modelo de negócio e visibilidade de pricing? |
| Por que importa | Decisão estratégica recorrente em projetos de pricing page/GTM |
| Relevância de negócio | Direto para sales engineering e GTM strategy |
| Tipo de pesquisa | DESCRIPTIVE, COMPARATIVE |
| População-alvo | Digital properties nas 5 verticais |
| Unidade de análise | Company (presença de pricing público é atributo de propriedade digital, não de página isolada) |
| Variáveis primárias | pricing_visible |
| Variáveis secundárias | business_model |
| Confundidores potenciais | empresas enterprise/sales-led frequentemente ocultam preço por estratégia comercial deliberada, não por "pior prática digital" — distinguir estratégia de omissão |
| Requisito amostral | Research Sample, proportion estimation por estrato de business_model |
| Métodos estatísticos candidatos | single/two-proportion estimation, chi-square |
| Output esperado | Sample Pattern / candidato a Market Pattern se Gate (metodologia v0.1 §27) for satisfeito |
| Aplicação ARKOS | GTM strategy, sales engineering |
| Prioridade | P0 |
| Complexidade | LOW |
| Disponibilidade de dado | HIGH |

---

### RQ-A2-03 — Mecanismos de Lead Generation

| Campo | Conteúdo |
|---|---|
| Pergunta | Quais mecanismos de lead generation (demo, trial, contact sales, free plan, assessment, newsletter, WhatsApp, consultation, calculator, interactive tool) predominam por vertical? |
| Por que importa | Orienta desenho de funil em projetos de geração de leads |
| Relevância de negócio | Direto para MarTech/SalesTech e propostas de funil |
| Tipo de pesquisa | DESCRIPTIVE, COMPARATIVE |
| População-alvo | Digital properties nas 5 verticais |
| Unidade de análise | PageVersion |
| Variáveis primárias | lead_gen_mechanism (taxonomia controlada) |
| Variáveis secundárias | vertical, business_model |
| Confundidores potenciais | mecanismos podem coexistir na mesma página (variável não é mutuamente exclusiva) — modelar como presença multi-label, não categoria única |
| Requisito amostral | Research Sample |
| Métodos estatísticos candidatos | frequência descritiva multi-label, chi-square por mecanismo individual |
| Output esperado | Sample Pattern |
| Aplicação ARKOS | funil de marketing, MarTech |
| Prioridade | P1 |
| Complexidade | MEDIUM |
| Disponibilidade de dado | HIGH |

---

### RQ-A2-04 — Arquitetura de Trust Signals

| Campo | Conteúdo |
|---|---|
| Pergunta | Como testimonials, customer logos, cases, ratings, awards, certificações de segurança e prova quantitativa são utilizados ao longo da jornada? |
| Por que importa | Aprofunda RQ-A1-05 com foco específico em mecanismos ligados a decisão de compra |
| Relevância de negócio | CRO, propostas comerciais, enterprise sales |
| Tipo de pesquisa | DESCRIPTIVE |
| População-alvo | Digital properties nas 5 verticais |
| Unidade de análise | PageVersion |
| Variáveis primárias | trust_mechanism (taxonomia: testimonial, logo, case, rating, award, certification, metric) |
| Variáveis secundárias | page_type, business_model |
| Confundidores potenciais | ver RQ-A1-05 (disponibilidade real de clientes citáveis) |
| Requisito amostral | Research Sample |
| Métodos estatísticos candidatos | frequência descritiva, contingency tables por page_type |
| Output esperado | Sample Pattern |
| Aplicação ARKOS | CRO, enterprise sales enablement |
| Prioridade | P1 |
| Complexidade | MEDIUM (trust_mechanism exige classificação semântica, possivelmente IA) |
| Disponibilidade de dado | HIGH |

---

### RQ-A3-01 — Distribuição de Performance Mobile/Desktop

| Campo | Conteúdo |
|---|---|
| Pergunta | Qual é a distribuição de performance (Core Web Vitals) entre mobile e desktop, e isso varia por grupo de referência (Market Leader vs. Digital Leader vs. Innovation Reference)? |
| Por que importa | Testa diretamente se "empresa grande" implica "site rápido" — desafia a suposição de que tamanho é proxy de qualidade técnica (v0.2 §3) |
| Relevância de negócio | Ofertas de performance/CRO |
| Tipo de pesquisa | DESCRIPTIVE, COMPARATIVE |
| População-alvo | Digital properties nas 5 verticais, com tag de Reference Type (v0.2 §3) |
| Unidade de análise | PageVersion (viewport pareado) |
| Variáveis primárias | performance_metrics (Core Web Vitals) |
| Variáveis secundárias | technology_signals |
| Confundidores potenciais | complexidade funcional da página (ex.: dashboard interativo vs. landing estática) afeta performance independentemente de "boa prática" |
| Requisito amostral | Research Sample, comparação entre grupos de Reference Type |
| Métodos estatísticos candidatos | ANOVA/Kruskal-Wallis, power analysis para comparação de 2+ grupos |
| Output esperado | Comparative Finding — reusa diretamente o exemplo de power analysis da metodologia v0.1 §9 |
| Aplicação ARKOS | ofertas de performance, argumento comercial contra "acreditar que grande = rápido" |
| Prioridade | P0 |
| Complexidade | LOW (ferramentas de medição já existem) |
| Disponibilidade de dado | HIGH |

---

### RQ-A3-02 — Prevalência de Tecnologias Detectáveis

| Campo | Conteúdo |
|---|---|
| Pergunta | Quais tecnologias/frameworks publicamente detectáveis predominam por vertical e modelo de negócio? |
| Por que importa | Base empírica para recomendações de stack em discovery técnico |
| Relevância de negócio | Technology Advisory, CTO as a Service |
| Tipo de pesquisa | DESCRIPTIVE |
| População-alvo | Digital properties nas 5 verticais |
| Unidade de análise | DigitalProperty |
| Variáveis primárias | technology_signals |
| Variáveis secundárias | vertical, business_model |
| Confundidores potenciais | detecção de tecnologia tem viés de instrumento — algumas stacks são mais fáceis de fingerprint que outras (metodologia v0.1 §22, technology-detection bias) |
| Requisito amostral | Research Sample |
| Métodos estatísticos candidatos | frequência descritiva, contingency tables |
| Output esperado | Sample Pattern, com viés de detecção explicitado |
| Aplicação ARKOS | Technology Advisory |
| Prioridade | P0 |
| Complexidade | LOW |
| Disponibilidade de dado | MEDIUM (depende de qualidade da ferramenta de fingerprint) |

---

### RQ-A3-03 — Third-Party Resources vs. Performance

| Campo | Conteúdo |
|---|---|
| Pergunta | Existe associação entre número de scripts/trackers/third-party resources e performance? |
| Por que importa | Argumento técnico direto para racionalizar stack de terceiros em projetos |
| Relevância de negócio | Ofertas de performance/technical debt audit |
| Tipo de pesquisa | COMPARATIVE, EXPLORATORY |
| População-alvo | Digital properties nas 5 verticais |
| Unidade de análise | PageVersion |
| Variáveis primárias | technology_signals (contagem de scripts de terceiros), performance_metrics |
| Variáveis secundárias | page_type |
| Confundidores potenciais | páginas com mais recursos costumam ser páginas funcionalmente mais ricas (ex.: checkout) — causa alternativa plausível para performance pior, não apenas volume de scripts |
| Requisito amostral | Research Sample |
| Métodos estatísticos candidatos | correlação, regressão linear (controlando page_type) |
| Output esperado | Association (metodologia v0.1 §33, linguagem de evidência) — **nunca causal** |
| Aplicação ARKOS | technical debt audits |
| Prioridade | P1 |
| Complexidade | MEDIUM |
| Disponibilidade de dado | MEDIUM |

---

### RQ-A3-04 — Sinais Técnicos de SEO

| Campo | Conteúdo |
|---|---|
| Pergunta | Qual a prevalência de sinais técnicos de SEO (structured data, metadata completo) entre grupos? |
| Por que importa | Base para ofertas de SEO técnico |
| Relevância de negócio | Growth Technology, SEO |
| Tipo de pesquisa | DESCRIPTIVE |
| População-alvo | Digital properties nas 5 verticais |
| Unidade de análise | PageVersion |
| Variáveis primárias | structured_data |
| Variáveis secundárias | vertical, page_type |
| Confundidores potenciais | presença de structured data não implica qualidade/correção do markup — mede presença, não corretude |
| Requisito amostral | Research Sample |
| Métodos estatísticos candidatos | frequência descritiva |
| Output esperado | Sample Pattern |
| Aplicação ARKOS | ofertas de SEO técnico |
| Prioridade | P2 |
| Complexidade | LOW |
| Disponibilidade de dado | HIGH |

---

### RQ-B-01 — Prevalência de TypeScript

| Campo | Conteúdo |
|---|---|
| Pergunta | Qual a prevalência de TypeScript em projetos frontend públicos maduros, e isso varia por tipo de repositório (design system vs. aplicação geral)? |
| Por que importa | Referência direta para decisões de stack em propostas de engenharia |
| Relevância de negócio | Software Architecture, Technology Advisory, CTO as a Service |
| Tipo de pesquisa | DESCRIPTIVE, COMPARATIVE |
| População-alvo | Repositórios elegíveis (metodologia v0.1 §11) das organizações do Benchmark Core |
| Unidade de análise | Repository |
| Variáveis primárias | typescript (presença/uso) |
| Variáveis secundárias | repository_type, primary_language |
| Confundidores potenciais | idade do repositório (projetos mais antigos podem ainda estar em JS puro por legado, não por escolha atual) |
| Requisito amostral | Engineering Sample |
| Métodos estatísticos candidatos | proportion estimation, chi-square (TS presence × repository_type) |
| Output esperado | Sample Pattern |
| Aplicação ARKOS | argumento de proposta técnica, CTO as a Service |
| Prioridade | P0 |
| Complexidade | LOW |
| Disponibilidade de dado | HIGH — detectável via manifest público (`package.json`/config) |

---

### RQ-B-02 — Estratégias de Teste

| Campo | Conteúdo |
|---|---|
| Pergunta | Quais estratégias de teste (unit/integration/E2E) aparecem com maior frequência em repositórios elegíveis? |
| Por que importa | Referência para padrão de qualidade de engenharia recomendado a clientes |
| Relevância de negócio | Engineering governance, QA advisory |
| Tipo de pesquisa | DESCRIPTIVE, COMPARATIVE |
| População-alvo | Repositórios elegíveis |
| Unidade de análise | Repository |
| Variáveis primárias | unit_tests, integration_tests, e2e_tests (presença) |
| Variáveis secundárias | repository_type |
| Confundidores potenciais | presença de diretório de teste não garante cobertura real — mede presença estrutural, não qualidade/cobertura |
| Requisito amostral | Engineering Sample |
| Métodos estatísticos candidatos | proportion estimation, chi-square |
| Output esperado | Sample Pattern |
| Aplicação ARKOS | QA advisory, propostas de engenharia |
| Prioridade | P1 |
| Complexidade | MEDIUM |
| Disponibilidade de dado | MEDIUM |

---

### RQ-B-03 — Características de Design Systems Open-Source Maduros

| Campo | Conteúdo |
|---|---|
| Pergunta | Quais características (Storybook, component library, tokens, documentação) aparecem em design systems open-source maduros? |
| Por que importa | Referência direta para propostas de design system da ARKOS |
| Relevância de negócio | Design System Specialist, propostas de design system |
| Tipo de pesquisa | DESCRIPTIVE |
| População-alvo | Repositórios elegíveis classificados como design_system |
| Unidade de análise | Repository |
| Variáveis primárias | storybook, component_library, design_system |
| Variáveis secundárias | documentation |
| Confundidores potenciais | "maduro" precisa de definição operacional (ver seção 11 — REQUIRES RUBRIC parcial via last_activity + release_strategy) |
| Requisito amostral | Engineering Sample, subconjunto design_system=true |
| Métodos estatísticos candidatos | frequência descritiva |
| Output esperado | Reference Practice (metodologia v0.1 §26) |
| Aplicação ARKOS | propostas de design system |
| Prioridade | P1 |
| Complexidade | MEDIUM |
| Disponibilidade de dado | MEDIUM |

---

### RQ-B-04 — Prevalência de Governança de Engenharia

| Campo | Conteúdo |
|---|---|
| Pergunta | Qual a prevalência de CI/CD, SECURITY.md, CONTRIBUTING, CODEOWNERS e automação de release entre os repositórios elegíveis? |
| Por que importa | Referência para maturidade de governança de engenharia recomendada |
| Relevância de negócio | Engineering governance, CTO as a Service |
| Tipo de pesquisa | DESCRIPTIVE |
| População-alvo | Repositórios elegíveis |
| Unidade de análise | Repository |
| Variáveis primárias | ci_cd, security_policy, contribution_guide, codeowners |
| Variáveis secundárias | release_strategy |
| Confundidores potenciais | repositórios internos de empresa podem ter governança forte não visível publicamente (o que é medido é governança *pública*, não real) |
| Requisito amostral | Engineering Sample |
| Métodos estatísticos candidatos | frequência descritiva |
| Output esperado | Sample Pattern |
| Aplicação ARKOS | CTO as a Service, engineering governance |
| Prioridade | P2 |
| Complexidade | LOW |
| Disponibilidade de dado | HIGH |

---

### RQ-C-01 — Design System Maturity × Consistência Visual

| Campo | Conteúdo |
|---|---|
| Pergunta | Organizações com design systems públicos maduros apresentam maior consistência visual observável em suas propriedades digitais? |
| Por que importa | Testa se investimento em design system público se reflete na experiência real do cliente — argumento comercial forte para venda de design systems, se sustentado |
| Relevância de negócio | Venda de projetos de design system |
| Tipo de pesquisa | CROSS-LAYER, COMPARATIVE, EXPLORATORY |
| População-alvo | Empresas com vínculo `VERIFIED` entre Company e GitHub Organization (metodologia v0.1 §31) |
| Unidade de análise | Company |
| Variáveis primárias | design_system (maturidade, Track B), visual_consistency (Track A — **REQUIRES RUBRIC**, ver seção 11) |
| Variáveis secundárias | vertical |
| Confundidores potenciais | tamanho da empresa pode causar tanto design system maduro quanto recursos para consistência visual (confundidor comum, não testado por esta RQ isoladamente) |
| Requisito amostral | subconjunto de Engineering Sample × Research Sample com vínculo VERIFIED — provavelmente pequeno no MVP |
| Métodos estatísticos candidatos | correlação (após rubric de visual_consistency estar calibrado) |
| Output esperado | Association, explicitamente rotulada **não-causal** |
| Aplicação ARKOS | argumento comercial para design systems, com ressalva de confundidor de tamanho |
| Prioridade | P1 |
| Complexidade | HIGH |
| Disponibilidade de dado | LOW — depende de pares VERIFIED suficientes, que provavelmente não existem em volume no MVP |

---

### RQ-C-02 — Engenharia Pública × Performance/Acessibilidade

| Campo | Conteúdo |
|---|---|
| Pergunta | Há associação observável entre maturidade das práticas públicas de engenharia (Track B) e performance/acessibilidade da experiência digital (Track A)? |
| Por que importa | Testaria se sinais de engenharia pública são proxy útil de qualidade técnica do produto — valioso, mas altamente exploratório |
| Relevância de negócio | Technology Advisory — se confirmado, vira heurística rápida de triagem em discovery |
| Tipo de pesquisa | CROSS-LAYER, EXPLORATORY |
| População-alvo | Empresas com vínculo `VERIFIED` |
| Unidade de análise | Company |
| Variáveis primárias | engineering_maturity (Track B — **REQUIRES RUBRIC**), performance_metrics, accessibility_metrics |
| Variáveis secundárias | technology_signals |
| Confundidores potenciais | equipe de engenharia de produto (que constrói o site comercial) é frequentemente diferente da equipe que mantém repositórios open-source — o vínculo causal entre as duas nem sequer é plausível a priori sem essa checagem |
| Requisito amostral | mesmo subconjunto restrito de RQ-C-01 |
| Métodos estatísticos candidatos | correlação exploratória |
| Output esperado | Emerging Signal, explicitamente não-causal e não-confirmatório |
| Aplicação ARKOS | hipótese de triagem rápida, se sustentada em ciclos futuros |
| Prioridade | P2 |
| Complexidade | VERY_HIGH |
| Disponibilidade de dado | LOW |

---

### RQ-C-03 — Digital Leaders: Padrões Simultâneos

| Campo | Conteúdo |
|---|---|
| Pergunta | Empresas classificadas como Digital Leaders apresentam simultaneamente padrões distintos de UX, conversão e engenharia pública, ou a classificação captura dimensões independentes? |
| Por que importa | Testa se "Digital Leader" (v0.2 §3) é um construto coerente ou uma etiqueta que mistura fenômenos não relacionados |
| Relevância de negócio | Valida (ou refuta) a própria taxonomia de categorização usada em todo o programa — meta-relevância metodológica alta |
| Tipo de pesquisa | CROSS-LAYER, EXPLORATORY |
| População-alvo | Benchmark Core (todas as categorias de Reference Type) |
| Unidade de análise | Company |
| Variáveis primárias | Assessment scores por dimensão da taxonomia (UX, Conversion, Engineering — via Track B quando VERIFIED) |
| Variáveis secundárias | Reference Type tags (v0.2 §3) |
| Confundidores potenciais | tamanho de amostra do Benchmark Core (~10-20) é pequeno demais para qualquer inferência estatística formal — este é essencialmente um estudo qualitativo/descritivo, não confirmatório |
| Requisito amostral | Benchmark Core inteiro — não é Research Sample |
| Métodos estatísticos candidatos | análise descritiva multivariada qualitativa; nenhum teste de hipótese formal dado o n pequeno |
| Output esperado | Exploratory Pattern Discovery — gera hipóteses para ciclos futuros, não conclusão |
| Aplicação ARKOS | validação da própria metodologia de categorização |
| Prioridade | P2 |
| Complexidade | HIGH |
| Disponibilidade de dado | MEDIUM (dentro do Benchmark Core, mas pequeno) |

---

## 4. Hipóteses Candidatas

Das 20 RQs, apenas as comparativas com desenho testável justificam hipótese formal. Nenhuma hipótese óbvia ou circular foi incluída (ex.: "sites melhores têm UX melhor" foi descartada por não ser falsificável de forma útil). Todas com status inicial **CANDIDATE — NOT REGISTERED** — nenhuma é considerada pré-registrada até que o Hypothesis Registry (metodologia v0.1 §17) seja formalmente populado na execução.

### H-01 — Conversão Mobile vs. Desktop
```text
Related RQ: RQ-A1-03
Population: Digital properties do Research Sample, páginas capturadas em ambos viewports
Unit of Analysis: PageVersion (par mobile/desktop)
Independent Variable: viewport (mobile | desktop)
Dependent Variable: cta_category (mecanismo de conversão predominante)
H0: a distribuição de cta_category é a mesma entre mobile e desktop
H1: a distribuição de cta_category difere entre mobile e desktop (ex.: maior prevalência de click-to-call/WhatsApp em mobile)
Expected Effect: direção não assumida a priori — pergunta aberta
Potential Confounders: menu/CTA colapsado em mobile pode subestimar opções realmente disponíveis
Candidate Test: McNemar's test
Power Analysis Required: sim
Status: CANDIDATE — NOT REGISTERED
```

### H-02 — CTA por Modelo de Negócio
```text
Related RQ: RQ-A2-01
Population: Research Sample
Unit of Analysis: PageVersion
Independent Variable: business_model (SaaS B2B | B2C)
Dependent Variable: cta_category
H0: cta_category é distribuído da mesma forma entre SaaS B2B e B2C
H1: SaaS B2B apresenta maior prevalência de CTAs de "demo"/"contact sales"; B2C maior prevalência de "buy"/"sign up"
Expected Effect: médio-alto (diferença estrutural plausível de modelo de venda)
Potential Confounders: page_type não controlado pode confundir (uma pricing page tem CTA diferente de uma home independente do modelo)
Candidate Test: regressão logística multinomial, controlando page_type
Power Analysis Required: sim
Status: CANDIDATE — NOT REGISTERED
```

### H-03 — Modelo de Negócio × Visibilidade de Pricing
```text
Related RQ: RQ-A2-02
Population: Research Sample
Unit of Analysis: Company
Independent Variable: business_model (B2B enterprise/sales-led | B2C/self-serve)
Dependent Variable: pricing_visible (binário)
H0: a proporção de pricing público é igual entre os dois grupos
H1: empresas B2B enterprise/sales-led apresentam menor proporção de pricing público que empresas self-serve/B2C
Expected Effect: alto (prática comercial amplamente reportada informalmente, mas nunca testada com dado próprio da ARKOS)
Potential Confounders: definição de "enterprise/sales-led" precisa ser operacionalizada de forma não circular em relação à própria variável dependente
Candidate Test: two-proportion z-test / chi-square
Power Analysis Required: sim
Status: CANDIDATE — NOT REGISTERED
```

### H-04 — Lead Generation: EdTech vs. B2B SaaS
```text
Related RQ: RQ-A2-03
Population: Research Sample, subconjunto EdTech e B2B SaaS
Unit of Analysis: Company
Independent Variable: vertical (EdTech | B2B SaaS)
Dependent Variable: lead_gen_mechanism predominante
H0: a distribuição de mecanismos de lead generation é igual entre os dois verticais
H1: EdTech apresenta maior prevalência de "assessment"/"free trial de curso"; B2B SaaS maior prevalência de "demo"/"contact sales"
Expected Effect: médio
Potential Confounders: sazonalidade de captura (ex.: período de matrícula em EdTech pode alterar temporariamente o mecanismo em destaque)
Candidate Test: chi-square
Power Analysis Required: sim
Status: CANDIDATE — NOT REGISTERED
```

### H-05 — Performance Mobile: Digital Leaders vs. Market Leaders
```text
Related RQ: RQ-A3-01
Population: Research Sample, subconjunto com tag de Reference Type
Unit of Analysis: PageVersion (viewport mobile)
Independent Variable: reference_type (Digital Leader | Market Leader)
Dependent Variable: performance_metrics (Core Web Vitals agregado)
H0: não há diferença de performance mobile entre os dois grupos
H1: Digital Leaders apresentam performance mobile superior a Market Leaders
Expected Effect: pequeno-médio — hipótese deliberadamente desenhada para desafiar a suposição "grande = melhor" (v0.2 §3)
Potential Confounders: complexidade funcional da página não controlada
Candidate Test: t-test/Mann-Whitney, com power analysis prévio (mesmo exemplo da metodologia v0.1 §9)
Power Analysis Required: sim
Status: CANDIDATE — NOT REGISTERED
```

### H-06 — Third-Party Scripts × Performance
```text
Related RQ: RQ-A3-03
Population: Research Sample
Unit of Analysis: PageVersion
Independent Variable: contagem de third-party scripts/trackers
Dependent Variable: performance_metrics
H0: não há correlação entre contagem de scripts de terceiros e performance
H1: há correlação negativa entre contagem de scripts de terceiros e performance
Expected Effect: médio (plausível tecnicamente, mas não deve ser lido como causal — seção 8 da metodologia)
Potential Confounders: page_type (páginas funcionalmente ricas têm mais scripts E naturalmente performance pior, por razões não relacionadas a "excesso" de terceiros)
Candidate Test: correlação de Spearman/Pearson, regressão controlando page_type
Power Analysis Required: não (correlação, não comparação de grupos) — mas cálculo de n para intervalo de confiança da correlação, sim
Status: CANDIDATE — NOT REGISTERED
```

### H-07 — TypeScript: Design System vs. Aplicação Geral
```text
Related RQ: RQ-B-01
Population: Engineering Sample
Unit of Analysis: Repository
Independent Variable: repository_type (design_system | general_application)
Dependent Variable: typescript (presença)
H0: a prevalência de TypeScript é igual entre os dois tipos de repositório
H1: repositórios de design system apresentam maior prevalência de TypeScript que aplicações gerais
Expected Effect: médio-alto (design systems tendem a priorizar tipagem por serem consumidos por terceiros)
Potential Confounders: idade do repositório
Candidate Test: chi-square / two-proportion z-test
Power Analysis Required: sim
Status: CANDIDATE — NOT REGISTERED
```

### H-08 — Testes E2E: Design System vs. Aplicação Geral
```text
Related RQ: RQ-B-02
Population: Engineering Sample
Unit of Analysis: Repository
Independent Variable: repository_type (design_system | general_application)
Dependent Variable: e2e_tests (presença)
H0: a prevalência de testes E2E é igual entre os dois tipos de repositório
H1: aplicações gerais apresentam maior prevalência de testes E2E que design systems (hipótese de direção oposta a H-07 — design systems investem mais em tipagem, aplicações mais em E2E, por natureza do risco de cada um)
Expected Effect: pequeno-médio
Potential Confounders: maturidade/atividade do repositório
Candidate Test: chi-square
Power Analysis Required: sim
Status: CANDIDATE — NOT REGISTERED
```

---

## 5. MVP Research Set — 5 Perguntas do Primeiro Ciclo

Critérios de seleção: Business Value, Scientific Value, Data Availability, Collection Cost, Automation Potential, Statistical Feasibility, Cross-sector Usefulness — equilíbrio entre valor e viabilidade, não apenas as mais fáceis.

| # | RQ | Track | Justificativa em uma frase |
|---|---|---|---|
| 1 | **RQ-A1-01** — Navigation Patterns | UX | Aplica-se a praticamente todo projeto ARKOS de website/portal, baixa complexidade, alta disponibilidade de dado — melhor razão valor/custo do conjunto |
| 2 | **RQ-A1-02** — Hero Structures | UX | Segundo maior reuso comercial (propostas de landing/home), valida também a classificação assistida por IA (hero_type) num caso de complexidade moderada controlada |
| 3 | **RQ-A2-02** — Pricing Visibility | Conversion | Proportion estimation simples, alta disponibilidade, testa diretamente uma crença comercial não verificada (H-03) com alto valor de GTM |
| 4 | **RQ-A3-01** — Mobile Performance por Reference Type | Technology | Desafia diretamente a suposição "empresa grande = melhor prática" central à filosofia ARKOS (v0.2 §3), ferramental de medição já maduro |
| 5 | **RQ-B-01** — TypeScript Prevalence | Engineering | Garante presença do Track B no primeiro ciclo com o RQ de menor complexidade/maior disponibilidade de dado da track, testável via manifest público |

Critérios de cobertura atendidos: ≥1 UX (2), ≥1 Conversion (1), ≥1 Technology (1), ≥1 Engineering (1). **Cross-Layer (Track C) deliberadamente excluído do MVP** — pares `VERIFIED` entre Company e GitHub Organization ainda não existem em volume suficiente (nenhuma empresa foi selecionada até este documento), conforme previsto na seção 21 do prompt-fonte deste gate.

---

## 6. Fichas Expandidas — MVP Research Set

### RQ-A1-01 — Navigation Patterns
```text
Decision Supported: padrão de IA a recomendar em discovery de novos projetos de website/portal
Population: digital properties das 5 verticais iniciais, dentro do sampling frame a definir (metodologia v0.1 §29)
Sampling Frame Requirements: diretório/lista setorial declarada, com vieses documentados (metodologia v0.1 §22)
Unit of Analysis: DigitalProperty
Variables: navigation_type, navigation_items, mega_menu, business_model, vertical
Measurement Method: observação estrutural direta do menu principal na captura (sem necessidade de IA)
Potential Data Sources: capture de homepage (Weekly/Research Sample capture, v0.2 §9)
Missing Data Risks: navegação renderizada via JS pode falhar em captura simplificada — risco FAILED, não FALSE (metodologia v0.1 §21)
Bias Risks: US-centric/large-company bias se o sampling frame não for diversificado (metodologia v0.1 §22)
Expected Analysis: contingency table navigation_type × business_model, chi-square
Sample Size Method: proportion/comparison estimation — ver seção 7
Automation Level: alto (extração estrutural automatizável)
Human Review Requirement: baixo — apenas amostra de auditoria para validar extração automática
Estimated Relative Cost: LOW
Expected ARKOS Deliverable: Sample Pattern de referência para discovery de IA, citável em propostas
```

### RQ-A1-02 — Hero Structures
```text
Decision Supported: referência de design para propostas de landing page/homepage
Population: mesma de RQ-A1-01
Sampling Frame Requirements: idem
Unit of Analysis: PageVersion (home)
Variables: hero_type, primary_cta, video (presença), business_model
Measurement Method: hero_type requer classificação assistida por IA (taxonomia controlada pré-definida) + amostra de revisão humana
Potential Data Sources: screenshot da captura + DOM/texto do hero
Missing Data Risks: hero com carrossel dinâmico pode gerar captura inconsistente entre execuções — declarar snapshot_validity (metodologia v0.1 §23)
Bias Risks: technology-detection bias não se aplica aqui, mas classificação por IA introduz risco de viés do modelo — mitigado por revisão humana amostral
Expected Analysis: contingency table hero_type × business_model
Sample Size Method: proportion estimation por categoria de hero_type — ver seção 7
Automation Level: médio (IA + revisão humana amostral)
Human Review Requirement: médio — validação de amostra de classificações de IA (AIAnalysisRun, v0.2 §17)
Estimated Relative Cost: MEDIUM
Expected ARKOS Deliverable: Sample Pattern + biblioteca de referência visual para propostas
```

### RQ-A2-02 — Pricing Visibility
```text
Decision Supported: argumento de GTM strategy sobre visibilidade de pricing por modelo de negócio
Population: mesma de RQ-A1-01
Sampling Frame Requirements: idem, com atenção a garantir representação de ambos B2B enterprise e self-serve
Unit of Analysis: Company
Variables: pricing_visible, business_model
Measurement Method: observação binária direta (presença de página/seção de pricing com valores)
Potential Data Sources: capture de página de pricing (se existir) ou ausência confirmada dela
Missing Data Risks: empresa pode ter pricing atrás de login parcial — classificar como `NOT_APPLICABLE` vs. `FALSE` conforme definição operacional prévia (metodologia v0.1 §21)
Bias Risks: SaaS bias (SaaS tende a supervalorizar amostra se o sampling frame for enviesado para tech) — declarar explicitamente
Expected Analysis: proportion estimation por estrato de business_model, two-proportion z-test para H-03
Sample Size Method: single proportion estimation (RQ) / two-group comparison (H-03) — ver seção 7
Automation Level: alto
Human Review Requirement: baixo
Estimated Relative Cost: LOW
Expected ARKOS Deliverable: Sample Pattern citável em propostas de GTM/pricing strategy
```

### RQ-A3-01 — Mobile Performance por Reference Type
```text
Decision Supported: argumento comercial de que Reference Type (não tamanho) prediz qualidade técnica
Population: Research Sample com Reference Type já taggeado (depende de execução da Benchmark Candidate Selection Matrix, v0.2 §27, ao menos parcialmente)
Sampling Frame Requirements: precisa de cobertura mínima em pelo menos dois Reference Types (Market Leader, Digital Leader) para comparação válida
Unit of Analysis: PageVersion (viewport mobile)
Variables: performance_metrics, reference_type
Measurement Method: ferramenta de medição de Core Web Vitals (não instalada nesta etapa)
Potential Data Sources: captura mobile via ViewportProfile mobile_standard_v1 (v0.2 §10)
Missing Data Risks: falha de medição em sites com proteção anti-bot agressiva — `FAILED`, reportado como taxa, não descartado silenciosamente
Bias Risks: survivorship bias (sites com pior performance podem estar sub-representados em rankings usados como sampling frame)
Expected Analysis: comparação de médias/medianas entre grupos, t-test ou Mann-Whitney conforme distribuição
Sample Size Method: two-group comparison com power analysis — ver seção 7
Automation Level: alto
Human Review Requirement: baixo
Estimated Relative Cost: LOW-MEDIUM
Expected ARKOS Deliverable: Comparative Finding, argumento comercial diferenciado da ARKOS
```

### RQ-B-01 — TypeScript Prevalence
```text
Decision Supported: argumento técnico em propostas de engenharia/CTO as a Service
Population: repositórios elegíveis das organizações vinculadas (VERIFIED ou UNVERIFIED documentado) às empresas do Benchmark Core/Research Sample
Sampling Frame Requirements: lista de organizações GitHub elegíveis (metodologia v0.1 §30) — não definida nesta etapa
Unit of Analysis: Repository
Variables: typescript, repository_type, primary_language
Measurement Method: leitura de manifest público (ex.: `tsconfig.json`, extensões de arquivo predominantes) — via GitHub API, não executada nesta etapa
Potential Data Sources: GitHub API (metadata pública)
Missing Data Risks: repositório pode estar arquivado/sem atividade recente — já coberto por critério de elegibilidade (metodologia v0.1 §11), não é missing, é exclusão
Bias Risks: GitHub open-source bias — nem toda boa engenharia é pública (metodologia v0.1 §22); resultado vale para "engenharia pública", não para "engenharia real da empresa"
Expected Analysis: proportion estimation, chi-square contra repository_type
Sample Size Method: single/two-proportion estimation — ver seção 7
Automation Level: alto (metadata via API)
Human Review Requirement: baixo — apenas amostra de auditoria de classificação de repository_type
Estimated Relative Cost: LOW
Expected ARKOS Deliverable: Sample Pattern citável em propostas de engenharia
```

---

## 7. Sample Size — Método, Não Número

Nenhum `n` definitivo é calculado nesta etapa (metodologia v0.1 §8 e §34) — apenas o método aplicável a cada MVP RQ.

```text
RQ-A1-01 / RQ-A1-02 (proporções por categoria)
Method: single proportion estimation, por categoria de navigation_type/hero_type
Requires: N (tamanho do sampling frame por vertical), confidence level, margin of error, expected p
Possible conservative assumption: p = 0.5 por categoria (superestima n necessário)
Final n: NOT YET CALCULATED

RQ-A2-02 (proporção geral + comparação H-03)
Method: single proportion estimation (RQ) + two-proportion z-test (H-03)
Requires: N, confidence level, margin of error, expected p; para H-03 também alpha e power
Possible conservative assumption: p = 0.5
Final n: NOT YET CALCULATED

RQ-A3-01 (comparação de 2 grupos)
Method: two-group power analysis
Requires: alpha, power, expected effect size (Core Web Vitals, desvio-padrão esperado), group allocation
Final n: NOT YET CALCULATED

RQ-B-01 (proporção + comparação por repository_type)
Method: single proportion estimation + two-proportion z-test
Requires: N (tamanho do universo de repositórios elegíveis), confidence level, margin of error, expected p
Possible conservative assumption: p = 0.5
Final n: NOT YET CALCULATED
```

---

## 8. Variable Registry

Consolida as variáveis citadas nas 20 RQs, evitando duplicação semântica com os dicionários já existentes na metodologia v0.1 §13–§14 (reaproveitados, não redefinidos) e adicionando apenas variáveis novas introduzidas por este documento.

| Variável | Definição | Track | Tipo de dado | Nível de mensuração | Coleta | Potencial de automação | Validação humana | Prioridade |
|---|---|---|---|---|---|---|---|---|
| navigation_type | categoria estrutural de navegação | A1 | categorical | nominal | estrutural direta | alto | baixa | P0 |
| navigation_items | contagem de itens de menu principal | A1 | count | razão | estrutural direta | alto | baixa | P0 |
| mega_menu | presença de mega-menu | A1 | binary | nominal | estrutural direta | alto | baixa | P0 |
| hero_type | categoria estrutural do hero (existente v0.1 metodologia §14, reaproveitada) | A1 | categorical | nominal | IA + revisão | médio | média | P0 |
| primary_cta | texto/destino do CTA primário | A1/A2 | text/categorical | nominal | estrutural direta | alto | baixa | P0 |
| cta_category | classificação semântica do CTA (nova) | A2 | categorical | nominal | IA + revisão | médio | média | P0 |
| social_proof | presença/tipo de prova social | A1/A2 | categorical | nominal | estrutural + IA leve | médio | média | P1 |
| trust_mechanism | tipo de mecanismo de confiança (nova, taxonomia: testimonial/logo/case/rating/award/certification/metric) | A2 | categorical (multi-label) | nominal | IA + revisão | médio | média | P1 |
| pricing_visible | presença de pricing público | A2 | binary | nominal | estrutural direta | alto | baixa | P0 |
| lead_gen_mechanism | tipo de mecanismo de geração de lead (nova, taxonomia listada em §A2-03) | A2 | categorical (multi-label) | nominal | IA + revisão | médio | média | P1 |
| accessibility_metrics | sinais automatizados de acessibilidade (existente) | A1/A3 | continuous/count | intervalar | ferramenta automatizada | alto | baixa | P1 |
| performance_metrics | Core Web Vitals (existente) | A3 | continuous | razão | ferramenta automatizada | alto | baixa | P0 |
| technology_signals | fingerprint de tecnologia (existente) | A3/B | categorical (multi-label) | nominal | ferramenta automatizada | alto | baixa | P0 |
| structured_data | presença/tipo de structured data (existente) | A3 | categorical | nominal | estrutural direta | alto | baixa | P2 |
| third_party_script_count | contagem de scripts/trackers de terceiros (nova) | A3 | count | razão | ferramenta automatizada | alto | baixa | P1 |
| typescript | presença de TypeScript no repositório (existente, Track B) | B | binary | nominal | manifest público | alto | baixa | P0 |
| unit_tests / integration_tests / e2e_tests | presença de cada tipo de teste (existente, Track B) | B | binary | nominal | estrutural do repositório | alto | baixa | P1 |
| design_system / storybook / component_library | sinais de maturidade de design system (existente, Track B) | B | binary | nominal | estrutural do repositório | alto | baixa | P1 |
| ci_cd / security_policy / contribution_guide / codeowners | sinais de governança de engenharia (existente, Track B) | B | binary | nominal | estrutural do repositório | alto | baixa | P2 |
| reference_type | tag de categoria de referência da empresa (existente, v0.2 §3) | cross-track | categorical (multi-label) | nominal | curadoria/pesquisa | baixo | alta | P0 |
| visual_consistency | consistência visual entre propriedades digitais da mesma empresa (nova) | C | ordinal | ordinal | **REQUIRES RUBRIC** (seção 11) | baixo | alta | P1 |
| engineering_maturity | maturidade agregada de práticas de engenharia pública (nova) | C | ordinal | ordinal | **REQUIRES RUBRIC** (seção 11) | baixo | alta | P2 |

---

## 9. Operational Definitions

Conceitos identificados como perigosamente subjetivos, com definição operacional inicial ou marcação explícita de que exigem rubric antes de qualquer uso:

| Conceito | Status |
|---|---|
| **digital maturity** | `REQUIRES RUBRIC` — não operacionalizado neste documento; depende de rubric multidimensional futuro (v0.2 §16) |
| **design quality** | `REQUIRES RUBRIC` — corresponde ao `quality_assessment` já definido em v0.2 §7/`references/quality-gates.md`; nunca inferido de frequência |
| **visual consistency** | `REQUIRES RUBRIC` — comparação entre propriedades da mesma empresa, sem critério objetivo automatizável ainda definido |
| **engineering maturity** | `REQUIRES RUBRIC` — pode ser parcialmente operacionalizada como contagem de sinais de governança presentes (ci_cd + security_policy + testes + release_strategy), mas o julgamento de "maturidade" agregada exige rubric explícito, não apenas soma de binários |
| **trust** | definição operacional parcial adotada: **não** se mede "confiança" como constructo psicológico — mede-se `trust_mechanism` como contagem/presença de mecanismos de prova social enumerados (testimonial, logo, case, rating, award, certification, metric). O que é reportado é prevalência de mecanismos, nunca "nível de confiança" da experiência |
| **conversion friction** | `REQUIRES RUBRIC` — fricção é fundamentalmente comportamental (depende de teste com usuário real); nenhuma variável estática (ex.: contagem de campos de formulário) é aceita como proxy direto de fricção sem rubric explicando a limitação |
| **innovation** | `REQUIRES RUBRIC` — não medido por página; a inovação é tratada exclusivamente como tag de categoria (`Innovation Reference`, v0.2 §3), atribuída por evidência documentada, nunca por julgamento estético direto de IA |
| **documentation quality** (Track B) | `REQUIRES RUBRIC` — pode-se medir presença/extensão de README (proxy fraco), mas "qualidade" exige rubric antes de qualquer score |

**Regra geral:** nenhuma IA "dá uma nota" a um conceito marcado `REQUIRES RUBRIC` até que o rubric correspondente exista e esteja versionado (`RubricVersion`, v0.2 §16).

---

## 10. Composite Scores

Nenhum índice é criado nesta etapa. Candidatos futuros, todos marcados **`FUTURE VALIDATION REQUIRED`**:

- **Digital Maturity Score** — requer validação de pesos, dimensionalidade e confiabilidade antes de qualquer uso comercial.
- **UX Score** — mesma exigência; risco de esconder trade-offs reais atrás de um único número (v0.2 §16 já proíbe composite score como métrica padrão).
- **Engineering Maturity Score** — idem, especialmente por depender de sinais binários agregados sem peso testado.
- **ARKOS Digital Experience Index** — o mais ambicioso e o mais arriscado; só seria defensável publicamente se satisfizesse também o Market Pattern Gate (metodologia v0.1 §27) para qualquer componente que pretenda generalizar para o mercado.

Para todos: pesos, validade (o índice mede o que diz medir?) e confiabilidade (o índice é estável em re-medição?) precisam ser testados empiricamente antes de uso — não assumidos por design elegante.

---

## 11. IA como Instrumento de Medição

Variáveis desta pesquisa que provavelmente exigem classificação por IA: `hero_type`, `cta_category`, `trust_mechanism`, `lead_gen_mechanism` (classificação semântica), padrões de navegação mais sutis (se estrutura simples não bastar), `visual_consistency` (quando o rubric existir).

Para cada uma, a proveniência já está especificada estruturalmente por `AIAnalysisRun` (v0.2 §17) — não redefinida aqui, apenas referenciada: `model`, `prompt_version`, `taxonomy_version`, `input_hash`, `confidence`, `review_status`, `reviewer`. Nenhuma classificação por IA entra na Research Sample sem essa proveniência registrada, mesmo em escala (a revisão humana pode ser amostral, não de 100% dos casos, mas a proveniência é de 100% dos casos).

---

## 12. Inter-Rater Reliability

Para variáveis subjetivas classificadas por humano ou IA+humano (`hero_type`, `cta_category`, `trust_mechanism`, e futuramente qualquer variável `REQUIRES RUBRIC`), recomenda-se avaliação futura de concordância usando, conforme o tipo de dado: **Cohen's Kappa** (dois avaliadores, categórico); **Fleiss' Kappa** (3+ avaliadores, categórico); **Krippendorff's Alpha** (dados incompletos/múltiplos tipos de escala); **ICC** (variáveis contínuas/ordinais). **Nenhum teste é executado nesta etapa** — esta seção formaliza que ele será necessário antes de qualquer rubric ser considerado calibrado (v0.2 §16, "checagem periódica de consistência").

---

## 13. Pilot Study

Antes de qualquer coleta em escala (Research Sample completa), recomenda-se piloto:

```text
5–10 companies (número ilustrativo, não estatístico)
        ↓
measurement test (as variáveis do MVP Research Set, seção 5, realmente são capturáveis?)
        ↓
taxonomy problems (categorias de hero_type/cta_category cobrem os casos reais?)
        ↓
classification consistency (revisão humana concorda com IA? seção 12)
        ↓
automation failures (que % de captures falha? seção 21 da metodologia)
        ↓
rubric calibration (para as variáveis REQUIRES RUBRIC que entrarem no piloto)
        ↓
methodology revision (ajustar este documento e a metodologia v0.1 antes de escalar)
```

O piloto **não serve para inferência estatística** — serve exclusivamente para validar se o instrumento de medição funciona antes de gastar orçamento na Research Sample completa.

---

## 14. Research Program — Fases

Crítica à proposta original: um "Phase 1 — Measurement Validation" separado do "Pilot Study" (seção 13) seria redundante — as duas descrevem a mesma atividade. Consolidados em uma única fase inicial.

| Fase | Escopo | Depende de |
|---|---|---|
| **Phase 1 — Pilot & Measurement Validation** | piloto (seção 13) sobre as 5 MVP RQs; calibração inicial de taxonomia e rubrics | Benchmark Core mínimo selecionado (v0.2 §27) |
| **Phase 2 — Descriptive Baseline** | execução das RQs P0 descritivas em escala (Research Sample) | Phase 1 aprovada; sampling frame por vertical definido (metodologia v0.1 §29) |
| **Phase 3 — Comparative Research** | hipóteses candidatas (seção 4) registradas formalmente e testadas | Phase 2 concluída; poder estatístico calculado por hipótese (seção 9 da metodologia) |
| **Phase 4 — Engineering Intelligence** | RQs Track B em escala (Engineering Sample) | organizações GitHub elegíveis mapeadas (metodologia v0.1 §30) |
| **Phase 5 — Cross-Layer Research** | RQs Track C | volume suficiente de pares `VERIFIED` (metodologia v0.1 §31) — **gate explícito**, não uma data fixa |
| **Phase 6 — Longitudinal Intelligence** | análises de tendência ao longo de múltiplas janelas de coleta | Dataset Versioning (metodologia v0.1 §33) operacional, múltiplas `DatasetRelease` acumuladas |

---

## 15. Knowledge Flywheel

```text
Research Questions
        ↓
Measurements
        ↓
Evidence
        ↓
Patterns
        ↓
Insights
        ↓
Recommendations
        ↓
ARKOS Projects
        ↓
Project Outcomes
        ↓
New Research Questions
```

O último elo — `Project Outcomes → New Research Questions` — é o que transforma pesquisa em vantagem acumulativa: um `Recommendation` aplicado num projeto real e seu resultado observado (sucesso, ajuste necessário, falha) devem gerar novas RQs, fechando o mesmo feedback loop já definido em v0.2 §14, agora explicitamente estendido ao nível do programa de pesquisa como um todo, não apenas ao pipeline de captura.

---

## 16. Client Intelligence (uso futuro, não produto)

```text
CLIENT
   ↓
same measurement protocol (mesmas variáveis/rubrics deste documento)
   ↓
sector benchmark (comparação contra Research Sample do vertical do cliente)
   ↓
gap analysis
   ↓
recommendations
```

Nenhum produto é criado nesta etapa. O valor conceitual: se o cliente for medido com o **mesmo protocolo** usado no benchmark (mesmas variáveis, mesma taxonomia, mesmos rubrics versionados), a comparação é metodologicamente válida; medir o cliente com critério diferente do benchmark invalidaria qualquer gap analysis — por isso este documento e a metodologia v0.1 precisam ser a mesma régua para benchmark e para trabalho de cliente.

---

## 17. Evidence Language

Linguagem permitida por nível de evidência (integra metodologia v0.1 §26/§27/§8):

| Nível | Linguagem |
|---|---|
| Observation | "Observamos..." |
| Sample Pattern | "Na amostra analisada..." |
| Association | "Foi observada associação..." (nunca causal) |
| Comparative Finding | "O grupo A apresentou..." |
| Market Pattern | somente após satisfazer o Market Pattern Gate (metodologia v0.1 §27) |
| Recommendation | "Com base nas evidências e no contexto..." |

**Proibido sem desenho causal e evidência apropriada:** "todo mercado faz X", "as melhores empresas fazem Y", "comprovadamente aumenta conversão" — qualquer formulação que implique generalização não sustentada ou causalidade não testada.

---

## 18. Negative Results

Resultado sem diferença detectável também é conhecimento e deve ser preservado, não descartado por ser "menos interessante". O modelo de dados já suporta isso: `Hypothesis.status` (seção 4 / metodologia v0.1 §17) aceita `rejected`/`inconclusive`, e `Insight.status` (v0.2 §6) aceita `rejected`. **Regra explícita:** o sistema não deve publicar seletivamente apenas achados "interessantes" — um H0 não rejeitado é reportado com o mesmo rigor de um H1 confirmado, incluindo nos relatórios de síntese (v0.2 §14).

---

## 19. Research Debt

Conceito novo, não implementado — apenas especificado conceitualmente para registro futuro:

**Research Debt** ocorre quando: uma variável é usada sem definição operacional (viola seção 9); uma hipótese é testada sem registro prévio no Hypothesis Registry (viola metodologia v0.1 §17, risco de HARKing); um `Pattern` não possui evidência suficiente mas é tratado como se possuísse; uma `Recommendation` perde validade temporal (viola snapshot validity, metodologia v0.1 §23) mas continua sendo citada; um dataset está desatualizado além da `collection_window` declarada; um rubric não foi calibrado (seção 12) mas já está em uso produtivo; um modelo de IA mudou (`AIAnalysisRun.model`) sem que a mudança tenha sido versionada/registrada.

Estrutura conceitual futura (não implementada):

```text
ResearchDebtItem
├── debt_id
├── debt_type          # missing_operational_definition | unregistered_hypothesis |
│                       # insufficient_evidence | expired_recommendation |
│                       # outdated_dataset | uncalibrated_rubric | unversioned_model_change
├── related_entity_type
├── related_entity_id
├── detected_at
├── status              # open | acknowledged | resolved
└── resolution_plan
```

Objetivo: tornar visível e rastreável o débito metodológico acumulado, em vez de deixá-lo implícito até corroer a confiabilidade do programa de pesquisa.

---

## 20. Decision Matrix — As 20 RQs

Ordenada por prioridade (P0 → P1 → P2); dentro de cada prioridade, por ID.

| RQ | Track | Type | Business Value | Scientific Value | Data Availability | Complexity | Priority | MVP |
|---|---|---|---|---|---|---|---|---|
| RQ-A1-01 | A1 | DESCRIPTIVE/COMPARATIVE | HIGH | MEDIUM | HIGH | LOW | P0 | ✅ |
| RQ-A1-02 | A1 | DESCRIPTIVE/COMPARATIVE | HIGH | MEDIUM | HIGH | MEDIUM | P0 | ✅ |
| RQ-A1-05 | A1 | DESCRIPTIVE | MEDIUM | MEDIUM | HIGH | LOW | P0 | — |
| RQ-A2-01 | A2 | COMPARATIVE | HIGH | MEDIUM | HIGH | MEDIUM | P0 | — |
| RQ-A2-02 | A2 | DESCRIPTIVE/COMPARATIVE | HIGH | MEDIUM | HIGH | LOW | P0 | ✅ |
| RQ-A3-01 | A3 | DESCRIPTIVE/COMPARATIVE | HIGH | HIGH | HIGH | LOW | P0 | ✅ |
| RQ-A3-02 | A3 | DESCRIPTIVE | MEDIUM | LOW | MEDIUM | LOW | P0 | — |
| RQ-B-01 | B | DESCRIPTIVE/COMPARATIVE | HIGH | MEDIUM | HIGH | LOW | P0 | ✅ |
| RQ-A1-03 | A1 | COMPARATIVE | MEDIUM | MEDIUM | HIGH | MEDIUM | P1 | — |
| RQ-A1-04 | A1 | DESCRIPTIVE/COMPARATIVE | MEDIUM | MEDIUM | HIGH | LOW | P1 | — |
| RQ-A2-03 | A2 | DESCRIPTIVE/COMPARATIVE | MEDIUM | LOW | HIGH | MEDIUM | P1 | — |
| RQ-A2-04 | A2 | DESCRIPTIVE | MEDIUM | LOW | HIGH | MEDIUM | P1 | — |
| RQ-A3-03 | A3 | COMPARATIVE/EXPLORATORY | MEDIUM | MEDIUM | MEDIUM | MEDIUM | P1 | — |
| RQ-B-02 | B | DESCRIPTIVE/COMPARATIVE | MEDIUM | MEDIUM | MEDIUM | MEDIUM | P1 | — |
| RQ-B-03 | B | DESCRIPTIVE | MEDIUM | LOW | MEDIUM | MEDIUM | P1 | — |
| RQ-C-01 | C | CROSS-LAYER/COMPARATIVE/EXPLORATORY | HIGH | HIGH | LOW | HIGH | P1 | — |
| RQ-A3-04 | A3 | DESCRIPTIVE | LOW | LOW | HIGH | LOW | P2 | — |
| RQ-B-04 | B | DESCRIPTIVE | LOW | LOW | HIGH | LOW | P2 | — |
| RQ-C-02 | C | CROSS-LAYER/EXPLORATORY | MEDIUM | HIGH | LOW | VERY_HIGH | P2 | — |
| RQ-C-03 | C | CROSS-LAYER/EXPLORATORY | MEDIUM | HIGH | MEDIUM | HIGH | P2 | — |

---

## Quality Gate — Autoavaliação

| Critério | Status |
|---|---|
| As 20 RQs são mensuráveis | ✅ toda RQ lista variáveis primárias observáveis/mensuráveis |
| Nenhuma depende de conceito indefinido sem `REQUIRES RUBRIC` | ✅ ver seção 9 |
| Nenhuma confunde correlação e causalidade | ✅ RQs/H associativas explicitamente rotuladas "Association"/"não-causal" |
| Unidade de análise explícita | ✅ campo dedicado em toda ficha |
| População explícita | ✅ idem |
| Variáveis identificadas | ✅ Variable Registry, seção 8 |
| Hipóteses falsificáveis | ✅ nenhuma hipótese óbvia/circular incluída (seção 4) |
| Sample size não fixado arbitrariamente | ✅ seção 7 — método declarado, `n` = NOT YET CALCULATED em todos os casos |
| Website evidence e GitHub evidence continuam separados | ✅ Regra de Não Equivalência reforçada na seção 2/3 |
| Perguntas com utilidade estratégica para ARKOS | ✅ campo "Relevância de negócio"/"Business Value" em todas |
| MVP limitado a 5 RQs | ✅ seção 5 |

Documento aprovado pelos critérios internos declarados no gate.

---

## Recommended Next Step

Não implementar. Próximo passo recomendado: aprovação deste framework, seguida da definição do sampling frame real do primeiro vertical piloto (já recomendado ao final da metodologia v0.1) usando as 5 MVP RQs deste documento como escopo de medição do piloto (seção 13) — antes de registrar formalmente qualquer hipótese no Hypothesis Registry ou calcular `n` definitivo.
