import { marshall } from '@aws-sdk/util-dynamodb';
import fs from 'fs';
import fse from 'fs-extra/esm';
import path from 'path';

import { cards, sets } from '@opcgdb/data';
import type { OPCard, OPSet } from '@opcgdb/types';

import compressImages from './lib/compress-images.js';
import downloadImages from './lib/download-images.js';

const cwd = process.cwd();
const baseDir = path.join(__dirname, './assets/raw');
const baseOutDir = path.join(__dirname, './assets/public');
const imagesOutputDir = path.join(baseOutDir, 'cardlist');
const dbDir = path.join(baseOutDir, 'db');
const cardDbFile = path.resolve(dbDir, `cards.json`);
const setDbFile = path.resolve(dbDir, `sets.json`);
const pkg = fse.readJsonSync(path.resolve(__dirname, './package.json'));

const _lastUpdated = new Date().toISOString();

const processAssets = async () => {
  // Download images
  await downloadImages();

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
    data: cards,
  };

  const setList = {
    ...commonOut,
    data: sets,
  };

  // Save Database
  console.info('⚙️ Writing database files');
  fse.ensureDirSync(dbDir);

  fs.writeFileSync(cardDbFile, JSON.stringify(cardList, null, 2));
  console.info('📦', '(1/2)', '[ DONE ]', `cardDb → ${path.relative(cwd, cardDbFile)}`);

  fs.writeFileSync(setDbFile, JSON.stringify(setList, null, 2));
  console.info('📦', '(2/2)', '[ DONE ]', `setDb → ${path.relative(cwd, setDbFile)}`);

  // Save DynamoDb JSON compatible files for cards and sets
  console.info('⚙️ Writing DynamoDB compatible files');
  const cardDbDynamo = cards.map((card: OPCard) =>
    marshall({
      ...card,
      color: new Set(card.color),
      type: new Set(card.type),
      searchType: new Set(card.searchType),
    })
  );
  fs.writeFileSync(path.resolve(dbDir, 'dynamo-cards.json'), JSON.stringify(cardDbDynamo, null, 2));
  const setDbDynamo = sets.map((set: OPSet) =>
    marshall({
      ...set,
      siteId: new Set(set.siteId),
    })
  );
  fs.writeFileSync(path.resolve(dbDir, 'dynamo-sets.json'), JSON.stringify(setDbDynamo, null, 2));

  console.info('✅ Done');
};

const run = async () => {
  await processAssets();
};

run();
