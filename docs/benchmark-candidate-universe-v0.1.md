# ARKOS Digital Benchmark — Candidate Universe Report v0.1

```
Status: Candidate Universe — Live Research Completed, Pre-Pilot-Measurement
Depends on: benchmark-intelligence-architecture-v0.2.md,
            benchmark-sampling-research-methodology-v0.1.md,
            benchmark-research-questions-v0.1.md
Produces: data/research/benchmark-candidate-universe-v0.1.csv (56 linhas),
          data/research/engineering-candidate-universe-v0.1.csv (42 linhas),
          docs/pilot-selection-v0.1.md
```

Este documento relata, de forma factual e honesta, a pesquisa web ao vivo conduzida para construir os dois universos de candidatos (Digital Experience e Open-Source Engineering) que sustentarão o Pilot Study do ARKOS Benchmark Intelligence. Nenhum código foi escrito, nenhum banco de dados foi criado, nenhum crawler/automação foi implementado. Toda evidência citada aqui vem de buscas web reais e páginas efetivamente consultadas nesta sessão (11 de agosto de 2026).

---

## 1. Research objective

Construir um universo de candidatos suficientemente amplo e diverso — mas sobretudo bem evidenciado — de (a) empresas cujas experiências digitais públicas possam compor os benchmarks ARKOS, e (b) organizações/repositórios GitHub relevantes como fonte de evidência de engenharia pública, especialmente para as 5 MVP Research Questions (RQ-A1-01, RQ-A1-02, RQ-A2-02, RQ-A3-01, RQ-B-01). O objetivo não foi produzir a Research Sample final nem calcular tamanho de amostra — é constituir o **Sampling Frame candidato** a partir do qual a amostra científica futura poderá ser derivada.

---

## 2. Search methodology

Abordagem: buscas exploratórias por vertical (Education/EdTech, Business/B2B, Sales/CRM/Revenue Technology, Services, Cross-industry Digital Leaders), seguidas de buscas de verificação direcionadas por empresa/organização específica, e buscas de confirmação de GitHub Organizations oficiais. Quando uma busca retornava apenas fontes fracas (listicles SEO, comparativos de afiliados), isso foi registrado explicitamente como `evidence_quality: LOW`, não descartado nem promovido artificialmente.

Padrão típico de query usado:
- `"[empresa] market leader [categoria] [ano]"` — para Market Leader
- `"[empresa] design awards recognition"` / `"[empresa] Awwwards"` — para Digital/Design Leader
- `"[empresa] github organization official repositories"` — para vínculo Company↔GitHub
- `"[empresa] pricing"` — para sinal de Pricing Visibility (RQ-A2-02)
- `"[framework/design system] github official repository"` — para universo de engenharia

### Research Log resumido

| Data | Atividade | Observações |
|---|---|---|
| 2026-08-11 | ~35 buscas web (`WebSearch`) cobrindo os 5 verticais digitais | Volume suficiente para descoberta inicial, insuficiente para cobertura exaustiva de qualquer vertical |
| 2026-08-11 | Buscas de verificação de GitHub Organizations (~15 buscas) | Confirmou orgs oficiais para ~20 empresas; para o restante, `github_link_status = UNKNOWN` (não pesquisado, não "não existe") |
| 2026-08-11 | Buscas de universo de engenharia (design systems, frameworks, ecosystem references) (~12 buscas) | Boa cobertura de design systems de Big Tech/SaaS; cobertura fraca de design systems de empresas LatAm/APAC além de Mercado Libre |

**Problemas encontrados:**
- Números de market share frequentemente divergem entre fontes (ex.: DoorDash 56% vs. 67% do mercado de delivery dos EUA, dependendo da fonte) — registrado como faixa, não número único falso-preciso.
- Várias buscas sobre "prêmios de design" retornaram informação sobre prêmios concedidos a *agências parceiras* (ex.: HubSpot Impact Awards), não à empresa-alvo em si — descartado como evidência de `digital_leader` para essas empresas.
- Fontes acadêmicas peer-reviewed (MDPI) foram encontradas apenas para o par Coupang/Rakuten — não foi possível replicar esse nível de fonte para a maioria das outras 54 empresas no tempo disponível.
- Nenhum CAPTCHA, bloqueio de acesso ou paywall bloqueou pesquisa nesta sessão (buscas via `WebSearch`, sem necessidade de `WebFetch` direto às páginas).

**Decisões de inclusão/exclusão registradas:**
- Excluídos deliberadamente do universo (por falta de evidência além de listicles SEO genéricos, apesar de serem candidatos plausíveis a priori): Fiverr, Upwork, TaskRabbit, Thumbtack, Uber Eats/Uber (moda de transporte) — buscas retornaram apenas conteúdo "how to build a clone" de baixíssima autoria.
- Incluídos apesar de evidência LOW (Klarna, N26, Revolut, Figma, Miro, Webflow, Framer, Apple, Pipedrive, Personio, Celonis, Canva): mantidos porque cobrem lacunas de diversidade geográfica/modelo de negócio que nenhum outro candidato bem-evidenciado cobria — marcados honestamente como LOW, não inflados para MEDIUM/HIGH.

---

## 3. Sources consulted

| Tipo de fonte | Exemplos usados |
|---|---|
| Site oficial da empresa | apple.com/newsroom, xero.com/nz/media/awards, zoho.com/crm/zohocrm-pricing.html, sap.com |
| GitHub Organization oficial | github.com/duolingo, github.com/Khan, github.com/vercel, github.com/carbon-design-system |
| Cobertura editorial independente | Fast Company (Notion, Nike), Harvard Business Review via terceiros (Booking.com) |
| Premiações/referências de design | Apple Design Awards (developer.apple.com), Awwwards (Stripe Sessions), Product Hunt Golden Kitty (Linear, Notion) |
| Fonte acadêmica peer-reviewed | MDPI Sustainability (Coupang vs. Rakuten) |
| Imprensa financeira/de mercado | Fortune, Higher Ed Dive, Fiscal.ai, GabGrowth, Sifted, Tech.eu |
| Imprensa/blogs de tecnologia em português | Exame, UX Design Brasil, Alura, RD Station |
| Documentação técnica de design systems | polaris.shopify.com, carbondesignsystem.com, atlassian.design |

Evitados como fonte principal (conforme diretriz do projeto): listas "top 100" sem metodologia declarada, blogs de afiliados de comparação de CRM/marketplace, agregadores de "best websites" sem critério de pontuação explícito.

---

## 4. Inclusion criteria

- Deve ser possível formular ao menos uma hipótese razoável de como a empresa/repositório ajuda a testar pelo menos uma das 5 MVP RQs.
- Deve haver ao menos uma fonte real (buscada nesta sessão) associável à empresa, mesmo que de evidência LOW.
- Preferência por diversidade (geográfica, de modelo de negócio, de Reference Type) sobre repetição de perfis já bem cobertos.
- Para engenharia: repositório/organização deve ter relevância observável para frontend/platform/design systems ou ser referência de ecossistema amplamente adotada.

## 5. Exclusion criteria

- Candidatos cuja única evidência disponível era listicle SEO sem autoria/metodologia declarada.
- Repositórios GitHub triviais/educacionais, forks sem relevância própria, ou repositórios cujo propósito não se conecta a nenhuma das 5 MVP RQs.
- URLs não encontradas em um resultado de busca real ou página efetivamente consultada — nenhuma URL foi "adivinhada"; onde a URL exata de um sub-repositório não pôde ser confirmada por um link clicável real (ex.: possível repo `Khan/wonder-blocks`), optou-se por citar a URL da organização confirmada em vez de inventar o caminho completo.

---

## 6. Digital Candidate Universe — visão geral

**Total encontrado: 56 candidatos**, versus meta aspiracional de 200-300 do brief original. Isso é um shortfall substancial e deliberado, não escondido: dado o orçamento de tempo/ferramentas desta sessão (~35 buscas web dedicadas à Parte A), 56 candidatos bem evidenciados foi o que a pesquisa responsável permitiu, priorizando qualidade e diversidade sobre volume bruto, conforme autorização explícita do brief ("60 candidatos confiáveis é preferível a 250 com preenchimentos fracos"). Atingimos o piso da faixa prática recomendada (60-100), ligeiramente abaixo dela.

---

## 7. Distribution by vertical

| Vertical | Contagem (primary_vertical) |
|---|---|
| Cross-industry Digital Leaders | 20 |
| Services | 11 |
| Business/B2B | 11 |
| Education/EdTech | 10 |
| Sales/CRM/Revenue Technology | 4 |
| **Total** | **56** |

Nota: várias empresas têm `secondary_verticals` preenchido (ex.: Salesforce e HubSpot contam Sales/CRM como secundário; SAP conta Cross-industry como secundário) — a tabela acima reflete apenas `primary_vertical`, evitando dupla contagem. O vertical Sales/CRM/Revenue Technology é o mais fraco em contagem direta (4), mas ganha reforço indireto via 3 secondary_verticals de empresas de outros verticais.

---

## 8. Distribution by geography

| Region | Contagem |
|---|---|
| North America | 26 |
| Europe | 13 |
| Asia-Pacific | 9 |
| Latin America | 7 |
| Other (Israel) | 1 |
| **Total** | **56** |

Por país (top): USA (25), Germany (4), Netherlands (4), Brazil (4), demais países com 1-2 candidatos cada (United Kingdom, Sweden, Singapore, India, Australia, Colombia, South Korea, Canada, Japan, New Zealand, Israel, Argentina, Estonia).

---

## 9. Distribution by business model

Contagem de menções de palavra-chave dentro do campo `business_model` (uma empresa pode ter múltiplas tags, portanto a soma excede 56):

| Modelo | Menções |
|---|---|
| B2B | 35 |
| B2C | 30 |
| B2B2C | 17 |
| Product-led | ~16 (13 diretas + 3 em combinações hybrid) |
| Marketplace | 12 |
| SaaS | 12 |
| Platform | 10 |
| Subscription | ~11 (10 diretas + variações) |
| Enterprise | ~10 (8 diretas + 2 em combinações) |
| Sales-led | ~11 (7 diretas + variações hybrid) |
| Transactional | 7 |
| Freemium | ~8 (6 diretas + variações) |
| Bootstrapped | 2 (Zoho, 37signals — explícito) |

---

## 10. Distribution by reference type

| Reference Type | TRUE | UNVERIFIED | FALSE |
|---|---|---|---|
| Market Leader | 14 | 38 | 4 |
| Digital Leader | 6 | 49 | 1 |
| Design Reference | 5 | 51 | 0 |
| Technology Reference | 20 | 36 | 0 |
| Conversion Reference | 2 | 54 | 0 |
| Innovation Reference | 1 | 55 | 0 |

**Leitura honesta:** Technology Reference é a categoria mais bem coberta (20 empresas, principalmente via GitHub Organizations e design systems confirmados — a categoria mais fácil de verificar objetivamente nesta sessão). Conversion Reference e Innovation Reference são as mais fracas (2 e 1, respectivamente) — refletem o fato de que casos de CRO/inovação verificável exigem fontes mais específicas (case studies nomeados) que foram mais raras nas buscas realizadas. Isso é uma limitação real da pesquisa, não um limite estrutural do universo — buscas adicionais direcionadas a "case study CRO [empresa]" provavelmente encontrariam mais.

---

## 11. Evidence quality distribution

| evidence_quality | Contagem |
|---|---|
| MEDIUM | 34 |
| LOW | 15 |
| HIGH | 7 |
| **Total** | **56** |

Nenhuma linha ficou com `evidence_quality = UNVERIFIED` no nível do dossiê geral — mesmo os candidatos mais fracos tinham ao menos uma fonte real conectável, ainda que de baixa autoridade (LOW). Os 7 candidatos HIGH (Duolingo, iFood, Vercel, Shopify, 37signals/Basecamp, IBM, Microsoft) compartilham a característica de terem repositório GitHub oficial diretamente confirmado **e** uma segunda fonte independente convergente.

---

## 12. Engineering Candidate Universe — visão geral

**Total: 42 candidatos**, versus meta aspiracional de 100-200. Shortfall proporcionalmente maior que o da Parte A, pelo mesmo motivo de orçamento de sessão — dedicamos ~12 buscas diretas ao universo de engenharia, suficientes para mapear os principais design systems e frameworks de Big Tech/SaaS maduro, mas não para uma varredura ampla de organizações menores ou de mercados emergentes.

Distribuição por `candidate_type`:

| Tipo | Contagem |
|---|---|
| DESIGN_SYSTEM | 17 |
| COMPANY_OFFICIAL | 13 |
| FRAMEWORK_OR_PLATFORM | 5 |
| DIGITAL_PRODUCT | 4 |
| ECOSYSTEM_REFERENCE | 3 |
| **Total** | **42** |

Distribuição por `relationship_status` (vínculo com empresa da Parte A):

| Status | Contagem |
|---|---|
| VERIFIED | 30 |
| NOT_APPLICABLE | 10 |
| UNVERIFIED | 2 |
| **Total** | **42** |

30 dos 42 candidatos de engenharia têm vínculo `VERIFIED` com uma empresa específica da Parte A — uma taxa de conexão maior do que inicialmente esperado, refletindo que grande parte da pesquisa de engenharia partiu deliberadamente de empresas já identificadas na Parte A (Khan Academy, Duolingo, Salesforce, HubSpot, monday.com, Zendesk, Airbnb, Vercel, 37signals, IBM, Microsoft, Adobe, SAP, Mercado Libre, Platzi, Atlassian, Coursera, Spotify, 2U/edX). Os 10 `NOT_APPLICABLE` são ecosystem references genuinamente independentes (React/Meta, Vue.js, Ant Design, shadcn/ui, Radix UI, Storybook e derivados, Netflix) — incluídos conforme autorizado pela metodologia ("Parte B não precisa se limitar às empresas da Parte A").

---

## 13. GitHub methodology

Critério de inclusão de repositório: relevância observável para frontend/platform/design systems, OU ser um projeto/framework de referência para práticas modernas de engenharia (React, Vue, TypeScript, Storybook), OU ser o design system oficial documentado de uma empresa do universo. Não foram contados automaticamente todos os repositórios de nenhuma organização — para orgs com centenas de repositórios (Khan: 472, Platzi: 554, Netflix: 234, Salesforce, Coursera: 81), apenas o(s) repositório(s) principal(is) relevante(s) foram registrados como linha, com nota explícita de que o restante da organização não foi individualmente avaliado e precisará de critério de amostragem próprio no Pilot Measurement.

Sinais de TypeScript foram registrados de forma preliminar e honesta: `typescript_signal = TRUE` apenas quando a busca retornou confirmação textual explícita (ex.: "written in TypeScript", "TypeScript-first"), nunca inferido apenas pela presença informal de arquivos `.ts` mencionados de passagem. Onde não verificado, `typescript_signal = UNVERIFIED`, nunca convertido silenciosamente em `FALSE`.

Exclusões explícitas de "candidato de engenharia potencial": Fiverr, Upwork, TaskRabbit, Thumbtack (Parte A já excluídos, portanto sem candidato de engenharia associado); Notion e RD Station (sem repositório GitHub público relevante confirmado nesta sessão, apesar de estarem no universo Digital); Klarna, N26, Revolut, Miro, Webflow, Framer, Apple, Nike, Google/Rakuten/Coupang/Grab/Rappi/DoorDash (nenhuma evidência de engenharia pública relevante encontrada nesta sessão — não significa que não exista, significa que não foi encontrada com o esforço de busca desta sessão).

---

## 14. Bias analysis

**Geographic Bias:** North America representa 46% do universo digital (26/56) e Europe 23% (13/56) — juntos, 70% do universo é EUA+Europa. Asia-Pacific (16%) e Latin America (13%) estão presentes mas claramente sub-representados frente ao peso econômico real dessas regiões. Isso reflete tanto o viés real da cobertura de imprensa/analistas em inglês quanto o tempo limitado desta sessão para pesquisa em fontes não-anglófonas (as buscas em português para candidatos brasileiros funcionaram bem; não foram tentadas buscas em espanhol além de LatAm geral, nem em coreano/japonês/mandarim/hindi diretamente — os candidatos APAC encontrados vieram de fontes em inglês sobre essas empresas, não de fontes nativas).

**Business Model Bias:** B2B (63% das menções) supera B2C (54%) e B2B2C (30%) — SaaS/Product-led também domina (SaaS: 12, Platform: 10, Product-led: ~16). Isso é parcialmente estrutural (a maioria das "empresas de tecnologia com presença digital documentável" tende a ser B2B/SaaS por natureza de como cobertura de imprensa de tecnologia funciona), mas também reflete viés de busca — poucos candidatos puramente transacionais/e-commerce de varejo tradicional foram incluídos além de marketplaces (iFood, Mercado Livre, Rappi, Grab, Shopee, DoorDash, Coupang, Rakuten).

**Company Size Bias:** Há concentração real em empresas de porte médio-grande a Big Tech (Microsoft, IBM, Adobe, SAP, Salesforce, Apple, Nike). Isso foi parcialmente mitigado deliberadamente via: (a) inclusão de 2 contrast cases explícitos (37signals/Basecamp — pequena/bootstrapped; TOTVS — grande sem digital leadership verificada); (b) inclusão de Zoho, Pipedrive, Alura, Platzi como candidatos bootstrapped/menores. Ainda assim, o universo tende para empresas "grandes o suficiente para ter cobertura de imprensa" — um viés estrutural difícil de eliminar totalmente via pesquisa de buscador, já que empresas pequenas por definição geram menos conteúdo indexável sobre si.

**Language Bias:** A maioria absoluta das fontes consultadas está em inglês. Buscas em português (Brasil) foram feitas deliberadamente e geraram 4 candidatos brasileiros bem evidenciados (iFood, Alura, RD Station, TOTVS) mais Mercado Livre/Rappi (espanhol/inglês misto). Nenhuma busca foi feita diretamente em alemão, francês, coreano, japonês, mandarim, hindi ou árabe — os candidatos desses países/idiomas (SAP, Personio, Celonis, Coupang, Rakuten, Zoho, BYJU'S) foram encontrados via cobertura em inglês sobre eles, não via fontes primárias no idioma local. Isso é uma limitação real que provavelmente sub-representa candidatos fortes cuja melhor evidência existe apenas em idiomas não cobertos.

**GitHub Bias:** O universo de engenharia está parcialmente dominado por projetos/organizações já amplamente conhecidos e populares (React, Vue, TypeScript, Ant Design, Storybook, Carbon, Fluent UI) — precisamente os projetos mais fáceis de encontrar via busca porque são os mais citados na web. Stars/forks foram deliberadamente registrados como metadata secundária (não critério de seleção), mas a *descoberta* inicial desses candidatos via busca web é inerentemente enviesada a favor de popularidade, já que projetos populares dominam os resultados de busca. Um viés estrutural do método (busca web), não corrigido nesta sessão — mitigável em ciclos futuros com listas curadas de organizações menos populares e busca direta na interface de exploração do GitHub (fora do escopo autorizado desta sessão, que proibiu scraping/crawling).

---

## 15. Candidate Selection Matrix methodology

A heurística usada na Parte C (documento `pilot-selection-v0.1.md`) é explicitamente rotulada **PILOT HEURISTIC — NOT SCIENTIFIC INDEX**:

```text
Reference Diversity + Evidence Quality + RQ Coverage (das 5 MVP RQs)
+ Geographic/Business Diversity + Pilot Feasibility − Redundancy Penalty
```

Esta fórmula não foi calculada numericamente (não há pesos formais, não há score final por candidato) — foi usada como checklist qualitativo de priorização humana, documentado caso a caso no `pilot-selection-v0.1.md`. Nunca deve ser citada como método estatístico ou índice de qualidade validado.

---

## 16. Pilot selection methodology (resumo)

10 organizações foram selecionadas para o Digital Experience Pilot (mais 5 alternates) e 15 candidatos para o Engineering Pilot (mais 5 alternates), buscando deliberadamente: múltiplos verticais, múltiplas regiões, múltiplos modelos de negócio, múltiplos Reference Types, e 2 contrast cases explícitos (37signals/Basecamp — Design/Technology Reference sem Market Leadership; TOTVS — Market Leader sem Digital Leadership verificada). Detalhe completo, incluindo justificativa individual de cada seleção, está em `docs/pilot-selection-v0.1.md`.

---

## 17. Limitations

- **Escala abaixo da meta aspiracional em ambas as partes** (56/200-300 digital; 42/100-200 engenharia) — já quantificado e justificado nas seções 6 e 12. A causa raiz é o orçamento de tempo/ferramentas de uma única sessão de pesquisa, não uma limitação de disponibilidade real de candidatos no mundo.
- **Viés geográfico e linguístico significativo** (seção 14) — Ásia continental (China, Coreia parcial, Japão parcial), Oriente Médio (exceto Israel/monday.com), e África estão essencialmente ausentes do universo. Isso é uma lacuna real que qualquer Research Sample subsequente precisa corrigir deliberadamente, não apenas herdar.
- **Sales/CRM/Revenue Technology é o vertical mais fraco** em contagem direta (4 candidatos primários) — mitigado parcialmente por secondary_verticals, mas ainda insuficiente para um Research Sample robusto nesse vertical especificamente.
- **Conversion Reference e Innovation Reference são as categorias de evidência mais fracas** (2 e 1 candidatos TRUE, respectivamente) em todo o universo — não porque essas categorias sejam raras na realidade, mas porque as buscas desta sessão não foram suficientemente direcionadas a case studies nomeados de CRO/IA.
- **Nenhuma verificação de segundo nível foi feita** (ex.: confirmar se um repositório GitHub está de fato arquivado, checar `tsconfig.json` real, medir performance) — isso é trabalho do Pilot Measurement futuro, fora do escopo desta pesquisa exploratória.
- **Alguns números de mercado são contraditórios entre fontes** (ex.: DoorDash 56-67%, Coursera vs. Udemy receita vs. learners) — reportados como faixas ou com a divergência explicitada, nunca resolvidos arbitrariamente por escolha do pesquisador.

---

## 18. Open questions

1. Como a ARKOS deve priorizar pesquisa em idiomas não cobertos nesta sessão (mandarim, coreano, japonês, árabe, hindi) para reduzir o viés linguístico identificado?
2. Vale a pena um ciclo de pesquisa dedicado exclusivamente a Conversion Reference e Innovation Reference (as categorias mais fracas), com queries mais específicas (ex.: "[empresa] A/B test case study", "[empresa] AI personalization feature launch")?
3. Como tratar candidatos cujo Reference Type mudou recentemente (ex.: BYJU'S, 2U/edX — de "líder" para "em crise") em futuros ciclos de atualização do universo, sem invalidar retroativamente análises já feitas?
4. Deve o Engineering Candidate Universe expandir deliberadamente para organizações fora do GitHub (GitLab, Bitbucket, Codeberg), dado que já encontramos um caso relevante (Atlassian/Atlaskit) hospedado fora do GitHub?
5. Qual o critério operacional definitivo para decidir quando um `evidence_quality: LOW` candidato deve ser promovido, rebaixado a exclusão, ou mantido como está em um próximo ciclo?

---

## 19. Recommended next step

Recomenda-se (não executado nesta etapa): (a) um segundo ciclo curto de pesquisa exploratória focado especificamente em fechar as lacunas identificadas na seção 14 (Ásia continental, Oriente Médio, África, Conversion/Innovation Reference) antes de qualquer cálculo formal de Sample Size; (b) revisão humana do Pilot Selection (`pilot-selection-v0.1.md`) por um segundo pesquisador ARKOS antes de qualquer Pilot Measurement começar; (c) NÃO iniciar cálculo de tamanho de amostra (Sample Size Calculation) até que a Sampling Frame Readiness abaixo seja reavaliada como `READY` para a dimensão relevante.

---

## Sampling Frame Readiness

**Digital: PARTIALLY READY.** O universo de 56 candidatos tem estrutura suficiente (schema completo, evidência rastreável, diversidade mínima de verticais/regiões/reference types) para sustentar um Pilot Study imediatamente. Não está pronto para cálculo de Sample Size de uma Research Sample representativa porque a cobertura geográfica e de Conversion/Innovation Reference é insuficiente para estratificação robusta nessas dimensões — um segundo ciclo de descoberta é recomendado antes de qualquer definição de `N` populacional.

**Engineering: PARTIALLY READY.** O universo de 42 candidatos cobre bem os design systems e frameworks mais influentes e tem taxa de vínculo verificado com a Parte A (30/42) acima do esperado, mas o volume absoluto (42 vs. meta de 100-200) e a concentração em organizações já populares (viés de descoberta via busca) tornam qualquer cálculo de amostra prematuro — adequado para validar instrumento e taxonomia no Pilot, não para definir sampling frame definitivo de RQ-B-01.
