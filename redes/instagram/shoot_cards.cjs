const { chromium } = require('C:/repositorio/arkos360/node_modules/playwright');
const path = require('path');

(async () => {
  console.log('Iniciando renderização dos cards do Instagram (1080x1350)...');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  
  const fileUrl = 'file:///' + path.join(__dirname, 'cards.html').split(path.sep).join('/');
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  const cards = await page.$$('.card');
  console.log(`Cards encontrados: ${cards.length}`);
  
  for (let i = 0; i < cards.length; i++) {
    const filePath = path.join(__dirname, `card-${i + 1}.png`);
    await cards[i].screenshot({ path: filePath });
    console.log(`✓ Card Instagram salvo: card-${i + 1}.png`);
  }
  
  await browser.close();
  console.log('Todos os cards do Instagram foram gerados com sucesso!');
})();
