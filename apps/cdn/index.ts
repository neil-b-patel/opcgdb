import fs from 'fs';
import fse from 'fs-extra/esm';
import path from 'path';

import { cards, type OPLang, sets } from '@opcgdb/data';

import compressImages from './lib/compress-images.js';
import downloadImages from './lib/download-images.js';

const baseDir = path.join(__dirname, './assets/raw');
const baseOutDir = path.join(__dirname, './assets/public');
const imagesOutputDir = path.join(baseOutDir, 'cardlist');
const cardDbDir = path.join(baseOutDir, 'db/cards');
const setDbDir = path.join(baseOutDir, 'db/sets');
const pkg = fse.readJsonSync(path.resolve(__dirname, './package.json'));

const _lastUpdated = new Date().toISOString();

const process = async (lang: OPLang) => {
  // Download images
  await downloadImages(lang);

  // Compress them
  await compressImages('**/*.png', {
    baseDir,
    outputDir: imagesOutputDir,
    format: ['webp'],
    quality: 80,
  });

  const commonOut = {
    _version: pkg.version,
    _lastUpdated,
  };

  const cardList = {
    ...commonOut,
    data: cards[lang],
  };

  const setList = {
    ...commonOut,
    data: sets[lang],
  };

  // Save Database
  console.info('📦 Writing database files');
  fse.ensureDirSync(cardDbDir);
  fse.ensureDirSync(setDbDir);
  fs.writeFileSync(path.resolve(cardDbDir, `${lang}.json`), JSON.stringify(cardList, null, 2));
  fs.writeFileSync(path.resolve(setDbDir, `${lang}.json`), JSON.stringify(setList, null, 2));

  console.info('✅ Done');
};

const run = async () => {
  await process('en');
  await process('jp');
};

run();
