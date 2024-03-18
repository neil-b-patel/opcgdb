import { OPTCGLanguage } from '../types.js';
import getPageDOM from './getPageDOM.js';
import getSeriesData from './getSeriesData.js';
import writeSeriesFile from './writeSeriesFile.js';

const crawl = async (lang: OPTCGLanguage): Promise<void> => {
  const url =
    lang === 'en'
      ? `https://en.onepiece-cardgame.com/cardlist/`
      : `https://asia-en.onepiece-cardgame.com/cardlist/`;

  const $ = await getPageDOM(url);
  const seriesList = $('#series option')
    .map((_, el) => $(el).attr('value'))
    .toArray()
    .filter((el) => el !== '');

  for (const series of seriesList) {
    const seriesUrl = `${url}?series=${series}`;
    const $ = await getPageDOM(seriesUrl);
    const seriesCardList = getSeriesData($);
    writeSeriesFile(series, lang, seriesCardList);
  }
};

const run = async () => {
  await crawl('en');
  await crawl('jp');
};

run();
