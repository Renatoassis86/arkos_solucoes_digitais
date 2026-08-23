const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const idx = trimmed.indexOf('=');
    if (idx > -1) {
      const k = trimmed.substring(0, idx).trim();
      const v = trimmed.substring(idx + 1).trim().replace(/^['"]|['"]$/g, '');
      env[k] = v;
    }
  }
});

const { createClient } = require('@supabase/supabase-js');

async function main() {
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  console.log('Supabase URL:', supabaseUrl);

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.from('briefings').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Error querying briefings:', error);
    return;
  }

  console.log(`Found ${data.length} briefings:`);
  data.forEach((b, idx) => {
    console.log(`\n=== BRIEFING #${idx + 1} ===`);
    console.log('ID:', b.id);
    console.log('Created At:', b.created_at);
    console.log('Responsável:', b.nome_responsavel);
    console.log('Empresa:', b.nome_empresa);
    console.log('Email:', b.email);
    console.log('WhatsApp:', b.whatsapp);
    console.log('Cargo:', b.cargo);
    console.log('Cidade/UF:', b.cidade_uf);
    console.log('Segmento:', b.segmento);
    console.log('Tamanho/Estágio:', b.estagio_negocio);
    console.log('UVP / Diferencial:', b.uvp_diferencial);
    console.log('Persona / Público:', b.publico_alvo);
    console.log('Dor Principal:', b.dor_principal);
    console.log('Maior Objeção:', b.maior_objecao);
    console.log('Ticket Médio:', b.ticket_medio);
    console.log('Tipo de Solução:', b.tipo_solucao);
    console.log('Canais Descoberta:', b.canais_descoberta);
    console.log('Ação Primária:', b.acao_primaria);
    console.log('Ação Secundária:', b.acao_secundaria);
    console.log('Sensação da Marca:', b.sensacao_marca);
    console.log('Cores Preferidas:', b.cores_preferidas);
    console.log('Referências que gosta:', b.referencias_gosta);
    console.log('Anti-referências:', b.anti_referencias);
    console.log('Prazo Desejado:', b.prazo_desejado);
    console.log('Faixa Orçamento:', b.faixa_orcamento);
    console.log('Tomadores de Decisão:', b.tomadores_decisao);
    console.log('Critério de Sucesso (30 dias):', b.criterio_sucesso_30d);
    console.log('Detalhes Extras:', b.detalhes_extras);
  });
}

main();
