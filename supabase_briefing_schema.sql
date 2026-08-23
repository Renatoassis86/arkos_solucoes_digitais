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
