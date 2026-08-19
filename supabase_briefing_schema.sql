-- SCHEMA COMPLETO DO BANCO DE DADOS SUPABASE / POSTGRESQL
-- ARKOS SOLUÇÕES DIGITAIS — BRIEFING MODULAR DE ENGENHARIA E PRODUTO

-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABELA PRINCIPAL DE BRIEFINGS
CREATE TABLE IF NOT EXISTS public.briefings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    status VARCHAR(50) DEFAULT 'recebido' NOT NULL, -- recebido, em_analise, proposta_gerada, aprovado, arquivado
    
    -- MÓDULO 1: IDENTIFICAÇÃO DO CLIENTE & MODELO DE NEGÓCIO
    nome_solicitante VARCHAR(255) NOT NULL,
    cargo_solicitante VARCHAR(150),
    empresa_nome VARCHAR(255) NOT NULL,
    empresa_segmento VARCHAR(100) NOT NULL, -- b2b_saas, fintech, ecommerce, saude, luxo, industria, agencias, outro
    email_corporativo VARCHAR(255) NOT NULL,
    telefone_whatsapp VARCHAR(50) NOT NULL,
    website_atual VARCHAR(255),
    tamanho_empresa VARCHAR(50), -- 1-10, 11-50, 51-200, 201-1000, 1000+
    modelo_receita VARCHAR(100), -- assinatura_saas, venda_direta, lead_b2b, marketplace, servico

    -- MÓDULO 2: ESCOPO DO PRODUTO & REQUISITOS FUNCIONAIS
    tipo_projeto VARCHAR(100) NOT NULL, -- site_institucional, webapp_saas, portal_cliente, ecommerce_d2c, redesign_total, refatoracao_tecnica
    objetivo_primario TEXT NOT NULL,
    publico_alvo TEXT NOT NULL,
    funcionalidades_chave JSONB DEFAULT '[]'::jsonb, -- ['auth_usuarios', 'checkout_pagamento', 'painel_admin', 'agendamento', 'blog_cms', 'multilingue']
    sistemas_legados TEXT,

    -- MÓDULO 3: ARQUITETURA DE INTEGRAÇÃO & STACK TÉCNICA
    integracoes_necessarias JSONB DEFAULT '[]'::jsonb, -- ['crm_hubspot_rd', 'gateway_stripe_asaas', 'erp_sap_totvs', 'analytics_ga4', 'supabase_postgres']
    preferencia_stack VARCHAR(100) DEFAULT 'nextjs_react', -- nextjs_react, react_vite, agnostico_recomendacao
    requisitos_seguranca JSONB DEFAULT '[]'::jsonb, -- ['lgpd_compliance', 'autenticacao_2fa', 'criptografia_dados', 'ssl_avancado']
    infraestrutura_hospedagem VARCHAR(100), -- vercel, aws, google_cloud, propria

    -- MÓDULO 4: DESIGN SYSTEM & EXPERIÊNCIA DO USUÁRIO (UX/UI)
    posicionamento_estetico VARCHAR(100), -- tech_dark_mode, minimalista_editorial, corporativo_clean, vibrante_moderno
    possui_brandbook BOOLEAN DEFAULT false,
    referencias_visuais JSONB DEFAULT '[]'::jsonb, -- links ou nomes de benchmarks admirados
    idiomas_necessarios JSONB DEFAULT '["pt-BR"]'::jsonb,

    -- MÓDULO 5: DADOS, TELEMETRIA & CONVERSÃO
    kpis_principais JSONB DEFAULT '[]'::jsonb, -- ['aumento_taxa_conversao', 'reducao_tempo_carregamento', 'geracao_leads_qualificados', 'vendas_diretas']
    ferramentas_analytics JSONB DEFAULT '[]'::jsonb,

    -- MÓDULO 6: CRONOGRAMA, ORÇAMENTO & GOVERNANÇA
    prazo_desejado VARCHAR(50), -- 30_dias, 60_dias, 90_dias, flexivel
    faixa_investimento VARCHAR(100) NOT NULL, -- 15k_30k, 30k_60k, 60k_120k, acima_120k
    observacoes_adicionais TEXT,
    metadados_tecnicos JSONB DEFAULT '{}'::jsonb
);

-- Índices para buscas rápidas
CREATE INDEX IF NOT EXISTS idx_briefings_email ON public.briefings (email_corporativo);
CREATE INDEX IF NOT EXISTS idx_briefings_status ON public.briefings (status);
CREATE INDEX IF NOT EXISTS idx_briefings_created_at ON public.briefings (created_at DESC);

-- 2. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.briefings ENABLE ROW LEVEL SECURITY;

-- Política de Inserção Pública (Permite que clientes enviem o briefing anonimamente pelo site)
CREATE POLICY "Permitir envio publico de briefing"
ON public.briefings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Política de Leitura Restrita (Apenas administradores autenticados podem ver os briefings)
CREATE POLICY "Apenas administradores podem ler briefings"
ON public.briefings
FOR SELECT
TO authenticated
USING (auth.role() = 'authenticated');

-- 3. TRIGGER AUTOMÁTICO PARA ATUALIZAR 'updated_at'
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
