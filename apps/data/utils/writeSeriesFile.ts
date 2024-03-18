import fs from 'fs';
import path from 'path';

import { type OPTCGCardList, type OPTCGLanguage, type OPTCGSeriesCorrections } from '../types.js';

const corrections: OPTCGSeriesCorrections = {
  // [\u3040-\u30FF\uFF65-\uFF9F\u4E00-\u9FAF] -> used to find Japanese characters
  en: [{ from: '音楽', to: 'Music' }],
  jp: [],
};

const sanitize = (input: string, lang: OPTCGLanguage): string => {
  return corrections[lang].reduce((acc, cur) => {
    return acc.replace(new RegExp(cur.from, 'g'), cur.to);
  }, input);
};

const writeSeriesFile = async (series: string, lang: OPTCGLanguage, data: OPTCGCardList) => {
  try {
    const outDir = path.resolve(__dirname, `../cardlist/${lang}`);
    const outFile = path.resolve(outDir, `${series}.json`);
    const outData = sanitize(JSON.stringify(data, null, 2), lang);
    await fs.writeFile(outFile, outData, () => {
      console.info(`✅ ${series} (${lang})`);
    });
  } catch (e: any) {
    console.error(`❌ ${series} (${lang})\n\n`, e.message);
  }
};

export default writeSeriesFile;
