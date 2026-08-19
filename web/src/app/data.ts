export type Category = "experiencia" | "sistemas" | "automacao" | "consultoria";

export const FILTERS: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "Todas as Soluções" },
  { id: "experiencia", label: "Sites e Páginas" },
  { id: "sistemas", label: "Sistemas e Plataformas" },
  { id: "automacao", label: "Automação e Dados" },
  { id: "consultoria", label: "Consultoria e Apoio" },
];

export const SERVICES: {
  name: string;
  categories: Category[];
  desc: string;
  items: string[];
}[] = [
  {
    name: "Sites e Páginas de Alta Conversão",
    categories: ["experiencia"],
    desc: "Estruturamos páginas rápidas e funcionais que facilitam a decisão do seu cliente e geram novos contatos comerciais.",
    items: [
      "Landing pages diretas e objetivas",
      "Sites institucionais para empresas e clínicas",
      "Otimização de velocidade e presença no Google",
      "Adaptação perfeita para celulares e computadores",
    ],
  },
  {
    name: "Lojas Virtuais e Catálogos de Produtos",
    categories: ["experiencia"],
    desc: "Desenvolvemos catálogos digitais e lojas online para apresentar seus produtos com clareza e facilitar as vendas.",
    items: [
      "Lojas virtuais com pagamento via Pix e cartão",
      "Catálogos digitais para pedidos via WhatsApp",
      "Gestão simples de estoque e pedidos",
      "Cálculo automático de frete e entregas",
    ],
  },
  {
    name: "Tecnologia para Vendas e Captação",
    categories: ["experiencia", "sistemas"],
    desc: "Integramos formulários, botões de WhatsApp e ferramentas de atendimento para organizar a entrada de novos clientes.",
    items: [
      "Integração direta com WhatsApp e e-mail",
      "Formulários inteligentes de solicitação de orçamento",
      "Conexão com ferramentas de atendimento e vendas",
      "Medição precisa de cliques e contatos gerados",
    ],
  },
  {
    name: "Sistemas e Plataformas Sob Medida",
    categories: ["sistemas"],
    desc: "Desenvolvemos portais, painéis administrativos e sistemas web personalizados para organizar a rotina da sua operação.",
    items: [
      "Painéis administrativos e telas de controle",
      "Portais de acesso para clientes e parceiros",
      "Área de membros e login seguro de usuários",
      "Sistemas de agendamento e fluxo de atendimento",
    ],
  },
  {
    name: "Portais de Clientes e Área de Membros",
    categories: ["sistemas"],
    desc: "Ambientes fechados e seguros para seus clientes acessarem documentos, cursos, faturas ou serviços exclusivos.",
    items: [
      "Login seguro por e-mail ou WhatsApp",
      "Download e envio de arquivos e relatórios",
      "Painel exclusivo por perfil de usuário",
      "Histórico de solicitações e atendimentos",
    ],
  },
  {
    name: "Organização de Dados e Relatórios",
    categories: ["sistemas", "automacao"],
    desc: "Estruturamos relatórios claros para você acompanhar vendas, acessos e resultados com clareza factual.",
    items: [
      "Painéis visuais de acompanhamento de resultados",
      "Relatórios de vendas e visitas no site",
      "Organização e integração de bases de dados",
      "Acompanhamento dos principais indicadores do negócio",
    ],
  },
  {
    name: "Automação de Processos e Atendimento",
    categories: ["automacao"],
    desc: "Automatizamos tarefas repetitivas para economizar tempo da sua equipe e acelerar o atendimento ao cliente.",
    items: [
      "Respostas e triagem automática de atendimentos",
      "Organização automática de cadastros e pedidos",
      "Notificações automáticas por WhatsApp e e-mail",
      "Integração de planilhas com sistemas de gestão",
    ],
  },
  {
    name: "Integração de Sistemas e Planilhas",
    categories: ["automacao"],
    desc: "Conectamos suas planilhas, sistemas de gestão e meios de pagamento para eliminar digitação manual de dados.",
    items: [
      "Sincronização entre planilhas e banco de dados",
      "Emissão automática de alertas e notificações",
      "Conexão com plataformas de terceiros",
      "Backup automático de dados importantes",
    ],
  },
  {
    name: "Consultoria e Apoio Técnico",
    categories: ["consultoria"],
    desc: "Orientamos a escolha das melhores soluções e ferramentas para o momento e orçamento da sua empresa.",
    items: [
      "Diagnóstico técnico de sites existentes",
      "Orientação na escolha de plataformas e hospedagem",
      "Melhorias de velocidade, segurança e estabilidade",
      "Acompanhamento e suporte técnico contínuo",
    ],
  },
  {
    name: "Diagnóstico e Otimização de Sites",
    categories: ["consultoria"],
    desc: "Analisamos sites que estão lentos ou que não geram vendas para identificar e corrigir os pontos de melhoria.",
    items: [
      "Auditoria completa de velocidade no celular",
      "Correção de links quebrados e falhas técnicas",
      "Ajustes de textos para aumentar a conversão",
      "Revisão de segurança e certificados digitais",
    ],
  },
];

export const PRINCIPLES = [
  {
    name: "Design com Função",
    desc: "Cada elemento visual tem um propósito claro de comunicação ou facilidade de uso para o cliente.",
  },
  {
    name: "Clareza Visual",
    desc: "Telas limpas, sem excessos ou poluição, destacando o que realmente importa para a decisão.",
  },
  {
    name: "Foco em Resultados",
    desc: "Projetos desenhados para gerar contatos, vendas e eficiência no dia a dia da sua empresa.",
  },
  {
    name: "Facilidade de Leitura",
    desc: "Textos diretos e navegação simples para que qualquer pessoa consiga usar com rapidez.",
  },
];

export const METHOD: { step: string; desc: string }[] = [
  {
    step: "1. Entendimento",
    desc: "Conversamos para entender sua empresa, seus clientes, seus desafios e o que você precisa alcançar.",
  },
  {
    step: "2. Pesquisa",
    desc: "Analisamos seu mercado, seus concorrentes e as melhores referências visuais do seu setor.",
  },
  {
    step: "3. Estratégia",
    desc: "Definimos o objetivo principal da página, a mensagem central e a melhor forma de apresentar sua oferta.",
  },
  {
    step: "4. Desenho e Visual",
    desc: "Criamos a estrutura das telas, organizamos os textos e definimos as cores e imagens ideais.",
  },
  {
    step: "5. Estrutura Técnica",
    desc: "Definimos os botões, integrações de WhatsApp, formulários e banco de dados necessários.",
  },
  {
    step: "6. Construção",
    desc: "Desenvolvemos o site com código limpo, rápido e totalmente adaptado para celulares e computadores.",
  },
  {
    step: "7. Testes e Validação",
    desc: "Testamos todos os botões, formulários, velocidade e visual junto com você antes da publicação.",
  },
  {
    step: "8. Publicação",
    desc: "Colocamos o site no ar no seu domínio próprio com conexão segura e e-mails configurados.",
  },
  {
    step: "9. Acompanhamento",
    desc: "Monitoramos o funcionamento, os acessos recebidos e a chegada dos primeiros contatos.",
  },
  {
    step: "10. Evolução",
    desc: "Apoiamos você em melhorias contínuas, novos recursos e expansão conforme sua empresa cresce.",
  },
];
