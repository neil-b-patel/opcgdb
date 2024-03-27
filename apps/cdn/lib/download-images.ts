import fs from 'fs';
import fse from 'fs-extra/esm';
import https from 'https';
import path from 'path';

import { cards } from '@opcgdb/data';
import type { OPCard, OPLang } from '@opcgdb/types';

const cwd = process.cwd();
const filesSkipped = [];

const attributeImages = {
  '/images/cardlist/attribute/ico_type01.png': 'strike.png',
  '/images/cardlist/attribute/ico_type02.png': 'slash.png',
  '/images/cardlist/attribute/ico_type03.png': 'special.png',
  '/images/cardlist/attribute/ico_type04.png': 'ranged.png',
  '/images/cardlist/attribute/ico_type05.png': 'wisdom.png',
};

type ImagesMeta = {
  total: number;
  current: number;
  fileName?: string;
};

// Function to download an image from a URL and save it to a directory
const downloadImage = async (url: string, directory: string, meta: ImagesMeta, retryCount = 3) => {
  const fileName = path.basename(url);
  const filePath = path.join(directory, meta.fileName || fileName);

  // Check if the file already exists
  if (fs.existsSync(filePath)) {
    console.info(
      '⚙️',
      `(${meta.current}/${meta.total})`,
      '[ SKIPPED ]',
      `${fileName} → ${path.relative(cwd, filePath)}`
    );
    filesSkipped.push(fileName);
    return Promise.resolve();
  }

  const file = fs.createWriteStream(filePath);

  return new Promise<void>((resolve, reject) => {
    const request = https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.info(
            '📦',
            `(${meta.current}/${meta.total})`,
            '[ DONE ]',
            `${fileName} → ${path.relative(cwd, filePath)}`
          );
          resolve();
        });
      });
    });

    request.on('error', async (error) => {
      console.error(`Error downloading ${fileName}: ${error.message}`);
      fs.unlink(filePath, async () => {
        if (retryCount > 0) {
          console.info(`Retrying ${fileName}... (${retryCount} retries left)`);
          // Exponential backoff: wait before retrying
          await new Promise((resolve) => setTimeout(resolve, Math.pow(2, 4 - retryCount) * 1000));
          await downloadImage(url, directory, meta, retryCount - 1);
        } else {
          reject(error);
        }
      });
    });
  });
};

// Function to download multiple images from an array of URLs
const downloadImages = async (
  images: { src: string; outDir: string; fileName?: string }[]
): Promise<void> => {
  for (let idx = 0; idx <= images.length - 1; idx++) {
    const img = images[idx];
    await downloadImage(img.src, img.outDir, {
      total: images.length,
      current: idx + 1,
      fileName: img.fileName || undefined,
    });
  }
};

const run = async () => {
  const srcDomain: Record<OPLang, string> = {
    en: `https://en.onepiece-cardgame.com/images/cardlist/card/`,
    jp: `https://onepiece-cardgame.com/images/cardlist/card/`,
  };
  const baseOutDir = path.resolve(__dirname, `../assets/raw`);

  const imageList: { src: string; outDir: string }[] =
    cards.map((card: OPCard) => ({
      src: `${srcDomain[card.lang as OPLang]}${card.id}.png`,
      outDir: path.resolve(baseOutDir, card.lang),
    })) || [];

  if (imageList.length) {
    fse.ensureDirSync(baseOutDir);
    for (const l of ['en', 'jp']) {
      fse.ensureDirSync(path.resolve(baseOutDir, l));
    }

    await downloadImages(imageList);
  }

  // Attribute images
  const attributeOutDir = path.resolve(baseOutDir, 'attributes');
  fse.ensureDirSync(attributeOutDir);
  const attrImgList = Object.entries(attributeImages).map(([src, fileName]) => ({
    src: `https://en.onepiece-cardgame.com${src}`,
    outDir: attributeOutDir,
    fileName,
  }));

  await downloadImages(attrImgList);

  console.info('✅', '[ DONE ]', 'Images downloaded');
};

export default run;
