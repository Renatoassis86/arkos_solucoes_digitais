# ARKOS Digital Benchmark

## Sampling & Research Methodology v0.1

```
Status: Methodology Draft — Pre-Implementation
Depends on: benchmark-intelligence-architecture-v0.1.md, v0.2.md (preserved, não alterados)
```

Este documento define a camada metodológica de amostragem e pesquisa que alimenta a arquitetura já aprovada (Evidence, Pattern, Trend, Insight, Recommendation — v0.2). Ele não redefine essas entidades; define **como** popular esse modelo com rigor estatístico e metodológico defensável. Nenhum código, coleta massiva ou seleção de empresas ocorre nesta etapa.

---

## 1. Princípio Científico Fundamental

**n = 50 não garante significância estatística.** O tamanho de amostra correto depende de população-alvo, pergunta de pesquisa, variável analisada, nível de confiança, margem de erro, variabilidade, tamanho de efeito, poder estatístico, desenho amostral, estratificação, missing data e da hipótese específica sendo testada. Nenhum número de amostra é fixado como regra geral neste documento — cada número citado adiante é ilustrativo, não prescritivo (ver seção 8).

### Cinco modos de análise — não intercambiáveis

| Modo | Responde | Exige |
|---|---|---|
| **Descriptive Benchmarking** | o que ocorre nesta amostra | apenas descrição honesta da amostra coletada |
| **Statistical Inference** | o que é provável ser verdade na população | desenho amostral defensável + cálculo de amostra |
| **Comparative Analysis** | há diferença entre grupos | desenho comparativo + poder estatístico adequado |
| **Longitudinal Analysis** | como algo muda ao longo do tempo | séries temporais consistentes, snapshot validity (seção 23) |
| **Exploratory Pattern Discovery** | quais padrões candidatos merecem investigação | nenhuma pretensão de conclusão — gera hipóteses, não as testa |

**Regra de linguagem:** "significativo" só é usado no sentido estatístico quando o desenho subjacente permite essa afirmação. Fora disso, usar "observado", "recorrente", "notável" — nunca "significativo" como sinônimo informal de "importante".

---

## 2. Dois Tracks de Pesquisa

### Track A — Digital Experience Benchmark

Objeto: experiência digital publicada. Reutiliza a cadeia de entidades já definida em v0.2 (Core Data Model): `Company → DigitalProperty → Page → PageVersion → Capture → Observation`, com `Evidence`, `Assessment`, `Pattern`, `Trend`, `Insight` como camada analítica (v0.2 §24). Analisa websites, landing pages, product/pricing pages, conversion pages, cases, conteúdo, jornadas, UX/UI, performance, SEO, acessibilidade e tecnologia observável.

### Track B — Open-Source Engineering Benchmark

Objeto: engenharia publicamente observável (GitHub e outros repositórios públicos permitidos). Cadeia paralela: `Organization → Repository → RepositoryVersion/Commit/Release → EngineeringArtifact → EngineeringObservation`. Analisa, quando publicamente disponível: linguagens, frameworks, arquitetura frontend/backend observável, package managers, estratégia de monorepo, padrões de dependência, testes (unit/integration/E2E/accessibility), linting/formatting, sistemas de tipo, design systems, Storybook, component libraries, CI/CD, containerização, processo de release, documentação, padrões de API, organização de código, governança de engenharia, práticas de contribuição, práticas de segurança observáveis.

**Decisão de design:** Track B **não duplica** a camada analítica — reutiliza as mesmas entidades `Evidence`, `Pattern`, `Trend`, `Insight`, `Recommendation` de v0.2, com `Evidence.source_type` estendido para incluir `EngineeringObservation` e `RepositorySignal`. Isso evita a proliferação sugerida na proposta original (Engineering Pattern, Engineering Insight como entidades separadas) — um único modelo de conhecimento, alimentado por duas fontes de captura distintas (website vs. repositório). `Evidence.source_type` já era extensível por design em v0.2 §5.2 exatamente para este propósito.

---

## 3. Regra de Não Equivalência

**O repositório público de uma empresa não deve ser automaticamente tratado como código-fonte do website comercial dessa empresa.** Um site institucional frequentemente roda em stack fechada, mesmo que a empresa publique projetos open-source não relacionados.

Três classes de evidência, sempre etiquetadas:

| Classe | Definição |
|---|---|
| **Company Website Evidence** | observado diretamente na experiência digital publicada (Track A) |
| **Company Open-Source Evidence** | publicado oficialmente pela organização em repositórios públicos verificáveis como dela (Track B, `ownership` confirmada) |
| **Ecosystem Reference Evidence** | projeto open-source relevante que não pertence necessariamente às empresas da amostra principal, mas representa referência técnica (ex.: um design system popular usado como referência, independente de quem o mantém) |

**Nunca inferir automaticamente** `GitHub repository → production website implementation` sem evidência explícita de vínculo (ver Cross-Layer Linking, seção 18).

---

## 4. Populações-Alvo

Verticais iniciais (herdadas de v0.1/v0.2 §3): Education/EdTech, Business/B2B, Sales/CRM/Revenue, Services, Digital Leaders cross-industry — taxonomia extensível via `Sector`.

**Avaliação de sobreposição:** essas categorias não são mutuamente exclusivas por desenho — uma empresa SaaS de vendas B2B pode pertencer simultaneamente a Business/B2B e Sales/CRM/Revenue. Isso é aceitável e esperado (empresas multi-tag), mas exige que a estratificação (seção 6) trate vertical como atributo multi-valorado, não categoria única — do contrário células amostrais ficam artificialmente infladas ou uma empresa é forçada a um vertical que não a representa completamente.

**Quatro conceitos distintos (frequentemente confundidos na prática):**

| Termo | Definição |
|---|---|
| **Target population** | o universo teórico sobre o qual queremos poder falar (ex.: "empresas SaaS B2B com presença digital relevante") |
| **Sampling frame** | a lista operacionalizável e acessível a partir da qual de fato podemos amostrar (ex.: um diretório/ranking real, com suas próprias limitações e vieses) |
| **Sample** | o subconjunto efetivamente selecionado do sampling frame |
| **Benchmark core** | subconjunto deliberadamente selecionado (não aleatório) para profundidade analítica — não representa a população, representa diversidade de referência (v0.2 §27) |

A distinção entre *sampling frame* e *target population* é onde a maioria dos benchmarks informais falha silenciosamente: a lista disponível (ex.: um ranking público) nunca é a população-alvo real, sempre carrega viés de inclusão (seção 22).

---

## 5. Desenho Amostral

| Método | Quando apropriado | Limitação |
|---|---|---|
| Simple random sampling | sampling frame completo e acessível | raro em benchmarking digital — frames completos quase nunca existem |
| Stratified sampling | população heterogênea com estratos conhecidos (vertical, região, modelo de negócio) | requer que os estratos sejam bem definidos e não se sobreponham excessivamente |
| Cluster sampling | quando amostrar por grupos naturais reduz custo (ex.: por região) | aumenta erro-padrão se clusters forem internamente homogêneos |
| Systematic sampling | frame ordenado disponível (ex.: a cada N-ésima empresa de um ranking) | risco de padrão periódico oculto no frame |
| Purposive sampling | seleção deliberada por critério de relevância — é o método do Benchmark Core | não permite inferência estatística para a população |
| Quota sampling | garantir representação mínima por categoria sem randomização completa | mistura elementos de viés de seleção com estruturação |
| Matched sampling | comparação controlada entre grupos pareados por covariáveis | exige covariáveis bem definidas e dados suficientes para parear |
| Hybrid designs | combinação (ex.: estratificado + purposive dentro de cada estrato) | mais complexo de documentar e justificar |

**Decisão central:** **Benchmark Core** (v0.2 §27) usa **purposive sampling** — não é, e não pretende ser, estatisticamente representativo; é desenhado para diversidade e profundidade analítica. **Research Sample** (seção 7) usa **stratified sampling**, quando o objetivo é permitir inferência quantitativa. Forçar o mesmo método para ambos seria um erro metodológico — cada um responde a uma pergunta diferente.

---

## 6. Estratificação

Dimensões candidatas: **Vertical** (multi-valorado, seção 4); **Geography** (North America, Latin America, Europe, Asia-Pacific, outras quando justificadas); **Business Model** (B2B, B2C, B2B2C, SaaS, Marketplace, Services, E-commerce, Platform); **Reference Type** (Market Leader, Digital Leader, Design Reference, Technology Reference, Conversion Reference, Innovation Reference — v0.2 §3, também multi-valorado); **Company Size** (somente quando houver dado público confiável — não estimar); **Digital Maturity** (somente quando operacionalizável por critério explícito, não impressão subjetiva).

**Regra de contenção:** evitar estratificação excessiva. Cruzar todas as dimensões acima ingenuamente gera células amostrais vazias ou com n=1, inviabilizando qualquer análise estatística. Recomendação: usar no máximo 2 dimensões de estratificação simultânea por estudo (tipicamente Vertical × Reference Type, ou Vertical × Business Model), escolhidas conforme a pergunta de pesquisa específica (seção 16) — não estratificar por todas as dimensões de uma vez "para não perder informação".

---

## 7. Três Camadas de Amostra

| Camada | Tamanho ilustrativo | Método | Finalidade |
|---|---|---|---|
| **Layer 1 — Benchmark Core** | ~10–20 organizações | purposive (Candidate Selection Matrix, seção 15) | análise profunda: screenshots, UX/UI, conteúdo, conversão, performance, acessibilidade, tecnologia, revisão humana qualitativa. **Não** pretende representatividade estatística — profundidade e diversidade deliberada. |
| **Layer 2 — Research Sample** | ~50–150+ por universo/vertical, dependendo do cálculo (seção 8) | stratified/random dentro do sampling frame | medição quantitativa padronizada e mais automatizada: presença de mega-menu, tipo de CTA, pricing visível, social proof, structured data, sinais de acessibilidade, Core Web Vitals, sinais de tecnologia, itens de navegação, estrutura de hero, mecanismo de conversão. |
| **Layer 3 — Engineering Sample** | dependente de API/licença/custo/desenho (seção 17) | critérios de elegibilidade (seção 17) + amostragem dentro dos elegíveis | detectar padrões técnicos e práticas open-source (Track B). |

As três camadas **não são a mesma amostra em tamanhos diferentes** — servem propósitos metodológicos distintos e podem (e devem) ter composição parcialmente diferente.

---

## 8. Cálculo de Tamanho de Amostra

Para proporções, a fórmula de referência é:

```
n0 = Z² · p(1-p) / e²
```

com correção para população finita quando N (tamanho da população-alvo) é conhecido e relativamente pequeno:

```
n = n0 / [1 + (n0 - 1)/N]
```

Onde: **Z** = escore z associado ao nível de confiança desejado (ex.: 1.645 para 90%, 1.96 para 95%); **p** = proporção esperada do atributo estudado na população (desconhecida a priori, na dúvida usa-se 0.5 — cenário **conservador** que maximiza `n`, não uma suposição de que a proporção real é 50%); **e** = margem de erro tolerada; **N** = tamanho da população-alvo, quando conhecido.

### Cenários ilustrativos (p = 0.5, cenário conservador — apenas exemplos metodológicos)

| Confiança | Margem de erro | n (população infinita) |
|---|---|---|
| 90% | ±10% | ~68 |
| 90% | ±5% | ~271 |
| 95% | ±10% | ~96 |
| 95% | ±5% | ~384 |

> **Estes números são exemplos didáticos da fórmula, não o tamanho definitivo de amostra da ARKOS.** O `n` real de qualquer estudo específico só é calculado quando população-alvo, proporção esperada (se houver dado prévio) e margem de erro tolerada estiverem definidas para aquela pergunta de pesquisa específica — nunca aplicado genericamente a "o benchmark da ARKOS".

---

## 9. Power Analysis

Margem de erro (seção 8) é suficiente para estudos **descritivos** ("qual % da amostra tem X?"), mas **não** para estudos **comparativos** ("grupo A difere do grupo B?") — nesse caso, o parâmetro relevante é poder estatístico, não margem de erro.

Power analysis futura deve considerar: **alpha** (nível de significância, tipicamente 0.05); **statistical power** (1-β, tipicamente alvo ≥0.80); **effect size** esperado (a diferença mínima que importa detectar); **variância** da(s) variável(is); **número de grupos** comparados.

Exemplos de pergunta que exigem power analysis própria (não a mesma amostra do benchmarking descritivo): "Digital Leaders apresentam performance mobile superior a Market Leaders?"; "Empresas SaaS B2B usam determinado padrão de conversão com frequência diferente de empresas B2C?". **O tamanho amostral é recalculado por hipótese** — não existe um `n` único que sirva a todas as perguntas comparativas do sistema.

---

## 10. Unidade de Inferência — Evitando Pseudorreplicação

50 páginas da mesma empresa **não** equivalem a 50 empresas independentes — são observações aninhadas (nested), não réplicas independentes. Tratá-las como independentes infla artificialmente o `n` e produz intervalos de confiança falsamente estreitos.

Hierarquia de aninhamento: `Company → DigitalProperty → Page → Capture → Observation` (idêntica ao Core Data Model de v0.2 §24.1 — não é uma hierarquia nova).

**Regra:** antes de qualquer análise, declarar explicitamente qual é a unidade estatística da pergunta — empresa, domínio, página, componente, repositório, release ou observation. Perguntas sobre "quantas empresas fazem X" usam `Company` como unidade (uma observação por empresa, agregando suas páginas); perguntas sobre "quantas páginas apresentam X" usam `Page`/`PageVersion` como unidade, mas então a inferência é sobre páginas, não sobre empresas, e deve ser rotulada como tal. Quando a estrutura aninhada for relevante para a análise (ex.: variação entre empresas é maior que variação dentro da empresa), considerar modelos multilevel (seção 24) em vez de tratar tudo como observações planas.

---

## 11. Track B — Metodologia GitHub Engineering Sample

Fontes possíveis: organizações oficiais no GitHub, repositórios oficiais, GitHub API, metadados públicos, manifests (`package.json`, `pyproject.toml`, etc.), arquivos de configuração, documentação, estrutura de repositório. **Nenhuma coleta ocorre nesta etapa.**

Critérios de inclusão de repositório: `ownership` verificável (pertence comprovadamente à organização, não é fork não oficial); licença compatível com análise; atividade mínima (não abandonado); relevância declarada (relação com frontend/design system/platform engineering, não qualquer repositório da organização); linguagem/stack dentro do escopo de interesse; documentação suficiente para extrair sinais confiáveis.

---

## 12. Evitando Popularity Bias no GitHub

**Stars não equivalem a qualidade. Forks não equivalem a melhor engenharia. Número de contributors não equivale a arquitetura superior.** Esses três indicadores são artefatos de visibilidade e tempo de existência, não de qualidade de engenharia — um projeto interno excelente de uma empresa pouco conhecida pode ter poucas stars.

Uso correto: **variáveis auxiliares** (contexto, nunca prova) — podem compor `evidence_strength` ou `context_fit` (v0.2 §7) mas nunca sozinhas determinam `quality_assessment`. Critérios mais robustos: presença e maturidade de testes (unit/integration/E2E/acessibilidade), disciplina de CI/CD, qualidade e atualização de documentação, política de segurança e de contribuição declaradas, consistência de release strategy, uso de type system, presença de design system/Storybook quando aplicável a frontend.

---

## 13. Track B — Dicionário de Variáveis (Repositórios)

| Variável | Classe |
|---|---|
| repository_id | ESSENTIAL |
| organization_id | ESSENTIAL |
| company_id | ESSENTIAL (chave de ligação a Track A — pode ser UNKNOWN, seção 18) |
| repository_name | ESSENTIAL |
| repository_type | ESSENTIAL |
| license | ESSENTIAL |
| primary_language | ESSENTIAL |
| languages | USEFUL |
| framework | USEFUL |
| typescript (uso de TS) | USEFUL |
| package_manager | USEFUL |
| monorepo | USEFUL |
| design_system | USEFUL |
| storybook | USEFUL |
| component_library | USEFUL |
| unit_tests (presença) | USEFUL |
| integration_tests (presença) | USEFUL |
| e2e_tests (presença) | USEFUL |
| accessibility_tests (presença) | OPTIONAL — difícil de detectar de forma consistente sem inspeção profunda |
| linting | USEFUL |
| formatting | OPTIONAL |
| ci_cd (presença/plataforma) | USEFUL |
| containerization | OPTIONAL |
| documentation (presença/qualidade proxy, ex.: existência de README robusto) | USEFUL |
| release_strategy | OPTIONAL |
| security_policy (presença de SECURITY.md) | USEFUL |
| contribution_guide (presença) | OPTIONAL |
| codeowners (presença) | OPTIONAL |
| last_activity | ESSENTIAL (governa elegibilidade, seção 11) |
| stars | OPTIONAL — auxiliar, nunca prova (seção 12) |
| forks | OPTIONAL — idem |
| contributors (contagem) | OPTIONAL — idem |
| archived (status) | ESSENTIAL (governa elegibilidade) |

Removidos/rebaixados em relação à proposta original: `stars`/`forks`/`contributors` de possível uso implícito como qualidade para explicitamente **OPTIONAL/auxiliar** (seção 12); `accessibility_tests` rebaixada de USEFUL para OPTIONAL por dificuldade real de detecção consistente sem análise profunda de código, que está fora do escopo de "sinais publicamente observáveis" deste MVP metodológico.

---

## 14. Track A — Dicionário de Variáveis (Website)

| Variável | Classe |
|---|---|
| company_id | ESSENTIAL |
| vertical | ESSENTIAL |
| region | ESSENTIAL |
| business_model | ESSENTIAL |
| page_type | ESSENTIAL |
| navigation_type | USEFUL |
| navigation_items (contagem) | USEFUL |
| mega_menu (presença) | USEFUL |
| hero_type | USEFUL |
| primary_cta (texto/tipo) | ESSENTIAL |
| secondary_cta | USEFUL |
| cta_category (taxonomia controlada) | USEFUL |
| pricing_visible | USEFUL |
| social_proof (presença/tipo) | USEFUL |
| case_studies (presença) | USEFUL |
| video (presença) | OPTIONAL |
| animation (presença) | OPTIONAL |
| chat (presença) | USEFUL |
| ai_assistant (presença) | USEFUL |
| search (presença) | USEFUL |
| personalization (sinal observável) | OPTIONAL — difícil medir de forma consistente sem múltiplas sessões/contas |
| structured_data (presença/tipo) | ESSENTIAL |
| performance_metrics | ESSENTIAL |
| accessibility_metrics (sinais automatizados) | ESSENTIAL |
| technology_signals | USEFUL |

Nota: este dicionário é a operacionalização quantitativa das dimensões já definidas na Benchmark Taxonomy de v0.2 §4 — não é uma taxonomia nova e paralela, é o subconjunto dela que é **mensurável de forma consistente em escala** (Research Sample), distinto do exame qualitativo mais rico reservado ao Benchmark Core.

---

## 15. Tipos de Dado

| Grupo de variável | Tipo |
|---|---|
| presença binária (mega_menu, pricing_visible, chat, ai_assistant) | binary |
| categorias nominais (business_model, hero_type, page_type) | categorical |
| escalas ordenadas (quality_assessment 1–5, digital_maturity se operacionalizada) | ordinal |
| métricas contínuas (Core Web Vitals, tempos de carregamento) | continuous |
| contagens (navigation_items, contributors) | count |
| texto livre citável (excerpt_or_reference de Evidence) | text |
| calculado a partir de outras variáveis (selection_score, composite scores) | derived |

Essa tipagem é pré-requisito para a seleção de método estatístico correto (seção 24) — declarar o tipo antes de propor o teste, não depois.

---

## 16. Catálogo de Perguntas de Pesquisa

| Tipo | Exemplo |
|---|---|
| **Descriptive** | Qual percentual da amostra B2B apresenta pricing público? |
| **Comparative** | Há diferença na arquitetura de CTA entre B2B e B2C? |
| **Longitudinal** | Determinados padrões de navegação estão crescendo ao longo do tempo? |
| **Engineering** | Quais estratégias de teste aparecem com maior frequência em design systems públicos maduros? |
| **Cross-layer** | Existem associações observáveis entre determinadas práticas de engenharia pública e indicadores de qualidade da experiência digital? |

**Regra explícita:** perguntas Cross-layer **nunca** implicam causalidade — no máximo associação observada entre Track A e Track B para as empresas onde o Cross-Layer Linking (seção 18) é `VERIFIED`. Esta regra estende a regra de correlação≠causalidade já estabelecida em v0.2 §8.

---

## 17. Hypothesis Registry

Estrutura conceitual para registrar hipóteses **antes** da análise, reduzindo HARKing (Hypothesizing After Results are Known) — apresentar descoberta pós-hoc como se fosse previsão a priori:

```text
Hypothesis
├── hypothesis_id
├── research_question
├── population
├── unit_of_analysis
├── variables
├── null_hypothesis
├── alternative_hypothesis
├── analysis_method
├── alpha
├── power_target
├── effect_size_assumption
├── sample_requirement
├── status              # registered | testing | confirmed | rejected | inconclusive
└── created_at
```

Toda `Insight` (v0.2 §6) do tipo comparativo/inferencial que citar suporte estatístico deve, idealmente, referenciar um `hypothesis_id` registrado **antes** da análise que a gerou. Insights exploratórios (seção 18) não precisam desse vínculo, mas devem ser rotulados como exploratórios, não confirmatórios.

---

## 18. Exploratory vs. Confirmatory

**Exploratory Analysis** gera hipóteses — legítima e valiosa, mas não prova nada. **Confirmatory Analysis** testa hipóteses previamente registradas (Hypothesis Registry, seção 17). **Nunca apresentar descoberta exploratória como confirmação estatística** — todo `Insight` derivado de análise exploratória carrega rótulo explícito `exploratory`, distinto de `confirmatory`, no campo `scope`/`status` da entidade `Insight` (v0.2 §6).

---

## 19. Multiple Testing

Se centenas de variáveis forem analisadas contra múltiplas perguntas, a taxa de falso positivo agregada cresce (problema de comparações múltiplas). Métodos candidatos, **não aplicados automaticamente**: **FDR (False Discovery Rate)**, **Benjamini-Hochberg** (mais permissivo, adequado a exploração ampla), **Bonferroni** (mais conservador, adequado a poucas comparações pré-registradas de alta importância).

**Quando será necessário:** a partir do momento em que o sistema testar formalmente múltiplas hipóteses confirmatórias simultaneamente (Layer 2 Research Sample em escala) — não é necessário para o Benchmark Core (Layer 1), cujo objetivo é análise qualitativa profunda, não teste de hipóteses em massa.

---

## 20. Effect Size e Significância Prática

P-values isoladamente não bastam. Registrar, quando aplicável: **intervalos de confiança**, **effect size** (magnitude da diferença, não só sua detectabilidade) e **significância prática** — a ARKOS precisa saber se uma diferença importa para decisão de negócio/design, não apenas se é estatisticamente detectável. Um `p<0.05` com effect size desprezível não sustenta uma `Recommendation` (v0.2 §6) sem essa distinção explícita no relatório.

---

## 21. Missing Data

Situações comuns: página inacessível, métrica indisponível, repositório privado, tecnologia não detectável, rate limit de API, site bloqueado, falha de medição.

**Regra central: missing nunca é convertido automaticamente para "não"/`FALSE`.** Cinco estados distintos:

| Estado | Significado |
|---|---|
| `FALSE` | verificado ativamente que o atributo está ausente |
| `UNKNOWN` | não foi possível determinar, mas é potencialmente aplicável |
| `NOT_APPLICABLE` | o atributo não se aplica a este caso por definição |
| `NOT_MEASURED` | não houve tentativa de medir (fora de escopo daquela captura) |
| `FAILED` | houve tentativa de medir e ela falhou tecnicamente |

Esses estados devem ser preserváveis nos campos de `Observation`/`Metric` do Core Data Model (v0.2 §24.1) — nenhuma agregação estatística (seção 8, 24) deve tratar `UNKNOWN`/`NOT_MEASURED`/`FAILED` como equivalentes a `FALSE` no denominador de uma proporção, sob risco de subestimar sistematicamente a prevalência real.

---

## 22. Sampling Bias

Riscos mapeados: viés geográfico (US-centric); viés de empresa grande; viés SaaS; viés de idioma (inglês); survivorship bias (só empresas que sobreviveram/tiveram sucesso aparecem nos rankings/frames disponíveis); popularity bias (seção 12); GitHub open-source bias (nem toda boa engenharia é pública); technology-detection bias (ferramentas de fingerprint detectam melhor certas stacks que outras); selection bias (frame disponível ≠ população-alvo, seção 4); accessibility measurement bias (ferramentas automatizadas capturam só parte do WCAG).

**Mitigação geral:** (1) declarar explicitamente o sampling frame usado e suas limitações conhecidas em todo estudo; (2) diversificar deliberadamente fontes de descoberta de empresas (não usar um único ranking/diretório como frame único); (3) rotular todo achado com o alcance real de sua evidência (ex.: "observado nesta amostra, majoritariamente US/SaaS" em vez de generalizar silenciosamente); (4) tratar vieses não removíveis como limitação declarada do estudo, não como erro a esconder.

---

## 23. Temporal Bias e Snapshot Validity

Sites mudam, repositórios mudam, stacks mudam. Toda observação carrega timestamp (já garantido estruturalmente por `Capture.captured_at` e `PageVersion` em v0.2). **Snapshot validity**: uma `Observation` é válida como descrição do estado da empresa apenas na janela de tempo próxima à sua captura — não deve ser citada como fato atual indefinidamente sem revalidação.

**Regra:** não misturar, numa mesma análise comparativa/agregada, dados coletados em janelas temporais muito diferentes sem controle explícito (ex.: comparar hero de 2025 de uma empresa com hero de 2027 de outra sem marcar a assimetria temporal). Toda análise Longitudinal (seção 1) declara explicitamente a `collection_window` usada (ver Dataset Versioning, seção 25).

---

## 24. Mapa de Métodos Estatísticos

| Tipo de variável / pergunta | Métodos candidatos |
|---|---|
| Binary × categorical | contingency tables, chi-square, Fisher's exact test (quando células pequenas) |
| Continuous (descritivo) | média/mediana, intervalos de confiança |
| Continuous (2 grupos) | t-test (quando pressupostos permitirem), Mann-Whitney (alternativa não-paramétrica) |
| Continuous (3+ grupos) | ANOVA, Kruskal-Wallis (alternativa não-paramétrica) |
| Associação entre variáveis | correlação, regressão linear |
| Variável dependente binária | regressão logística |
| Dados aninhados (empresa→página, seção 10) | modelos multilevel, quando a escala da amostra justificar |
| Longitudinal | repeated measures, abordagens de painel, modelos de tendência |

**Nenhum teste é escolhido definitivamente nesta etapa** — este mapa orienta a escolha futura por pergunta específica; pressupostos de cada método (normalidade, homocedasticidade, independência) devem ser verificados no momento da análise, não assumidos a priori.

---

## 25. Mixed Methods

A metodologia ARKOS é explicitamente **mixed-methods**: estatística responde "quanto/com que frequência/há diferença?"; análise qualitativa responde "como/por quê/em qual contexto/com qual qualidade?". Nenhuma das duas sozinha produz o que a ARKOS precisa entregar a clientes.

```text
Quantitative Evidence (Research Sample, Layer 2)
+
Qualitative Evidence (Benchmark Core, Layer 1)
+
Human Expert Review (Knowledge Promotion Gate, v0.2 §15)
=====================================================
ARKOS Insight
```

Esta fórmula é a operacionalização metodológica do pipeline `Evidence → Pattern/Trend → Insight` já definido em v0.2 §6 — não um processo paralelo.

---

## 26. Classificação de Padrões — Taxonomia Metodológica

A proposta original introduzia sete rótulos (Observation, Recurring Pattern, Sample Pattern, Reference Practice, Emerging Signal, Market Pattern, ARKOS Best Practice) como se fossem entidades novas. **Crítica:** isso duplicaria/conflitaria com o modelo já aprovado em v0.2 (`Evidence`, `Pattern`, `Trend`, `Insight`, `Recommendation`). A melhoria adotada aqui trata os sete rótulos como **níveis de maturidade metodológica de um `Pattern`/`Insight` já existente**, não como novas tabelas:

| Rótulo | Mapeamento para o modelo v0.2 | Requisito para usar o rótulo |
|---|---|---|
| **Observation** | entidade `Observation` (já existe) | ocorrência individual, sem agregação |
| **Recurring Pattern** | `Pattern` com `frequency` > limiar mínimo, sem exigência de desenho amostral formal | repetição observada, tipicamente no Benchmark Core |
| **Sample Pattern** | `Pattern` quantificado a partir do Research Sample (Layer 2), com `prevalence` calculada sobre um `n` declarado | requer amostra declarada, não necessariamente representativa da população |
| **Reference Practice** | `Pattern` com `quality_assessment` favorável e `context_fit` documentado (v0.2 §7), tipicamente do Benchmark Core | avaliação qualitativa explícita, não apenas frequência |
| **Emerging Signal** | `Trend` com `trend_direction` crescente mas `confidence` ainda baixa | evidência longitudinal insuficiente para classificação forte — rótulo explicitamente provisório |
| **Market Pattern** | `Pattern`/`Trend` que satisfaz o Market Pattern Gate (seção 27) | ver gate — é o rótulo mais exigente da tabela |
| **ARKOS Best Practice** | entidade `Recommendation` (já existe, v0.2 §7) | julgamento profissional aplicado, sustentado por múltiplas fontes de evidência — nunca decorre automaticamente de alta prevalência (v0.2 §7/§12, AD-12) |

Esta reconciliação preserva a riqueza semântica da proposta original sem introduzir seis entidades novas conflitantes com o Data Model já aprovado — os sete rótulos tornam-se **valores de um atributo de maturidade** (`pattern_class` ou equivalente) sobre `Pattern`/`Trend`/`Insight`/`Recommendation` já existentes.

---

## 27. Market Pattern Gate

Requisitos mínimos para usar publicamente a expressão **"Market Pattern"** (o rótulo mais forte da seção 26, o único que carrega pretensão de generalização para uma população):

- população claramente definida (seção 4);
- sampling frame defensável e declarado, com limitações explícitas (seção 22);
- amostragem adequada à pergunta (seção 5);
- tamanho amostral calculado para a pergunta específica (seção 8), não emprestado de outro estudo;
- cobertura mínima dos estratos relevantes (seção 6);
- tratamento explícito de missing data (seção 21), não ignorado no denominador;
- intervalo de confiança reportado junto à proporção/estimativa;
- robustez mínima (o achado não desaparece com pequenas variações de amostra);
- validade temporal declarada (seção 23) — o padrão é atual, não uma mistura de janelas.

**Se qualquer requisito não for atendido**, usar linguagem mais restrita — "Sample Pattern", "Recurring Pattern" ou "Emerging Signal" (seção 26), conforme o que a evidência realmente sustenta.

---

## 28. Benchmark Core Selection — Metodologia

Estende a Benchmark Candidate Selection Matrix já definida em v0.2 §27 com dimensões adicionais voltadas à seleção de 10–20 referências profundas:

```text
Company
Vertical
Region
Business Model
Market Leadership
Digital Leadership
Design Reference
Technology Reference
Conversion Reference
Innovation Reference
Evidence Quality
Distinctiveness
Redundancy Penalty
Selection Score
Selection Rationale
```

`Distinctiveness` e `Redundancy Penalty` são as adições desta revisão: penalizam candidatos que replicam categorias já bem cobertas por empresas já selecionadas, reforçando o princípio de v0.2 §27 de maximizar diversidade analítica em vez de preencher uma grade fixa. **Nenhuma empresa é selecionada nesta etapa** — a matriz é o instrumento, a execução é trabalho futuro de pesquisa atualizada.

---

## 29. Research Sample Selection — Metodologia

A Research Sample (Layer 2) **não reutiliza** o Benchmark Core — responde a uma pergunta diferente (medição quantitativa em escala vs. profundidade qualitativa) e por isso precisa de metodologia própria:

- **Sampling frame:** fonte(s) declarada(s) de onde a amostra quantitativa será extraída (a definir por estudo — diretórios setoriais, rankings de analistas, listas de associações setoriais, etc., cada um com viés próprio a documentar).
- **Strata:** definidos por estudo, respeitando a regra de contenção da seção 6.
- **Inclusion criteria:** presença digital ativa mínima, idioma/região dentro do escopo do estudo, verticalidade confirmável.
- **Exclusion criteria:** empresas sem site público funcional, sites majoritariamente atrás de autenticação, empresas sem verticalidade clara.
- **Randomização:** aplicada dentro de cada estrato quando o objetivo for inferência (stratified random sampling); não aplicada quando o objetivo for cobertura purposiva de um estrato pequeno.
- **Replacement policy:** empresa excluída pós-seleção (ex.: site fora do ar na coleta) é substituída por sorteio dentro do mesmo estrato, nunca por conveniência.
- **Nonresponse/failure policy:** capturas com `FAILED` (seção 21) são registradas, não silenciosamente excluídas do denominador — taxa de falha é reportada como métrica de qualidade do estudo.

---

## 30. Engineering Sample Selection — Metodologia

- **Organization selection:** organizações com repositórios oficiais verificáveis (seção 11), priorizando as já vinculadas a empresas do Benchmark Core/Research Sample via Cross-Layer Linking (seção 18) sobre descoberta aberta não vinculada, no MVP.
- **Repository selection:** dentro de cada organização elegível, aplicar critérios de inclusão (seção 11) e excluir explicitamente: forks não oficiais, mirrors, repositórios gerados automaticamente, repositórios educacionais/de exemplo, forks de dependências de terceiros, monorepos tratados com cuidado especial (contam como uma unidade de análise, não como N repositórios).
- **Regra de não-inflação:** múltiplos repositórios triviais/pouco relevantes da mesma organização não devem ser contados como observações independentes — aplica-se a mesma lógica de pseudorreplicação da seção 10 (unidade de inferência é tipicamente a organização ou um repositório "principal" declarado, não cada repositório trivial).

---

## 31. Cross-Layer Linking

Conecta, quando houver evidência, `Company ↔ Website ↔ GitHub Organization ↔ Repository`. Estados permitidos:

| Estado | Significado |
|---|---|
| `VERIFIED` | vínculo confirmado por evidência explícita (ex.: link para o GitHub a partir do site oficial, ou vice-versa) |
| `UNVERIFIED` | vínculo plausível mas não confirmado por evidência direta |
| `UNKNOWN` | não investigado ou não determinável |

**Nunca forçar associação** — perguntas Cross-layer (seção 16) só usam pares `VERIFIED`, nunca `UNVERIFIED`/`UNKNOWN`, evitando que a Regra de Não Equivalência (seção 3) seja violada silenciosamente por inferência automática.

---

## 32. Reprodutibilidade

Elementos que precisam ser versionados para que uma análise seja reproduzível no futuro: metodologia de amostragem (este documento); candidate registry; critérios de inclusão/exclusão; dicionário de variáveis (seções 13–14); taxonomia (v0.2 §4); rubric (v0.2 §16); hypothesis registry (seção 17); scripts de análise (quando existirem, fase de implementação); versão do dataset (seção 33); timestamp de coleta.

Alinhado à Storage Boundary já definida em v0.2 §23 — todos esses elementos são texto/config versionável em Git, não dados operacionais de banco.

---

## 33. Dataset Versioning

```text
DatasetRelease
├── dataset_version
├── created_at
├── collection_window
├── sampling_method_version
├── variable_dictionary_version
├── taxonomy_version
├── included_entities
├── exclusions
└── notes
```

Não implementado nesta etapa — é a especificação conceitual do que permitirá, no futuro, dizer exatamente "esta análise usou o dataset vX, coletado na janela Y, com o dicionário de variáveis versão Z" — pré-requisito de reprodutibilidade (seção 32) e de snapshot validity (seção 23).

---

## 34. ARKOS Sample Size Calculator — Especificação

Módulo futuro, **não programado nesta etapa**. Deve receber: population size, confidence level, margin of error, expected proportion, study type (descritivo/comparativo), número de grupos, effect size esperado, power. Deve retornar: required sample, assumptions utilizadas, limitações explícitas do cálculo (ex.: "válido apenas se p realmente próximo do assumido"). Esta especificação formaliza a fórmula da seção 8 e a power analysis da seção 9 como uma futura ferramenta reutilizável, evitando recalcular manualmente e de forma inconsistente a cada estudo.

---

## 35. Escala Proposta — Crítica aos Números

Arquitetura conceitual de funil, **não valores definitivos**:

```text
GLOBAL DISCOVERY UNIVERSE
500–5,000+ organizations
        ↓
SAMPLING FRAME
        ↓
RESEARCH SAMPLE
50–300+ per research question/stratum
        ↓
BENCHMARK SAMPLE
30–100
        ↓
BENCHMARK CORE
10–20
        ↓
DEEP ANALYSIS
```

Para GitHub: `Organizations → Eligible repositories → Engineering Sample → Repository-level measurements → Patterns`.

**Crítica:** estes números são plausíveis como ordem de grandeza, mas **não substituem o cálculo da seção 8** — "Research Sample: 50–300+" não é um alvo, é o intervalo dentro do qual o cálculo real (dependente de N, confiança, margem de erro e p de cada estudo específico) provavelmente cairá. O funil é útil como comunicação de arquitetura de escala, não como regra de dimensionamento. Não devem ser tratados como metas fixas em planejamento operacional sem o cálculo correspondente.

---

## 36. Implicações para Automação Futura

Esta metodologia reformula o que o crawler precisa fazer — não é necessário deep capture de 500 sites toda semana:

```text
Broad automated measurement (Research Sample, leve)
        ↓
Change detection (v0.2 §12, cascata)
        ↓
Sampling/prioritization (quais mudanças merecem atenção)
        ↓
Deep capture (Benchmark Core, v0.2 §13)
        ↓
Human review (Knowledge Promotion Gate, v0.2 §15)
```

Isso reduz custo, armazenamento, processamento, carga sobre os sites analisados e volume de análise humana necessária — a metodologia de amostragem é, portanto, também uma estratégia de contenção de custo operacional, não apenas rigor acadêmico.

---

## 37. Ética, Legal e Licenciamento

**GitHub/Track B:** respeitar licença de cada repositório; respeitar ToS e rate limits da API; atribuição quando aplicável; não redistribuir código-fonte protegido por copyright além do necessário para citar um padrão; nunca acessar repositórios privados; nunca coletar secrets expostos acidentalmente (e reportar, não explorar, se encontrados). **Objetivo central: extrair métricas e padrões, não criar cópias permanentes indiscriminadas de código de terceiros.**

**Websites/Track A:** mantidas as regras de coleta responsável já aprovadas em v0.1 §11/§20 e `references/benchmark-protocol.md` — robots.txt, ToS, rate limits, sem bypass de autenticação/CAPTCHA/paywall.

---

## 38. Outputs Futuros (não criados agora)

A metodologia deve suportar, quando e se justificável: ARKOS Digital Experience Index (somente se metodologicamente sustentável — requer satisfazer o Market Pattern Gate, seção 27, para qualquer componente que pretenda generalizar); ARKOS Engineering Practices Report; Sector Benchmark Reports; Pattern Reports; Trend Reports; Technology Landscape; Design System Intelligence; Client Benchmark; Competitive Intelligence; ARKOS Knowledge Base (a camada já prevista em v0.2 §19).

---

## 39. Productization

Tratada como hipótese, não decisão — consistente com v0.2 §32 (Phase 6). Avaliar futuramente: relatórios vendáveis, subscription intelligence, consultoria baseada em achados, benchmark reports, SaaS, APIs, datasets proprietários. **Não assumir viabilidade jurídica ou comercial de venda de dados** — isso depende de revisão legal/comercial própria, fora do escopo deste documento metodológico.

---

## Open Questions

- Sampling frames concretos por vertical (quais diretórios/rankings serão de fato usados, e quais vieses cada um introduz) — depende de pesquisa a ser feita na execução, não decidível a priori.
- Proporção esperada (`p`) por variável de interesse, quando existir dado prévio, para tornar o cálculo de amostra (seção 8) menos conservador que o padrão p=0.5.
- Orçamento e limites operacionais (API GitHub, ferramentas de medição de performance/acessibilidade) que restringirão o tamanho prático da Research Sample e da Engineering Sample.
- Quem detém autoridade metodológica para aprovar o uso do rótulo "Market Pattern" (Market Pattern Gate, seção 27) em material publicado.
- Threshold mínimo de `frequency`/`confidence` para um `Pattern` ser rotulado "Recurring Pattern" vs. permanecer "Observation" isolada — não definido nesta etapa, depende de calibração empírica.
- Detalhamento futuro de `EngineeringObservation` como extensão de `Evidence.source_type` (v0.2 §5.2) — mencionado conceitualmente aqui, especificação completa de campos fica para quando Track B entrar em execução.

---

## Recommended Next Step

Não implementar. Próximo passo recomendado: submeter esta metodologia a aprovação (Gate metodológico), e então priorizar a definição do primeiro **sampling frame real** de um vertical (ex.: Business/B2B) como piloto do cálculo de amostra da seção 8 — antes de aplicar a mesma lógica aos demais verticais ou ao Track B.
