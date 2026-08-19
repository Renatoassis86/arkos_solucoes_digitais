# ARKOS Discovery & Briefing System v0.1

```
Status: Template ativo — primeiro produto do sistema ARKOS de captação de demanda
Uso: aplicar a cada novo projeto/cliente antes de qualquer decisão de Design/Architect
Substitui: nenhum documento anterior — este é o ponto de entrada de todo novo trabalho ARKOS
```

Este documento tem duas partes que **não devem ser confundidas** — é o erro mais comum em processos de briefing de agência:

1. **Questionário de Discovery** (INPUT) — o instrumento que o cliente preenche/responde em entrevista. Este documento tem a estrutura completa dele.
2. **Síntese de Briefing** (OUTPUT) — o documento que a equipe ARKOS escreve *depois*, traduzindo as respostas em direção acionável para estratégia, design, engenharia e dados/IA. Um questionário respondido não é um briefing — é matéria-prima.

## Por que este processo existe (e por que a maioria falha)

Só 23–30% das empresas relatam benefício tangível ou diferenciação real de seus investimentos em experiência de cliente — a maioria dos projetos entrega algo tecnicamente correto e comercialmente esquecível. A causa mais citada não é falta de talento de execução: é discovery raso, que troca entendimento real da demanda por suposição disfarçada de brief.

Do outro lado, produtos desenvolvidos com metodologia Jobs-to-be-Done (que investiga a *força motriz* por trás de uma decisão, não a lista de features desejada) reportam taxa de sucesso de inovação de 86%, contra 17% de abordagens tradicionais orientadas a feature list. A diferença não é criatividade — é a qualidade da pergunta feita no início.

Este sistema existe para que a ARKOS nunca comece um projeto por suposição.

---

# PARTE 1 — Questionário de Discovery (cliente responde)

Regra de uso: não é obrigatório usar as 11 seções em todo projeto — mas pular uma seção deve ser uma decisão consciente registrada na Síntese (Parte 2), nunca um esquecimento. Perguntas entre colchetes `[assim]` são orientação de como conduzir a pergunta em entrevista, não texto para copiar literalmente ao cliente.

## 1 — O Problema Real (não a "ideia do site")

A maioria dos briefings começa por "queremos um site novo". Isso é a solução, não o problema. Comece pelo momento em que o problema ficou insustentável — método Jobs-to-be-Done ("switch moment"):

- Conte sobre a última vez em que o jeito atual de fazer isso parou de funcionar bem o suficiente. O que aconteceu naquele momento específico?
- O que estava acontecendo no negócio quando isso ficou urgente — por que agora, e não três meses atrás ou daqui a seis meses?
- Como vocês vêm lidando com isso até hoje? O que está quebrando nesse jeito atual?
- Que outras alternativas vocês consideraram seriamente — incluindo não fazer nada?
- O que parece arriscado ou incômodo em mudar isso agora?
- O que precisa acontecer para vocês confiarem que a solução realmente funcionou?

## 2 — Quem Decide de Verdade

Pergunta que a maioria das agências evita fazer e paga caro depois:

- Quem tem poder de veto sobre design? Sobre escopo? Sobre orçamento? São a mesma pessoa?
- Existe alguém que vai ver o resultado só na entrega final e pode discordar de tudo?
- Quantas pessoas precisam aprovar antes de algo ir ao ar?

## 3 — O Job a Ser Feito (não a persona de estoque)

Descreva quem usa isso em termos reais e operacionais — não "Maria, 34 anos, gosta de café" — algo como "gerente de operações em empresas de 50–500 funcionários avaliando ferramentas de fluxo de trabalho".

- Job funcional: o que a pessoa está literalmente tentando realizar?
- Job emocional: como ela quer se sentir enquanto faz isso (no controle? aliviada? impressionada?)
- Job social: como ela quer ser vista por fazer isso (competente? inovadora? cautelosa?)
- Existe mais de um tipo de usuário com jobs diferentes e às vezes conflitantes? Nomeie todos.

## 4 — O Que é Sucesso (definido antes de qualquer decisão visual)

Sem isso, toda decisão de design vira questão de gosto pessoal, não de resultado.

- Em 90 dias após o lançamento, o que precisa ser verdade para vocês chamarem isso de sucesso?
- Existe uma métrica de negócio específica (não "mais bonito", não "mais moderno")?
- Se só pudéssemos melhorar UMA métrica, qual seria?

## 5 — Paisagem Competitiva e de Referência

Não perguntamos "quem são seus concorrentes" de forma genérica — cruzamos isso com metodologia própria de benchmark da ARKOS (categorias: Market Leader, Digital Leader, Design Reference, Technology Reference, Conversion Reference, Innovation Reference).

- Cite 3 experiências digitais (de qualquer setor, não precisa ser concorrente direto) que vocês admiram — e por quê, especificamente.
- Cite 3 experiências que vocês NÃO querem parecer, mesmo que sejam referência de mercado.
- Existe um concorrente direto que já resolveu parte desse problema melhor que vocês hoje?

## 6 — Direção de Marca e Design

- Existe brand book/manual de marca hoje? Está atualizado ou defasado da realidade da empresa?
- Três palavras que a marca DEVE transmitir. Três palavras que a marca NUNCA pode transmitir.
- Existe algum elemento visual (cor, tipografia, forma) que é inegociável? E algum que vocês odeiam mas está "preso" por herança histórica?
- Vocês preferem começar dos mockups (visual primeiro) ou da arquitetura de informação (estrutura primeiro)? [Nota interna: revela maturidade do cliente sobre processo — cliente que só pensa em mockup geralmente ainda não pensou em conteúdo/dados.]

## 7 — Escopo de Plataforma e Produto

Vendor-agnostic por princípio — a pergunta não é "React ou WordPress", é o que o negócio precisa:

- O que existe hoje (site, sistema, plataforma, app) que precisa continuar funcionando durante a transição?
- Isso é site institucional, plataforma transacional, SaaS, portal logado, dashboard interno, ou uma combinação?
- Existe integração obrigatória com sistema já existente (CRM, ERP, pagamento, autenticação)? Liste todas, mesmo as que parecem óbvias.
- Existe requisito de escala conhecido (picos sazonais, volume de usuários simultâneos, crescimento esperado em 12 meses)?

## 8 — Dados, Algoritmos e Inteligência

Só faz sentido preencher esta seção se houver componente de personalização, recomendação, busca inteligente, IA generativa ou automação de decisão. Se não houver, marque explicitamente "não aplicável" — não pule em silêncio.

- Qual é o objetivo de negócio do algoritmo — aumentar conversão, engajamento, retenção, ou reduzir custo operacional? (nomeie apenas um objetivo primário; múltiplos objetivos empatados é sinal de que o projeto ainda não está definido)
- Que dados já existem hoje sobre o comportamento do usuário? Estão limpos, atualizados, e acessíveis, ou é preciso construir a coleta do zero?
- Existe restrição regulatória (LGPD e equivalentes) sobre como esses dados podem ser usados?
- Existe expectativa de explicabilidade (o usuário/cliente precisa entender por que recebeu uma recomendação) ou pode ser caixa-preta?
- IA aqui é uma necessidade real de negócio ou uma expectativa de mercado que ainda não foi questionada? [Pergunta interna ARKOS — nunca aceitar "porque todo mundo tem IA" como justificativa.]

## 9 — Restrições e Inegociáveis

- Faixa de orçamento real (não a "verba idealizada") e o que ela precisa cobrir.
- Prazo real de lançamento e o motivo dele (data de evento? fim de contrato de fornecedor atual? sem motivo real, só ansiedade?).
- Existe restrição técnica herdada (hospedagem obrigatória, fornecedor de tecnologia já contratado, time interno que vai manter depois)?
- Existe restrição de compliance/setor (saúde, educação, financeiro, público) que limita as opções?

## 10 — Anti-Requisitos

A seção mais incomum e mais valiosa deste questionário — a maioria dos briefings só pergunta o que incluir.

- O que definitivamente NÃO deve ser construído nesta fase, mesmo que pareça uma boa ideia?
- Existe algo que um stakeholder interno vai pedir no meio do projeto que vocês já sabem, hoje, que deveria ser recusado?
- O que já foi tentado antes e falhou — para não repetirmos o mesmo erro com outro nome?

## 11 — Autoavaliação de Prontidão

Evita que o projeto pare na semana 3 por falta de algo que podia ter sido sinalizado na semana 0.

- O conteúdo (textos, imagens, dados de produto) já existe ou precisa ser produzido do zero?
- A pessoa que decide está disponível nas próximas semanas, ou vai viajar/sair de férias no meio do projeto?
- Existe algum projeto interno paralelo que pode competir por atenção ou orçamento no meio do caminho?

---

# PARTE 2 — Síntese de Briefing (ARKOS produz, internamente, após Discovery)

Preenchida pela equipe ARKOS depois da entrevista/questionário + pesquisa de benchmark cruzada. Este é o documento que efetivamente dirige o time — curto o bastante para ser lido em 5 minutos por qualquer pessoa da equipe antes de começar a trabalhar.

```text
1. Contexto do cliente — quem é, o que faz, por que está buscando a ARKOS agora
2. O Job a Ser Feito — síntese em 1 frase (funcional + emocional + social)
3. Definição de sucesso — a métrica de 90 dias, travada e assinada pelo cliente
4. Quem decide — mapa de decisão, para nunca haver ambiguidade de aprovação
5. Direção de referência — 2-3 padrões do ARKOS Benchmark Intelligence relevantes
   (citando Evidence real quando existir; nunca inventar um "padrão de mercado"
   sem lastro — ver benchmark-sampling-research-methodology-v0.1.md §26/§27)
6. Direção de marca — resumo de tom, inegociáveis visuais, e onde há liberdade real
7. Escopo de plataforma — recomendação vendor-agnostic de alto nível (não stack ainda)
8. Escopo de dados/algoritmo — se aplicável; objetivo único, dados disponíveis, restrição regulatória
9. Inegociáveis e anti-requisitos — o que trava o escopo dos dois lados
10. Riscos abertos — o que pode explodir o projeto e quem é dono de mitigar
11. Próximo passo recomendado — qual etapa do ciclo Discover→Scale começa agora,
    e quais perspectivas da equipe multidisciplinar (CLAUDE.md §3) são necessárias
```

Regra de ouro para a Síntese: nada entra aqui que não veio de uma resposta real do cliente ou de evidência real de benchmark. Suposição da equipe ARKOS é rotulada explicitamente como **hipótese a validar**, nunca apresentada como fato — mesma disciplina OBSERVADO/INFERIDO/RECOMENDADO já em uso no resto do workspace (`CLAUDE.md` §9).

---

## Como a ARKOS conduz este processo

1. Questionário (Parte 1) enviado com antecedência — nunca respondido ao vivo pela primeira vez em call, para dar tempo do cliente pensar de verdade nas perguntas difíceis (seções 1, 9, 10).
2. Entrevista de 60-90 min conduzida por quem vai liderar o projeto, não por comercial — aprofunda especialmente seções 1, 3 e 8, que raramente saem completas só do formulário escrito.
3. Cruzamento com ARKOS Benchmark Intelligence quando o vertical do cliente já tiver cobertura (`data\research\benchmark-candidate-universe-v0.1.csv` e documentos relacionados) — nunca citar um "padrão de mercado" sem essa checagem.
4. Síntese (Parte 2) escrita em até 48h da entrevista, revisada com o cliente antes de qualquer trabalho de Design/Architect começar.
5. Síntese assinada/confirmada pelo cliente antes de proposta comercial ou início de produção — protege ambos os lados de retrabalho por expectativa não alinhada.

Nota de processo (ligado a `docs/swebok-alignment-v0.1.md`): este documento cobre apenas a fase pré-Build. Estimativa formal de esforço/custo, gestão de risco de projeto e critérios de fechamento — Software Engineering Management, SWEBOK KA 9 — ainda não estão formalizados como processo ARKOS e devem ser resolvidos antes do primeiro projeto real entrar em produção.

---

Sources (pesquisa que fundamenta este documento):
- [The Ultimate Client Brief Template for Digital Agencies](https://scopepilot.ie/blog/client-brief-template) — distinção questionário (input) vs. brief (output); 10 seções como ponto de equilíbrio
- [Jobs to Be Done Framework: A Practical Guide](https://www.usercall.co/post/jobs-to-be-done-framework) e [JTBD Interview Guide 2026](https://www.koji.so/blog/jobs-to-be-done-interview-guide-2026) — perguntas de switch-moment e taxa de sucesso 86% vs. 17%
- [7 Secrets to Executing a Great Creative Brief](https://www.adweek.com/sponsored/7-secrets-to-executing-a-great-creative-brief/) e [10 Brand Brief Examples](https://literalhumans.com/brand-brief/) — brand book vs. creative brief
- [Product Discovery Workshops: Complete 2026 Guide](https://www.gitnexa.com/blogs/product-discovery-workshop-guide) — vision statement + goal mensurável antes de escopo
- [10 proven recommendation engine types](https://lumenalta.com/insights/10-proven-recommendation-engine-types-you-should-know) — objetivo único do algoritmo, qualidade/disponibilidade de dado, restrição regulatória
- [Elevating customer experience excellence in the next normal, McKinsey](https://www.mckinsey.com/capabilities/operations/our-insights/elevating-customer-experience-excellence-in-the-next-normal) e [An Inconvenient Truth: 93% of CX Initiatives are Failing](https://customerthink.com/an-inconvenient-truth-93-of-customer-experience-initiatives-are-failing/) — taxa de diferenciação real de investimentos em CX
