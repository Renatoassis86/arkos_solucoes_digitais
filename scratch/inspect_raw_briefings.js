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
  const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  
  const { data, error } = await supabase.from('briefings').select('*');
  console.log('Error:', error);
  console.log('Data raw:', JSON.stringify(data, null, 2));

  // Check if there are other tables or leads
  const tables = ['leads', 'contacts', 'propostas', 'promisse', 'calebe', 'clientes'];
  for (const t of tables) {
    const res = await supabase.from(t).select('*');
    if (!res.error) {
      console.log(`Table ${t}:`, res.data);
    }
  }
}

main();
