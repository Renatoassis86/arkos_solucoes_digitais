-- SCHEMA ATUALIZADO DO BANCO DE DADOS SUPABASE / POSTGRESQL
-- ARKOS SOLUÇÕES DIGITAIS — BRIEFING COMPLETO E ACESSÍVEL

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABELA PRINCIPAL DE BRIEFINGS
CREATE TABLE IF NOT EXISTS public.briefings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    status VARCHAR(50) DEFAULT 'recebido' NOT NULL,
    
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

    -- ETAPA 3: O QUE O SITE PRECISA TER (REQUISITOS SIMPLES)
    formato_do_site VARCHAR(100) NOT NULL, -- landing_page_unica, site_institucional_completo, loja_virtual, portal_ou_sistema
    numero_estimado_paginas VARCHAR(50), -- 1_pagina, 2_a_5_paginas, 6_a_10_paginas, mais_de_10_paginas
    acao_principal_desejada VARCHAR(150) NOT NULL, -- chamar_no_whatsapp, preencher_formulario, comprar_direto, agendar_horario, pedir_orcamento
    recursos_desejados JSONB DEFAULT '[]'::jsonb, -- ['botao_whatsapp', 'formulario_contato', 'venda_online', 'agendamento_online', 'area_restrita', 'blog_noticias', 'calculadora_simulador', 'depoimentos_clientes']
    outros_sistemas_para_integrar TEXT,

    -- ETAPA 4: IDENTIDADE VISUAL E ANEXOS
    ja_possui_logomarca_ou_brandbook VARCHAR(50), -- sim_tenho_tudo, tenho_apenas_logo, nao_preciso_criar
    estilo_visual_preferido VARCHAR(100), -- escuro_moderno, claro_minimalista, colorido_vibrante, corporativo_tradicional
    links_de_sites_que_voce_gosta TEXT,
    arquivos_anexos JSONB DEFAULT '[]'::jsonb, -- links de uploads de arquivos no supabase storage

    -- ETAPA 5: PRAZO E FAIXA DE INVESTIMENTO
    prazo_desejado VARCHAR(50), -- urgente_15_dias, normal_30_dias, 45_a_60_dias, flexivel
    faixa_investimento VARCHAR(100) NOT NULL, -- a_partir_600, 1500_a_3000, 3000_a_6000, 6000_a_15000, acima_15000
    observacoes_finais TEXT
);

-- Índices de performance
CREATE INDEX IF NOT EXISTS idx_briefings_email ON public.briefings (email_contato);
CREATE INDEX IF NOT EXISTS idx_briefings_status ON public.briefings (status);
CREATE INDEX IF NOT EXISTS idx_briefings_created_at ON public.briefings (created_at DESC);

-- RLS
ALTER TABLE public.briefings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir envio publico de briefing"
ON public.briefings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Apenas administradores podem ler briefings"
ON public.briefings
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');

-- Trigger de atualização
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_briefings_updated_at
BEFORE UPDATE ON public.briefings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
