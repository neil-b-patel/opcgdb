import fs from 'fs';

import type { OPCardList, OPLang, OPSeriesCorrections } from '../types.js';

const corrections: OPSeriesCorrections = {
  // [\u3040-\u30FF\uFF65-\uFF9F\u4E00-\u9FAF] -> used to find Japanese characters
  en: [{ from: '音楽', to: 'Music' }],
  jp: [],
};

const sanitize = (input: string, lang: OPLang): string => {
  return corrections[lang].reduce((acc, cur) => {
    return acc.replace(new RegExp(cur.from, 'g'), cur.to);
  }, input);
};

const writeSeriesFile = (series: string, lang: OPLang, data: OPCardList, outFile: string) => {
  try {
    const outData = sanitize(JSON.stringify(data, null, 2), lang);
    fs.writeFileSync(outFile, outData);
  } catch (e: any) {
    console.error(`❌ ${series} (${lang})\n\n`, e.message);
  }
};

export default writeSeriesFile;
