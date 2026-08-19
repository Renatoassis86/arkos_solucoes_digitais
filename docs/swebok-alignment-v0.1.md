# ARKOS × SWEBOK v4.0 — Readiness & Alignment v0.1

```
Status: Readiness Assessment
Fonte: IEEE Guide to the Software Engineering Body of Knowledge v4.0 (2024) — C:\ARKOS\6 - IEEE_2024_SWEBOK_4.pdf
Método: leitura direta do sumário/estrutura do documento (413 páginas, 18 capítulos/Knowledge Areas + 3 apêndices) — DOCUMENTADO, não inferido de memória.
```

## Veredito direto

**Parcialmente pronto.** `CLAUDE.md` + a Skill `arkos-digital-intelligence` já cobrem, em nível de princípio, boa parte do que o SWEBOK chama de *Software Engineering Process* (o próprio ciclo Discover→Scale) e *Software Quality* (`references/quality-gates.md`). Mas isso é **governança de alto nível**, não **processo operacional**. Antes de a ARKOS construir sistemas de cliente em produção com múltiplas pessoas envolvidas, faltam 6 das 18 Knowledge Areas do SWEBOK sem nenhum tratamento formal — a lacuna mais crítica é **Software Engineering Management** (como se estima, aloca risco e fecha um projeto), porque sem ela o resto vira "boa vontade individual", não processo repetível.

## As 18 Knowledge Areas do SWEBOK v4.0 e onde a ARKOS está hoje

| # | Knowledge Area (SWEBOK v4.0) | Cobertura ARKOS hoje | Status |
|---|---|---|---|
| 1 | Software Requirements | Princípio de descoberta (`CLAUDE.md` §5/§6) define a lógica Problema→Requisitos, mas não há técnica de elicitação/especificação/validação padronizada | 🟡 Parcial |
| 2 | Software Architecture | Etapa "Architect" do ciclo + precedente real (arquitetura ARKOS Benchmark Intelligence v0.1/v0.2, com ADRs, ERD, alternativas comparadas) | 🟢 Coberto (com precedente reproduzível) |
| 3 | Software Design | Etapa "Design" do ciclo; UX/UI têm princípios (`CLAUDE.md` §17) mas não há processo de design detalhado (padrões de registro de decisão de design, ex.: design rationale) | 🟡 Parcial |
| 4 | Software Construction | Princípios gerais (`CLAUDE.md` §16 qualidade de engenharia) mas sem padrão de codificação, gestão de dependências ou plano de construção formalizado | 🟡 Parcial |
| 5 | Software Testing | Mencionado em `quality-gates.md` ("automated tests appropriate to risk") mas sem níveis de teste, técnicas ou processo de teste definidos | 🟡 Parcial |
| 6 | **Software Engineering Operations** | Não tratado — deployment, rollback, incident management, disaster recovery não existem como processo | 🔴 Gap |
| 7 | **Software Maintenance** | Mencionado apenas como princípio (`CLAUDE.md` §23 medição, Build→Measure→Learn) — sem processo de manutenção corretiva/adaptativa/evolutiva | 🔴 Gap |
| 8 | Software Configuration Management | Git governado para o workspace ARKOS (`CLAUDE.md` §15, `.gitignore`/`.gitattributes` já existentes) mas sem SCM padronizado para projetos de cliente (branching, baseline, change control board) | 🟡 Parcial |
| 9 | **Software Engineering Management** | "Forma de trabalho" (`CLAUDE.md` §24) é um fluxo de 10 passos, não um processo de gestão — sem estimativa de esforço/custo, alocação de recursos, gestão de risco formal ou critério de fechamento de projeto | 🔴 Gap (prioridade mais alta) |
| 10 | Software Engineering Process | O próprio ciclo Discover→Scale (Skill) e a "Regra de ouro" (`CLAUDE.md` §26) já são, na essência, isso | 🟢 Coberto |
| 11 | **Software Engineering Models and Methods** | Não tratado como disciplina própria (quando usar prototipagem vs. métodos formais vs. métodos ágeis para um projeto específico) | 🔴 Gap |
| 12 | Software Quality | `references/quality-gates.md` é diretamente equivalente a um checklist de quality assurance | 🟢 Coberto |
| 13 | **Software Security** | `CLAUDE.md` §14 cobre higiene básica de secrets/.env — não cobre security engineering (modelagem de ameaça, security requirements, security testing) | 🔴 Gap parcial |
| 14 | **Software Engineering Professional Practice** | Documentação como princípio (`CLAUDE.md` §20) existe; ética, propriedade intelectual, comunicação com stakeholders não formalizados | 🔴 Gap |
| 15 | Software Engineering Economics | `CLAUDE.md` §21 (Comercial) já cobre pricing/valor/TCO em nível de princípio de negócio | 🟢 Coberto |
| 16-18 | Computing / Mathematical / Engineering Foundations | Conhecimento fundacional individual, não processo organizacional — fora do escopo de um "playbook ARKOS", cada profissional traz essa base | ⚪ Não aplicável a este nível |

## Leitura do gap

Não é preciso adotar o SWEBOK inteiro — ele é uma base de conhecimento de referência, não uma metodologia obrigatória (o próprio Apêndice A do documento o descreve como "generally recognized knowledge", não como norma prescritiva). O que falta formalizar antes de a ARKOS escalar a construção de sistemas reais de cliente, em ordem de prioridade:

1. **Software Engineering Management** (KA 9) — sem isto, cada projeto reinventa como estimar prazo/custo, quem decide o quê, e o que significa "fechado". Deveria virar um adendo curto ao "Build" do ciclo ARKOS.
2. **Software Engineering Operations** (KA 6) — deploy/rollback/incident management viram improviso sem isso, e é justamente onde produção real quebra confiança do cliente.
3. **Software Maintenance** (KA 7) — a ARKOS já afirma (`CLAUDE.md` §23) que "projeto não está concluído só por ter sido publicado", mas não tem processo formal para honrar isso.
4. **Software Security** (KA 13) — a higiene de secrets já existe; falta o lado de *engenharia* de segurança (requisitos, modelagem de ameaça) quando o projeto justificar.
5. **Software Engineering Models and Methods** (KA 11) — decisão explícita de quando prototipar vs. formalizar vs. seguir ágil puro, hoje implícita/caso a caso.
6. **Software Engineering Professional Practice** (KA 14) — ética, propriedade intelectual e comunicação formal com stakeholders, relevante à medida que a ARKOS cresce em equipe.

## Recomendação

Não é necessário — nem desejável — expandir `CLAUDE.md` para replicar 413 páginas de SWEBOK. A recomendação é: quando o primeiro projeto real de cliente entrar em "Build" (etapa 6 do ciclo ARKOS), produzir um **Engineering Playbook** curto e prático que resolva as 6 lacunas acima, escrito em linguagem operacional ARKOS (não acadêmica), citando o SWEBOK como referência normativa quando útil — não antes disso, para não criar burocracia sem uso concreto (`CLAUDE.md` §24). Isso é trabalho para quando houver um sistema real a construir, não para agora.

## O que isso significa para o pedido atual

A pergunta original do usuário era "o sistema já está otimizado para lançar os passos necessários para começar a construir os sistemas?" — resposta: o **método de decisão e a governança** estão prontos (Discover→Scale, quality-gates, regra de ouro); o **processo de engenharia operacional** (como de fato gerir, operar e manter o que for construído) ainda não foi formalizado e é a lacuna real antes do primeiro Build. Isso não bloqueia o próximo passo pedido pelo usuário (a Briefing de Discovery, que atua *antes* do Build) — mas deve ser resolvido antes de qualquer sistema de cliente ir para produção.
