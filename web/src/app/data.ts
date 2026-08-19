// Conteúdo real, sem invenção — sub-capacidades vêm de
// .claude/skills/arkos-digital-intelligence/references/service-portfolio.md
// e as descrições de método vêm do SKILL.md. Nada aqui é case de cliente:
// a ARKOS ainda não tem case publicável, então nenhum é fabricado.

export type Category = "experience" | "platforms" | "ai" | "advisory";

export const FILTERS: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "experience", label: "Experience & Growth" },
  { id: "platforms", label: "Platforms & Data" },
  { id: "ai", label: "AI & Automation" },
  { id: "advisory", label: "Advisory" },
];

// Multi-tag por serviço (padrão observado no Instrument: um projeto pode
// carregar #brand e #product ao mesmo tempo) — cada tag secundária abaixo
// reflete sobreposição real de capacidade, descrita no próprio
// service-portfolio.md, não uma categoria forçada só para imitar o padrão.
export const SERVICES: {
  name: string;
  categories: Category[];
  desc: string;
  items: string[];
}[] = [
  {
    name: "Digital Experience",
    categories: ["experience"],
    desc: "Reduz a distância entre visitante e decisão — desenhado para conversão, não só para existir.",
    items: [
      "Sites institucionais e landing ecosystems",
      "Portais e e-commerce",
      "Experiências multilíngue",
      "Plataformas de conteúdo e design systems",
      "Acessibilidade, SEO e CRO",
    ],
  },
  {
    name: "Growth Technology",
    categories: ["experience", "platforms"],
    desc: "Transforma tráfego em pipeline — atribuição real em vez de acesso vaidoso.",
    items: [
      "SEO técnico e sistemas de conteúdo",
      "Automação de marketing",
      "Integrações CRM/receita",
      "Atribuição e experimentação",
      "Arquitetura MarTech",
    ],
  },
  {
    name: "Software & Platforms",
    categories: ["platforms"],
    desc: "Substitui planilha e retrabalho por sistema — sob medida para o processo que sua operação já tem.",
    items: [
      "Aplicações web sob medida e SaaS",
      "Portais de cliente/parceiro",
      "Intranets/extranets e dashboards",
      "Sistemas de workflow",
      "APIs, integrações e modernização",
    ],
  },
  {
    name: "Data & Intelligence",
    categories: ["platforms", "advisory"],
    desc: "Troca achismo por evidência — dados organizados e prontos para orientar a próxima decisão.",
    items: [
      "Engenharia de dados, warehouse/lake",
      "BI e analytics de produto",
      "Analytics de marketing/vendas",
      "Experimentação e forecasting",
      "Scoring e decision-support",
    ],
  },
  {
    name: "AI & Automation",
    categories: ["ai", "platforms"],
    desc: "Tira trabalho repetitivo do caminho — IA aplicada onde resolve, não onde é moda.",
    items: [
      "Agentes de IA e copilots",
      "RAG e sistemas de conhecimento",
      "Document intelligence",
      "Automação de workflow",
      "Classificação, extração e recomendação",
    ],
  },
  {
    name: "Technology Advisory",
    categories: ["advisory"],
    desc: "Reduz risco técnico antes que vire prejuízo — governança contínua, não bombeiro.",
    items: [
      "CTO as a Service",
      "Arquitetura e due diligence técnica",
      "Cloud/DevOps e segurança",
      "Observabilidade e FinOps",
      "Governança de engenharia",
    ],
  },
];

export const PRINCIPLES = [
  {
    name: "Craft com função",
    desc: "Rigor visual e engenharia andam juntos. Nada aqui é decoração sem propósito técnico por trás.",
  },
  {
    name: "Escassez deliberada",
    desc: "Um sistema de cor restrito, com acento usado onde importa — não em bloco, não por hábito.",
  },
  {
    name: "Dados desde o design",
    desc: "Plano de medição definido antes do lançamento. Métrica é parte do projeto, não um relatório depois.",
  },
  {
    name: "Legível por humano e por máquina",
    desc: "Experiência de alto nível sem abrir mão de SEO técnico, performance e acessibilidade.",
  },
];

export const METHOD: { step: string; desc: string }[] = [
  {
    step: "Discover",
    desc: "Entender organização, usuários, dores, objetivos, restrições, sistemas atuais e evidência disponível.",
  },
  {
    step: "Research",
    desc: "Investigar mercado, concorrência, análogos, benchmarks, tecnologia e melhores práticas atuais.",
  },
  {
    step: "Strategize",
    desc: "Definir oportunidade, posicionamento, proposta de valor, modelo de negócio, KPIs e prioridades.",
  },
  {
    step: "Design",
    desc: "Definir jornadas, arquitetura de informação, UX, sistema de UI, modelo de conteúdo e lógica de conversão.",
  },
  {
    step: "Architect",
    desc: "Definir requisitos funcionais/não-funcionais, modelo de dados, integrações, segurança e stack.",
  },
  {
    step: "Build",
    desc: "Planejar implementação, backlog, ambientes, padrões de código e incrementos de entrega.",
  },
  {
    step: "Validate",
    desc: "Testar usabilidade, acessibilidade, funcionalidade, segurança, performance e aceite de negócio.",
  },
  {
    step: "Launch",
    desc: "Publicar, migrar, instrumentar analytics, documentar e treinar times envolvidos.",
  },
  {
    step: "Measure",
    desc: "Acompanhar KPIs de negócio, produto, marketing, confiabilidade e financeiros.",
  },
  {
    step: "Scale",
    desc: "Otimizar, automatizar, expandir e gerir o ciclo de vida do produto.",
  },
];
