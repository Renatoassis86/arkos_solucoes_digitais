-- ==============================================================================
-- MODELO RELACIONAL DO BANCO DE DADOS SUPABASE / POSTGRESQL
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
-- TABELA 2: BRIEFINGS MODULARES (DIAGNÓSTICO COMPLETO /briefing)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.briefings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    status VARCHAR(50) DEFAULT 'recebido' NOT NULL, -- 'recebido', 'em_analise', 'proposta_enviada', 'fechado', 'arquivado'
    
    -- ETAPA 1: SOBRE VOCÊ E SUA EMPRESA
    nome_solicitante VARCHAR(255) NOT NULL,
    cargo_solicitante VARCHAR(150),
    empresa_nome VARCHAR(255) NOT NULL,
    ramo_atuacao VARCHAR(150) NOT NULL,
    email_contato VARCHAR(255) NOT NULL,
    telefone_whatsapp VARCHAR(50) NOT NULL,
    cidade_estado VARCHAR(150),
    website_atual VARCHAR(255),

    -- ETAPA 2: MODELO DE NEGÓCIO E PERSONA (CLIENTE IDEAL)
    o_que_sua_empresa_faz TEXT NOT NULL,
    como_sua_empresa_ganha_dinheiro VARCHAR(150), -- servico_sob_consulta, venda_produtos, mensalidade_assinatura, outro
    quem_e_seu_cliente_ideal TEXT NOT NULL,
    principal_dor_do_seu_cliente TEXT,
    por_que_o_cliente_escolhe_voce TEXT,

    -- ETAPA 3: O QUE O SITE PRECISA TER
    formato_do_site VARCHAR(100) NOT NULL, -- landing_page_unica, site_institucional_completo, loja_virtual, portal_ou_sistema
    numero_estimado_paginas VARCHAR(50), -- 1_pagina, 2_a_5_paginas, 6_a_10_paginas, mais_de_10_paginas
    acao_principal_desejada VARCHAR(150) NOT NULL, -- chamar_no_whatsapp, preencher_formulario, comprar_direto, agendar_horario, ligar_telefone
    recursos_desejados JSONB DEFAULT '[]'::jsonb, -- lista de checkboxes marcados
    outros_sistemas_para_integrar TEXT,

    -- ETAPA 4: IDENTIDADE VISUAL E REFERÊNCIAS
    ja_possui_logomarca_ou_brandbook VARCHAR(50), -- sim_tenho_tudo, tenho_apenas_logo, nao_preciso_criar
    estilo_visual_preferido VARCHAR(100), -- escuro_moderno, claro_minimalista, corporativo_tradicional, colorido_vibrante
    links_de_sites_que_voce_gosta TEXT,
    arquivos_anexos JSONB DEFAULT '[]'::jsonb, -- nomes ou URLs dos arquivos

    -- ETAPA 5: PRAZO E FAIXA DE INVESTIMENTO
    prazo_desejado VARCHAR(50), -- urgente_15_dias, normal_30_dias, 45_a_60_dias, flexivel
    faixa_investimento VARCHAR(100) NOT NULL, -- a_partir_600, 1500_a_3000, 3000_a_6000, 6000_a_15000, acima_15000
    observacoes_finais TEXT
);

CREATE INDEX IF NOT EXISTS idx_briefings_email ON public.briefings (email_contato);
CREATE INDEX IF NOT EXISTS idx_briefings_status ON public.briefings (status);
CREATE INDEX IF NOT EXISTS idx_briefings_created_at ON public.briefings (created_at DESC);

-- ==============================================================================
-- TABELA 3: ANEXOS DO BRIEFING (RELAÇÃO 1:N PARA BRANDBOOK, PRINTS, LOGOS)
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

-- 1. Inserção pública permitida para qualquer visitante do site (anônimo ou autenticado)
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

-- 2. Leitura restrita a administradores autenticados da ARKOS
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
-- TRIGGERS DE ATUALIZAÇÃO AUTOMÁTICA DE DATA (updated_at)
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contatos_updated_at
BEFORE UPDATE ON public.contatos
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_briefings_updated_at
BEFORE UPDATE ON public.briefings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
