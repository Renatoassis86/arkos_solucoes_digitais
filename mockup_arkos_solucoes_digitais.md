# MOCKUP ESTRUTURADO & BLUEPRINT ARQUITETURAL
# ARKOS SOLUÇÕES DIGITAIS

> **Fundamentação Técnica:** Documento desenvolvido a partir da consolidação do benchmark empírico de 504 empresas globais e das 14 maiores agências de engenharia e design de produto do mundo (*Work & Co, Metalab, Instrument, Huge, Locomotive, Pentagram, Bolha, Programatório*), calibrado com o estilo de redação autoral e humano conforme o `Prompt_mestre_escrita_academica_humana.md`.

---

## 1. Posicionamento de Marca & Diretriz de Redação Humana

### 🚫 O Que Não Faremos (Eliminação de Clichês de IA e Jargões Vazios)
* **Sem adjetivação hiperbólica:** Proibido usar "revolucionário", "transformação 360°", "soluções disruptivas de ponta", "magia digital".
* **Sem ilustrações ou estética sci-fi:** Nada de robôs brilhantes, mãos de ciborgue, linhas neon ou hologramas flutuantes.
* **Sem falsos testemunhais:** Não inventar depoimentos fictícios de empresas inexistentes.

### ✅ O Que Faremos (Autoridade Intelectual, Rigor e Clareza)
* **Voz Sóbria e Precisa:** Tom de estúdio técnico sênior e consultoria de tecnologia focada em resolver gargalos reais de negócio.
* **Fotografia Documental Realista:** Imagens de mesas de design autênticas, cadernos com wireframes desenhados à mão, telas de arquitetura de dados limpas e sessões reais de alinhamento em quadros brancos.
* **Estrutura Baseada em Evidências:** Foco no método, nas capacidades modulares de engenharia e na redução de atrito entre a decisão do usuário e o resultado do cliente.

---

## 2. Paleta de Cores, Tokens Visuais e Pareamento Tipográfico

```markdown
┌───────────────────────┬─────────────────────────────────────────────────────────────┐
│ Token de Design       │ Valor Hexadecimal & Aplicação                               │
├───────────────────────┼─────────────────────────────────────────────────────────────┤
│ Fundo Primário        │ #0A0B0D (Preto Carvão Profundo - Base do site)              │
│ Fundo Secundário      │ #13151A (Superfície de Cards, Bento Boxes e Headers)        │
│ Linhas e Divisores    │ 1px solid rgba(255, 255, 255, 0.08) (Contraste fino)        │
│ Texto Principal       │ #F4F5F7 (Branco Neve de Alta Leiturabilidade)               │
│ Texto Secundário      │ #94A3B8 (Cinza Neutro para Subtítulos e Metadados)          │
│ Acento de Ação        │ #2563EB (Azul Cobalto de Engenharia para CTAs de Destaque)  │
│ Acento Secundário     │ #F59E0B (Âmbar Técnico para Badges, Status e Métricas)      │
└───────────────────────┴─────────────────────────────────────────────────────────────┘
```

### Pareamento Tipográfico
1. **Títulos (Display & H1/H2):** `Inter` (Font-Weight 600) ou `TWK Lausanne` com kerning ajustado (`letter-spacing: -0.02em`).
2. **Corpo de Texto (P):** `Inter` (Font-Weight 400), altura de linha generosa (`line-height: 1.65`) para máxima absorção cognitiva.
3. **Labels Técnicos, Badges e Tags de Categoria:** `JetBrains Mono` ou `Roboto Mono` em caixa alta com espaçamento expandido (`letter-spacing: 0.08em`).

---

## 3. Arquitetura de Navegação & Topo (Header Fixo)

```markdown
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [ARKOS / Soluções Digitais]       Soluções    •    Princípios    •    Método    •    Sobre    [ Iniciar Conversa ] │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

* **Comportamento:** Fixo no topo (*sticky*), fundo em vidro fosco (*glassmorphism* leve: `backdrop-filter: blur(12px)` e `background: rgba(10, 11, 13, 0.85)`).
* **Itens de Menu:**
  - `Soluções` (Âncora para o catálogo modular com filtros).
  - `Princípios` (Âncora para os 4 compromissos operacionais da agência).
  - `Método` (Âncora para o ciclo em 10 etapas da Arkos).
  - `Sobre` (Posicionamento institucional e governança).
  - `Botão CTA:` `[ Iniciar Conversa ]` (Direciona para o formulário de briefing técnico).

---

## 4. Diagramação Anatômica do Site (Dobra por Dobra)

```markdown
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ DOBRA 1: HERO SECTION                                                                                    │
│ - Headline Direta + Proposta de Valor Concreta                                                           │
│ - Fotografia Documental: Workspace com Wireframes e Sistema de Design                                    │
│ - Duplo CTA: [ Consultar Soluções ] + [ Conhecer Nosso Método ]                                          │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DOBRA 2: PILARES & PRINCÍPIOS DE ENGENHARIA (Craft com Função, Escassez, Dados, Legibilidade)           │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DOBRA 3: CATÁLOGO MODULAR DE SOLUÇÕES DIGITAIS COM FILTRO POR CATEGORIA                                  │
│ - Filtros: [ Todas | Experience & Growth | Platforms & Data | AI & Automation | Advisory ]              │
│ - Cards Modulares com Sub-Capacidades Reais                                                              │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DOBRA 4: PLATAFORMAS & INTELIGÊNCIA DE DADOS (Visual de Painel Analítico Real)                           │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DOBRA 5: O MÉTODO ARKOS (10 Etapas: Discover -> Scale com Numeração Monospaçada)                        │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DOBRA 6: ADVISORY & ALINHAMENTO TÉCNICO (Foto Documental de Reunião Arquitetural)                        │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DOBRA 7: FORMULÁRIO DE BRIEFING TÉCNICO & RODAPÉ INSTITUCIONAL                                           │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Estrutura Textual & Visual Detalhada por Dobra

### DOBRA 1: HERO SECTION
* **Layout:** Grid assimétrico de 2 colunas. Coluna esquerda com a narrativa de autoridade; coluna direita com a imagem documental de craft.
* **Texto Autoral (Conforme Diretrizes Humanas):**
  - `Badge / Tag Superior:` `[ ENGENHARIA DE SOFTWARE & EXPERIÊNCIA DIGITAL ]`
  - `Headline H1:` **"Desenhamos e construímos produtos digitais orientados a dados, clareza técnica e conversão real."**
  - `Subheadline P:` *"Substituímos o achismo estético por rigor de engenharia. Criamos sites de alta performance, plataformas sob medida e automações de dados desenhadas para acelerar a operação do seu negócio."*
  - `Ações (CTAs):`
    - `[ Ver Nossas Soluções ]` (Botão Azul Cobalto `#2563EB`)
    - `[ Entenda Nosso Método → ]` (Botão Ghost com Borda Sutil)
* **Imagem Integrada:** `assets/hero_workspace.jpg`
  - *Contexto:* Fotografia autêntica de mesa de trabalho de madeira clara com iPad exibindo wireframes, caderno de anotações com fluxogramas à mão, xícara de café e laptop com design system limpo sob luz natural matinal.

---

### DOBRA 2: PILARES & PRINCÍPIOS OPERACIONAIS
* **Layout:** Grid de 4 colunas horizontais com separadores em linha fina.
* **Conteúdo Textual:**
  1. **Craft com Função:** *"Rigor visual e engenharia andam juntos. Nada aqui é decoração sem propósito técnico e conversão por trás."*
  2. **Escassez Deliberada:** *"Um sistema de cor restrito, com acento usado onde importa — sem excessos visuais, sem poluição de tela."*
  3. **Dados desde o Design:** *"Plano de medição e telemetria definido antes do lançamento. Métrica é parte do projeto, não um relatório tardio."*
  4. **Legibilidade Humana e de Máquina:** *"Experiência fluida para o usuário final sem abrir mão de SEO técnico rigoroso, acessibilidade e performance."*

---

### DOBRA 3: CATÁLOGO MODULAR DE SOLUÇÕES (COM FILTROS ATIVOS)
* **Layout:** Barra de abas horizontais com botões de filtro (`Todas`, `Experience & Growth`, `Platforms & Data`, `AI & Automation`, `Advisory`) seguida por Bento Grid de cards modulares.
* **Módulos de Serviço:**
  * **1. Digital Experience & Websites:** *"Reduz a distância entre visitante e decisão — desenhado para conversão, não apenas para existir."*
    - *Capacidades:* Sites institucionais, Landing ecosystems, E-commerce, Design systems, Acessibilidade & SEO técnico.
  * **2. Growth Technology:** *"Transforma tráfego em pipeline — atribuição real de receita em vez de métricas de vaidade."*
    - *Capacidades:* SEO programático, Automação de marketing, Integrações de CRM, Atribuição multitoque.
  * **3. Software & Custom Platforms:** *"Substitui planilhas e retrabalho por sistemas sob medida para o fluxo da sua empresa."*
    - *Capacidades:* Aplicações web modernas (Next.js/React), Portais de cliente, Dashboards operacionais, APIs robustas.
  * **4. Data & Intelligence:** *"Troca opiniões por evidência empírica — dados organizados e prontos para orientar a próxima decisão."*
    - *Capacidades:* Pipelines de dados (ETL/ELT), BI e analytics de produto, Modelos preditivos, Decision-support.
  * **5. AI & Workflow Automation:** *"Elimina o trabalho repetitivo — IA aplicada onde resolve gargalos, não onde é apenas moda."*
    - *Capacidades:* Agentes autônomos, RAG com base de conhecimento interna, Extração de documentos, Automação de fluxos.
  * **6. Technology Advisory (CTO as a Service):** *"Reduz o risco técnico antes que ele vire prejuízo financeiro — governança contínua."*
    - *Capacidades:* Due diligence técnica, Arquitetura em nuvem, Segurança e conformidade, Observabilidade & FinOps.

---

### DOBRA 4: PLATAFORMAS & ENGENHARIA DE DADOS
* **Layout:** Seção em destaque de 2 colunas. Lado esquerdo com narrativa de governança de dados; lado direito com o painel de monitoramento real.
* **Texto Autoral:**
  - `Badge:` `[ DECISÃO BASEADA EM EVIDÊNCIAS ]`
  - `Headline H2:` **"Infraestrutura de dados desenhada para dar visibilidade total à sua operação."**
  - `Parágrafo:` *"Não entregamos apenas código; estruturamos pipelines que medem cada interação, taxa de conversão e comportamento de usuário. Sua empresa ganha clareza factual para tomar decisões estratégicas com segurança."*
* **Imagem Integrada:** `assets/data_dashboard.jpg`
  - *Contexto:* Monitor de estúdio profissional exibindo um painel real de engenharia de dados e taxas de conversão com gráficos limpos em escala de cinza, sem luzes de neon.

---

### DOBRA 5: O MÉTODO ARKOS (10 ETAPAS ESTRUTURADAS)
* **Layout:** Linha do tempo horizontal / Grid modular de 5x2 passos com numeração monospaçada (`01`, `02` ... `10`).
* **Etapas:**
  1. `01. Discover:` *"Mapear organização, usuários, dores reais, restrições e sistemas legados."*
  2. `02. Research:` *"Investigar mercado, concorrentes diretos, benchmarks e padrões técnicos consolidados."*
  3. `03. Strategize:` *"Definir posicionamento, proposta de valor, arquitetura de conversão e KPIs."*
  4. `04. Design:` *"Prototipar jornadas, arquitetura de informação, UX, wireframes e design system modular."*
  5. `05. Architect:` *"Especificar requisitos técnicos, modelo de banco de dados, integrações de API e stack de segurança."*
  6. `06. Build:` *"Desenvolver em código limpo, componentizado, responsivo e com padrões de engenharia modernos."*
  7. `07. Validate:` *"Auditar usabilidade, acessibilidade (WCAG), performance (Lighthouse 95+) e segurança."*
  8. `08. Launch:` *"Deploy em nuvem de alta disponibilidade, configuração de DNS, analytics e treinamento de equipe."*
  9. `09. Measure:` *"Monitorar métricas de carregamento, conversão de formulários e saúde dos pipelines."*
  10. `10. Scale:` *"Iterar com base no comportamento real dos usuários, expandindo recursos de forma contínua."*

---

### DOBRA 6: CONSULTORIA & ALINHAMENTO TÉCNICO (ADVISORY)
* **Layout:** Grid de 2 colunas invertido. Lado esquerdo com fotografia de colaboração técnica real; lado direito com a proposta de governança contínua.
* **Texto Autoral:**
  - `Headline H2:` **"Parceria técnica contínua para apoiar a liderança da sua empresa."**
  - `Parágrafo:` *"Apoiamos sua equipe na definição de prioridades, na escolha de tecnologias adequadas e na garantia de que cada investimento em software gere valor direto para o negócio."*
* **Imagem Integrada:** `assets/advisory_alignment.jpg`
  - *Contexto:* Fotografia editorial documental de uma sessão de revisão de arquitetura entre designer e arquiteto de software em estúdio de iluminação natural com quadro branco estruturado.

---

### DOBRA 7: FORMULÁRIO DE BRIEFING TÉCNICO & RODAPÉ
* **Layout:** Bloco de fechamento centralizado com campos de triagem rápida de projeto.
* **Campos do Briefing Técnico:**
  1. *Nome do Responsável & Empresa*
  2. *E-mail Corporativo & WhatsApp*
  3. *Qual o objetivo principal do projeto?* (`Novo Site Institucional` | `Plataforma Web / SaaS` | `Automação de Dados / IA` | `Consultoria Técnica`)
  4. *Prazo estimado e orçamento previsto*
  5. `Botão de Envio:` `[ Enviar Briefing para Avaliação Técnica ]`
* **Rodapé Institucional:**
  - Colunas: **Soluções**, **Método**, **Governança**, **Contato**.
  - Informações de conformidade: *LGPD compliant, Next.js Stack, SWEBOK-aligned engineering, Belo Horizonte / Brasil*.

---

## 6. Banco de Prompts Realistas para ChatGPT / DALL-E / Midjourney

Caso deseje gerar novas variações de imagens no ChatGPT ou Midjourney, utilize estes prompts calibrados para manter a estética documental autêntica e sem clichês:

### 📸 Prompt 1: Workspace de Design & Engenharia (Hero Asset)
> **Prompt em Inglês:**  
> `Documentary architectural photography of a minimalist digital product studio workspace. Clean oak wood desk with an iPad displaying clean UX wireframes, a structured moleskine notebook with technical flowcharts hand-drawn with black pen, an espresso cup, and a modern sleek laptop showing a clean SaaS typography design system in Figma. Soft natural window light, subtle indoor plants, professional studio atmosphere, no futuristic sci-fi tropes, no neon glow, crisp focus, Hasselblad medium format look --ar 16:9`

### 📸 Prompt 2: Painel de Dados & Métricas Reais (Data Systems Asset)
> **Prompt em Inglês:**  
> `High-detail macro photograph of a professional matte studio monitor displaying a real-time data engineering and conversion analytics dashboard. Clean monochrome line charts, accurate tabular typography, and dark UI interface. Minimalist studio background with warm soft ambient light, authentic hardware, no holograms, no neon elements, realistic software engineering context --ar 16:9`

### 📸 Prompt 3: Alinhamento Estratégico em Estúdio (Advisory Asset)
> **Prompt em Inglês:**  
> `Authentic editorial candid photography of a technical architecture review in a modern design studio. A software engineer and a UX designer discussing a clean system architecture diagram on a real dry-erase whiteboard. Natural daylight from high factory windows, raw concrete wall, clean wooden meeting table with laptops and paper notebooks. Serious, focused and collaborative atmosphere, 35mm documentary aesthetic --ar 16:9`
