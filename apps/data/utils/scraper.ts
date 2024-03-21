import fs from 'fs';
import path from 'path';

import { OPLang } from '../types.js';
import getPageDOM from './getPageDOM.js';
import getSeriesData from './getSeriesData.js';
import writeSeriesFile from './writeSeriesFile.js';

const crawl = async (lang: OPLang, force: boolean): Promise<void> => {
  const url =
    lang === 'en'
      ? `https://en.onepiece-cardgame.com/cardlist/`
      : `https://asia-en.onepiece-cardgame.com/cardlist/`;

  console.info(`⚙️`, 'Fetching series list...', `(${lang})`);
  const $ = await getPageDOM(url);
  const seriesList = $('#series option')
    .map((_, el) => $(el).attr('value'))
    .toArray()
    .filter((el) => el !== '');

  for (const [idx, series] of seriesList.entries()) {
    const outDir = path.resolve(__dirname, `../cardlist/${lang}`);
    const outFile = path.resolve(outDir, `${series}.json`);

    if (!fs.existsSync(outFile) && !force) {
      const seriesUrl = `${url}?series=${series}`;
      const $ = await getPageDOM(seriesUrl);
      const seriesCardList = getSeriesData($);
      writeSeriesFile(series, lang, seriesCardList, outFile);
      console.info(
        `📦`,
        `(${idx + 1}/${seriesList.length})`,
        `[ DONE ]`,
        path.relative(outDir, outFile),
        `(${lang})`
      );
    } else {
      console.info(
        `⚙️`,
        `(${idx + 1}/${seriesList.length})`,
        `[ SKIPPED ]`,
        path.relative(outDir, outFile),
        `(${lang})`
      );
    }
  }
  console.info('✅ [ DONE ]', 'Data scraped and files written', `(${lang})`);
};

const run = async (force = false) => {
  await crawl('en', force);
  await crawl('jp', force);
};

run();
