const fs = require('fs');
const path = require('path');

const BENCHMARK_DIR = 'C:\\repositorio\\arkos_solucoes_digitais\\prints_benchmark';
const DATASET_JSON_OUT = 'C:\\repositorio\\arkos_solucoes_digitais\\prints_benchmark\\dataset_ml_features.json';
const INDEX_MD_OUT = 'C:\\repositorio\\arkos_solucoes_digitais\\prints_benchmark\\benchmark_500_index.md';

function parseContentMd(filePath) {
  try {
    const text = fs.readFileSync(filePath, 'utf-8');
    
    // Extract word count
    const wordMatch = text.match(/Total de Palavras no DOM:\*\* (\d+)/);
    const wordCount = wordMatch ? parseInt(wordMatch[1]) : 0;
    
    // Extract typography
    const fontMatch = text.match(/Família Tipográfica Principal:\*\* `([^`]+)`/);
    const fontFamily = fontMatch ? fontMatch[1] : 'Sans-Serif';
    
    // Extract Headlines
    const h1Match = text.match(/## 1\. Proposta de Valor[\s\S]*?\* \*\*Headlines H1:\*\*([\s\S]*?)\* \*\*Subheadline/);
    const headlines = h1Match ? h1Match[1].split('\n').map(l => l.replace(/^\s*-\s*"?|"$/g, '').trim()).filter(l => l && !l.startsWith('(')) : [];

    // Extract CTAs
    const ctaMatch = text.match(/## 3\. Chamadas para Ação[\s\S]*?\n([\s\S]*?)## 4\./);
    const ctas = ctaMatch ? ctaMatch[1].split('\n').map(l => l.replace(/^- `\[ | \]`$/g, '').trim()).filter(l => l && !l.startsWith('- Nenhum')) : [];

    // Extract Sections H2
    const h2Match = text.match(/### Títulos de Seção \(H2\):([\s\S]*?)### Subtítulos/);
    const sections = h2Match ? h2Match[1].split('\n').map(l => l.replace(/^- /, '').trim()).filter(l => l && !l.startsWith('- Nenhum')) : [];

    return {
      wordCount,
      fontFamily,
      headlines,
      ctas,
      sections
    };
  } catch (e) {
    return null;
  }
}

function run() {
  console.log('Compiling Big Data NLP Dataset for Machine Learning...');
  const categories = fs.readdirSync(BENCHMARK_DIR).filter(item => {
    const full = path.join(BENCHMARK_DIR, item);
    return fs.statSync(full).isDirectory() && item.match(/^\d{2}_/);
  });

  const dataset = {
    metadata: {
      generatedAt: new Date().toISOString(),
      totalVerticals: categories.length,
      totalCompanies: 0,
      totalScreenshots: 0,
      totalNLPContentFiles: 0,
      purpose: 'Machine Learning Training Dataset for Automated High-Conversion Website Generation'
    },
    verticalStats: {},
    companies: []
  };

  let totalCompanies = 0;
  let totalDesktopScreenshots = 0;
  let totalMobileScreenshots = 0;
  let totalContentFiles = 0;

  let indexMarkdown = `# ÍNDICE MASTER BIG DATA DO BENCHMARK (500+ SITES & GRANDES AGÊNCIAS)

- **Total de Verticais Mapeadas:** 10 Verticais Especializadas
- **Data da Consolidação:** ${new Date().toISOString().replace('T', ' ').substring(0, 19)} (UTC)
- **Dataset Estruturado de Machine Learning:** [\`dataset_ml_features.json\`](file:///c:/repositorio/arkos_solucoes_digitais/prints_benchmark/dataset_ml_features.json)
- **Finalidade:** Treinamento de modelos preditivos e generativos de UI/UX, copywriting e arquitetura de conversão.

---

`;

  for (const category of categories) {
    const catPath = path.join(BENCHMARK_DIR, category);
    const companyFolders = fs.readdirSync(catPath).filter(item => {
      const full = path.join(catPath, item);
      return fs.statSync(full).isDirectory();
    });

    indexMarkdown += `\n## Vertical: \`${category}\` (${companyFolders.length} Empresas Mapeadas)\n\n`;
    indexMarkdown += `| Empresa | Desktop Full-Page | Mobile Full-Page | NLP Content (PLN) | Palavras no DOM | Tipografia Base |\n`;
    indexMarkdown += `| :--- | :---: | :---: | :---: | :---: | :--- |\n`;

    const catStats = {
      count: companyFolders.length,
      avgWords: 0,
      totalWords: 0,
      topCTAs: {},
      topFonts: {}
    };

    for (const comp of companyFolders) {
      totalCompanies++;
      const compDir = path.join(catPath, comp);
      const desktopPng = path.join(compDir, 'home_desktop.png');
      const mobilePng = path.join(compDir, 'home_mobile.png');
      const contentMd = path.join(compDir, 'content.md');

      const hasDesktop = fs.existsSync(desktopPng) && fs.statSync(desktopPng).size > 20000;
      const hasMobile = fs.existsSync(mobilePng) && fs.statSync(mobilePng).size > 15000;
      const hasContent = fs.existsSync(contentMd) && fs.statSync(contentMd).size > 200;

      if (hasDesktop) totalDesktopScreenshots++;
      if (hasMobile) totalMobileScreenshots++;
      if (hasContent) totalContentFiles++;

      let nlpParsed = null;
      if (hasContent) {
        nlpParsed = parseContentMd(contentMd);
        if (nlpParsed) {
          catStats.totalWords += nlpParsed.wordCount;
          catStats.topFonts[nlpParsed.fontFamily] = (catStats.topFonts[nlpParsed.fontFamily] || 0) + 1;
          for (const cta of nlpParsed.ctas) {
            catStats.topCTAs[cta] = (catStats.topCTAs[cta] || 0) + 1;
          }
        }
      }

      const words = nlpParsed ? nlpParsed.wordCount : 'N/A';
      const font = nlpParsed ? nlpParsed.fontFamily : 'Sans-Serif';

      indexMarkdown += `| [${comp}](file:///${compDir.replace(/\\/g, '/')}) | ${hasDesktop ? '✅' : '❌'} | ${hasMobile ? '✅' : '❌'} | ${hasContent ? `[content.md](file:///${contentMd.replace(/\\/g, '/')})` : '❌'} | ${words} | \`${font}\` |\n`;

      dataset.companies.push({
        name: comp,
        category,
        directory: compDir,
        hasDesktop,
        hasMobile,
        hasContent,
        nlp: nlpParsed
      });
    }

    catStats.avgWords = Math.round(catStats.totalWords / (companyFolders.length || 1));
    dataset.verticalStats[category] = catStats;
  }

  // Also index root agencies
  const rootAgencies = [
    'metalab', 'instrument', 'locomotive', 'huge', 'programatorio', 'sa-design',
    'work-co', 'active-theory', 'cuberto', 'rezo-zero', 'basic-culture', 'dogstudio', 'rga', 'bolha'
  ];

  indexMarkdown += `\n## Agências de Elite Globais e Nacionais (Pastas Raiz)\n\n`;
  indexMarkdown += `| Agência | Desktop Full-Page | Mobile Full-Page | Work/Cases | NLP Content (PLN) |\n`;
  indexMarkdown += `| :--- | :---: | :---: | :---: | :---: |\n`;

  for (const agency of rootAgencies) {
    const dir = path.join(BENCHMARK_DIR, agency);
    if (fs.existsSync(dir)) {
      const dPng = path.join(dir, 'home_desktop.png');
      const mPng = path.join(dir, 'home_mobile.png');
      const wPng = path.join(dir, 'work_desktop.png');
      const cMd = path.join(dir, 'content.md');

      indexMarkdown += `| [${agency}](file:///${dir.replace(/\\/g, '/')}) | ${fs.existsSync(dPng) ? '✅' : '❌'} | ${fs.existsSync(mPng) ? '✅' : '❌'} | ${fs.existsSync(wPng) ? '✅' : '❌'} | ${fs.existsSync(cMd) ? `[content.md](file:///${cMd.replace(/\\/g, '/')})` : '❌'} |\n`;
    }
  }

  dataset.metadata.totalCompanies = totalCompanies;
  dataset.metadata.totalScreenshots = totalDesktopScreenshots + totalMobileScreenshots;
  dataset.metadata.totalNLPContentFiles = totalContentFiles;

  fs.writeFileSync(DATASET_JSON_OUT, JSON.stringify(dataset, null, 2), 'utf-8');
  fs.writeFileSync(INDEX_MD_OUT, indexMarkdown, 'utf-8');

  console.log(`Successfully compiled ${totalCompanies} companies across 10 verticals!`);
  console.log(`Dataset written to: ${DATASET_JSON_OUT}`);
  console.log(`Index markdown written to: ${INDEX_MD_OUT}`);
}

run();
