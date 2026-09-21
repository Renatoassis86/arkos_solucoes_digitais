-- ==============================================================================
-- MODELO RELACIONAL DO BANCO DE DADOS SUPABASE / POSTGRESQL (VERSÃO ATUALIZADA)
-- ARKOS SOLUÇÕES DIGITAIS — PLATAFORMA DE CAPTAÇÃO, BRIEFINGS E LEADS
-- ==============================================================================

-- 1. HABILITAR EXTENSÃO UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- TABELA 1: CONTATOS RÁPIDOS (LEADS DA PÁGINA /contato E HOME)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.contatos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    status VARCHAR(50) DEFAULT 'novo' NOT NULL, -- 'novo', 'em_atendimento', 'convertido', 'descartado'
    
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(50) NOT NULL,
    empresa VARCHAR(255),
    servico_interesse VARCHAR(100),
    mensagem TEXT,
    origem_url VARCHAR(255) DEFAULT '/'
);

CREATE INDEX IF NOT EXISTS idx_contatos_email ON public.contatos (email);
CREATE INDEX IF NOT EXISTS idx_contatos_status ON public.contatos (status);
CREATE INDEX IF NOT EXISTS idx_contatos_created_at ON public.contatos (created_at DESC);

-- ==============================================================================
-- TABELA 2: BRIEFINGS MODULARES ESTRATÉGICOS (/briefing)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.briefings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    status VARCHAR(50) DEFAULT 'novo' NOT NULL, -- 'novo', 'em_analise', 'proposta_enviada', 'aprovado', 'concluido'
    segmento VARCHAR(100) DEFAULT 'Serviços e Outros' NOT NULL, -- 'Saúde e Clínicas', 'B2B e Corporativo', 'E-commerce e Varejo', etc.
    
    -- ETAPA 1: SOBRE VOCÊ E SUA EMPRESA
    nome_solicitante VARCHAR(255) NOT NULL,
    cargo_solicitante VARCHAR(150),
    empresa_nome VARCHAR(255) NOT NULL,
    ramo_atuacao VARCHAR(150) NOT NULL,
    estagio_empresa VARCHAR(100),
    diferencial_competitivo TEXT,
    email_contato VARCHAR(255) NOT NULL,
    telefone_whatsapp VARCHAR(50) NOT NULL,
    cidade_estado VARCHAR(150),
    website_atual VARCHAR(255),

    -- ETAPA 2: MODELO DE NEGÓCIO, PERSONA E DECISÃO DE COMPRA
    o_que_sua_empresa_faz TEXT NOT NULL,
    como_sua_empresa_ganha_dinheiro VARCHAR(150),
    ticket_medio VARCHAR(150),
    quem_e_seu_cliente_ideal TEXT NOT NULL,
    principal_dor_do_seu_cliente TEXT,
    maior_objecao_ou_duvida_cliente TEXT,
    conquistas_e_provas_de_autoridade TEXT,
    como_clientes_te_encontram_hoje VARCHAR(150),

    -- ETAPA 3: O QUE O SITE PRECISA TER E ARQUITETURA DE CONVERSÃO
    formato_do_site VARCHAR(100) NOT NULL,
    numero_estimado_paginas VARCHAR(50),
    acao_principal_desejada VARCHAR(150) NOT NULL,
    acao_secundaria_desejada VARCHAR(150),
    recursos_desejados JSONB DEFAULT '[]'::jsonb,
    integracoes_sistemas_externos TEXT,

    -- ETAPA 4: IDENTIDADE VISUAL, REFERÊNCIAS E ANEXOS
    ja_possui_logomarca_ou_brandbook VARCHAR(50),
    estilo_visual_preferido VARCHAR(100),
    sensacao_desejada_marca VARCHAR(150),
    links_de_sites_que_voce_gosta TEXT,
    o_que_voce_nao_quer_no_site TEXT,
    arquivos_anexos JSONB DEFAULT '[]'::jsonb,

    -- ETAPA 5: PRAZO, INVESTIMENTO E CRITÉRIO DE SUCESSO
    prazo_desejado VARCHAR(50),
    faixa_investimento VARCHAR(100) NOT NULL,
    quem_aprova_o_projeto VARCHAR(100),
    criterio_de_sucesso_30_dias TEXT,
    observacoes_finais TEXT
);

CREATE INDEX IF NOT EXISTS idx_briefings_email ON public.briefings (email_contato);
CREATE INDEX IF NOT EXISTS idx_briefings_status ON public.briefings (status);
CREATE INDEX IF NOT EXISTS idx_briefings_segmento ON public.briefings (segmento);
CREATE INDEX IF NOT EXISTS idx_briefings_created_at ON public.briefings (created_at DESC);

-- ==============================================================================
-- MIGRATION SCRIPT (CASO A TABELA JÁ EXISTA NO SUPABASE)
-- Nota: "integracoes_sistemas_externos" foi removida desta lista — o código da
-- aplicação sempre usou "outros_sistemas_para_integrar" (já existente na tabela);
-- a outra era um nome de coluna nunca lido/escrito por nenhum caminho de código.
-- ==============================================================================
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS segmento VARCHAR(100) DEFAULT 'Serviços e Outros';
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS estagio_empresa VARCHAR(100);
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS diferencial_competitivo TEXT;
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS ticket_medio VARCHAR(150);
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS maior_objecao_ou_duvida_cliente TEXT;
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS conquistas_e_provas_de_autoridade TEXT;
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS como_clientes_te_encontram_hoje VARCHAR(150);
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS acao_secundaria_desejada VARCHAR(150);
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS sensacao_desejada_marca VARCHAR(150);
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS o_que_voce_nao_quer_no_site TEXT;
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS quem_aprova_o_projeto VARCHAR(100);
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS criterio_de_sucesso_30_dias TEXT;

-- ==============================================================================
-- MIGRATION 2026-08-23: novas perguntas de Discovery (gap analysis vs.
-- templates/arkos-discovery-briefing-v0.1.md) — ver decisão registrada na sessão.
-- ==============================================================================
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS conteudo_pronto_ou_precisa_criar VARCHAR(50);
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS concorrente_direto_que_resolve_melhor TEXT;
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS sistema_atual_que_precisa_continuar_funcionando TEXT;
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS restricao_regulatoria_do_setor TEXT;
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS anti_requisitos TEXT;
ALTER TABLE public.briefings ADD COLUMN IF NOT EXISTS motivo_real_do_prazo TEXT;

-- ==============================================================================
-- TABELA 3: ANEXOS DO BRIEFING (RELAÇÃO 1:N)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.briefing_anexos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    briefing_id UUID NOT NULL REFERENCES public.briefings(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    nome_arquivo VARCHAR(255) NOT NULL,
    tipo_arquivo VARCHAR(100),
    url_arquivo TEXT,
    tamanho_bytes BIGINT
);

CREATE INDEX IF NOT EXISTS idx_anexos_briefing_id ON public.briefing_anexos (briefing_id);

-- ==============================================================================
-- POLÍTICAS DE SEGURANÇA (ROW LEVEL SECURITY - RLS)
-- ==============================================================================
ALTER TABLE public.contatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.briefing_anexos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir envio publico de contatos"
ON public.contatos
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Permitir envio publico de briefings"
ON public.briefings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Permitir envio publico de anexos de briefing"
ON public.briefing_anexos
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Apenas administradores podem ler contatos"
ON public.contatos
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');

CREATE POLICY "Apenas administradores podem ler briefings"
ON public.briefings
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');

CREATE POLICY "Apenas administradores podem ler anexos de briefing"
ON public.briefing_anexos
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');

-- ==============================================================================
-- TABELA 4: BRIEFING PARA CONSTRUÇÃO DE PLATAFORMA COMERCIAL (/briefing-plataforma-comercial)
-- Coleta a realidade comercial de um cliente (fluxo de venda, precificação,
-- carteira de clientes atuais, jornada pré-venda a pós-venda e metas) para
-- servir de base ao desenho de um CRM/plataforma comercial sob medida —
-- o mesmo tipo de levantamento feito manualmente para os projetos já
-- entregues pela ARKOS, agora como um formulário reutilizável para
-- qualquer novo cliente.
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.briefings_plataforma_comercial (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    status VARCHAR(50) DEFAULT 'novo' NOT NULL, -- 'novo', 'em_analise', 'proposta_enviada', 'aprovado', 'concluido'

    -- ETAPA 1: SOBRE VOCÊ E SUA EMPRESA
    nome_solicitante VARCHAR(255) NOT NULL,
    cargo_solicitante VARCHAR(150),
    empresa_nome VARCHAR(255) NOT NULL,
    ramo_atuacao VARCHAR(150) NOT NULL,
    email_contato VARCHAR(255) NOT NULL,
    telefone_whatsapp VARCHAR(50) NOT NULL,
    cidade_estado VARCHAR(150),
    site_atual VARCHAR(255),

    -- ETAPA 2: O QUE VENDEM E PARA QUEM
    o_que_a_empresa_vende TEXT NOT NULL,
    unidade_de_venda VARCHAR(100) NOT NULL,
    quem_e_o_cliente_comprador TEXT NOT NULL,
    ticket_medio_atual VARCHAR(150),
    quantos_clientes_ativos_hoje VARCHAR(100),

    -- ETAPA 3: COMO FUNCIONA O PREÇO
    modelo_de_precificacao VARCHAR(100) NOT NULL,
    existe_tabela_de_precos_hoje VARCHAR(100) NOT NULL,
    margem_de_negociacao VARCHAR(100) NOT NULL,
    quem_aprova_descontos_especiais VARCHAR(255),
    formas_de_pagamento_aceitas JSONB DEFAULT '[]'::jsonb,
    variaveis_que_definem_o_preco TEXT,

    -- ETAPA 4: FLUXO COMERCIAL, DA PRÉ-VENDA AO PÓS-VENDA
    como_surge_um_lead_hoje TEXT,
    etapas_do_processo_comercial TEXT NOT NULL,
    tempo_medio_de_fechamento VARCHAR(100),
    documentos_usados_no_processo VARCHAR(255),
    o_que_acontece_apos_o_fechamento TEXT,
    tipo_de_relacionamento_com_cliente VARCHAR(100) NOT NULL,
    como_e_feita_a_renovacao TEXT,

    -- ETAPA 5: CLIENTES ATUAIS (CADASTRO) — array de objetos:
    -- { nome_cliente, quantidade, unidade_quantidade, item_ou_produto_principal,
    --   valor_unitario, forma_pagamento, data_inicio, observacoes }
    clientes_atuais JSONB DEFAULT '[]'::jsonb,

    -- ETAPA 6: METAS E PLANEJAMENTO COMERCIAL
    periodo_de_planejamento VARCHAR(100),
    meta_novos_clientes_periodo VARCHAR(150),
    meta_faturamento_periodo VARCHAR(150),
    meta_percentual_renovacao VARCHAR(100),
    indicadores_que_ja_acompanham_hoje TEXT,
    observacoes_finais TEXT
);

CREATE INDEX IF NOT EXISTS idx_briefings_pc_email ON public.briefings_plataforma_comercial (email_contato);
CREATE INDEX IF NOT EXISTS idx_briefings_pc_status ON public.briefings_plataforma_comercial (status);
CREATE INDEX IF NOT EXISTS idx_briefings_pc_created_at ON public.briefings_plataforma_comercial (created_at DESC);

ALTER TABLE public.briefings_plataforma_comercial ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir envio publico de briefings de plataforma comercial"
ON public.briefings_plataforma_comercial
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Apenas administradores podem ler briefings de plataforma comercial"
ON public.briefings_plataforma_comercial
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');

-- ==============================================================================
-- TABELA 5 e 6: BRIEFING PRIVADO POR PIN — CLIENTE ESPECÍFICO (/briefing-kairos)
-- Diferente da Tabela 4 (genérica, qualquer visitante pode preencher), este
-- briefing é fechado: só quem tem um dos códigos de acesso gerados consegue
-- ver e responder as perguntas. Cada código é de uso único (uma resposta por
-- PIN), permitindo que várias pessoas da mesma empresa respondam de forma
-- independente, cada uma se identificando (nome, cargo, área de
-- responsabilidade). Sem policy de INSERT/SELECT pública — toda validação de
-- PIN e gravação de resposta passa pelas rotas de API, com a service role key
-- (nunca é a chave anon que decide se um PIN é válido).
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.kairos_briefing_pins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    rotulo VARCHAR(50) NOT NULL, -- referência interna só pra você (ex: "Usuário 1"), nunca exibido a quem responde
    pin VARCHAR(10) UNIQUE NOT NULL DEFAULT LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0'),
    respondido BOOLEAN DEFAULT false NOT NULL,
    respondido_em TIMESTAMP WITH TIME ZONE
);

-- Questionário completo: as mesmas 6 etapas do briefing genérico de
-- plataforma comercial (Tabela 4), MAIS a área de responsabilidade de quem
-- responde e as perguntas específicas do canal de varejo/família. Cada uma
-- das pessoas que recebeu um PIN preenche o questionário inteiro de forma
-- independente — não é uma pessoa por seção.
CREATE TABLE IF NOT EXISTS public.kairos_briefing_respostas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pin_id UUID NOT NULL UNIQUE REFERENCES public.kairos_briefing_pins(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    -- ETAPA 1: SOBRE VOCÊ E A EMPRESA
    nome_solicitante VARCHAR(255) NOT NULL,
    cargo_solicitante VARCHAR(150) NOT NULL,
    area_responsabilidade TEXT NOT NULL,
    empresa_nome VARCHAR(255),
    ramo_atuacao VARCHAR(150),
    email_contato VARCHAR(255) NOT NULL,
    telefone_whatsapp VARCHAR(50),
    cidade_estado VARCHAR(150),
    site_atual VARCHAR(255),

    -- ETAPA 2: O QUE VENDEM E PARA QUEM
    o_que_a_empresa_vende TEXT,
    unidade_de_venda VARCHAR(100),
    quem_e_o_cliente_comprador TEXT,
    ticket_medio_atual VARCHAR(150),
    quantos_clientes_ativos_hoje VARCHAR(100),

    -- ETAPA 3: COMO FUNCIONA O PREÇO
    modelo_de_precificacao VARCHAR(100),
    existe_tabela_de_precos_hoje VARCHAR(100),
    margem_de_negociacao VARCHAR(100),
    quem_aprova_descontos_especiais VARCHAR(255),
    formas_de_pagamento_aceitas JSONB DEFAULT '[]'::jsonb,
    variaveis_que_definem_o_preco TEXT,

    -- ETAPA 4: FLUXO COMERCIAL, DA PRÉ-VENDA AO PÓS-VENDA
    como_surge_um_lead_hoje TEXT,
    etapas_do_processo_comercial TEXT,
    tempo_medio_de_fechamento VARCHAR(100),
    documentos_usados_no_processo VARCHAR(255),
    o_que_acontece_apos_o_fechamento TEXT,
    tipo_de_relacionamento_com_cliente VARCHAR(100),
    como_e_feita_a_renovacao TEXT,

    -- ETAPA 5: CLIENTES ATUAIS (CADASTRO) — mesmo formato da Tabela 4
    clientes_atuais JSONB DEFAULT '[]'::jsonb,

    -- ETAPA 6: METAS E PLANEJAMENTO COMERCIAL
    periodo_de_planejamento VARCHAR(100),
    meta_novos_clientes_periodo VARCHAR(150),
    meta_escolas_novas_2027 VARCHAR(150),
    meta_reunioes_ate_dez_2026 VARCHAR(150),
    meta_alunos VARCHAR(150),
    meta_livros_vendidos VARCHAR(150),
    meta_faturamento_periodo VARCHAR(150),
    meta_percentual_renovacao VARCHAR(100),
    indicadores_que_ja_acompanham_hoje TEXT,
    outras_metas_com_prazo TEXT,
    observacoes_finais TEXT,

    -- ETAPA 7: CANAL DE VAREJO — MODELO DE VENDA PARA A FAMÍLIA
    venda_familia_site_proprio TEXT,
    preco_familia_vs_escola TEXT,
    compra_parcelada_ou_avulsa TEXT,
    familia_multiplos_filhos TEXT,
    desconto_irmaos TEXT,
    compra_tem_atendimento_humano TEXT,
    suporte_pos_venda_familia TEXT,

    -- ETAPA 8: LOGÍSTICA FÍSICA, CRUZAMENTO ENTRE CANAIS E PERGUNTA ABERTA
    rastreamento_envio_individual TEXT,
    controle_estoque_livros TEXT,
    familia_de_escola_parceira_compra_avulso TEXT,
    metas_separadas_por_canal TEXT,
    outras_funcionalidades_importantes TEXT
);

CREATE INDEX IF NOT EXISTS idx_kairos_pins_pin ON public.kairos_briefing_pins (pin);
CREATE INDEX IF NOT EXISTS idx_kairos_respostas_pin_id ON public.kairos_briefing_respostas (pin_id);

ALTER TABLE public.kairos_briefing_pins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kairos_briefing_respostas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Apenas administradores podem ler pins"
ON public.kairos_briefing_pins
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');

CREATE POLICY "Apenas administradores podem ler respostas do briefing kairos"
ON public.kairos_briefing_respostas
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');
