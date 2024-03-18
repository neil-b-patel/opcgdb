#!/usr/bin/env node
import fs from 'fs';
import fse from 'fs-extra/esm';
import https from 'https';
import path from 'path';

import { cards } from '@opcgdb/data';
import type { OPTCGCard, OPTCGLanguage } from '@opcgdb/data';

const cwd = process.cwd();
const filesSkipped = [];

// Function to download an image from a URL and save it to a directory
const downloadImage = async (url: string, directory: string, retryCount = 3) => {
  const fileName = path.basename(url);
  const filePath = path.join(directory, fileName);

  // Check if the file already exists
  if (fs.existsSync(filePath)) {
    // console.info(`⚠️ ${fileName} already exists. Skipping.`);
    filesSkipped.push(fileName);
    return Promise.resolve();
  }

  const file = fs.createWriteStream(filePath);

  return new Promise<void>((resolve, reject) => {
    const request = https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.info(`⬇️ ${fileName} → ./${path.relative(cwd, filePath)}`);
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
          await downloadImage(url, directory, retryCount - 1);
        } else {
          reject(error);
        }
      });
    });
  });
};

// Function to download multiple images from an array of URLs
const downloadImages = async (urls: string[], directory: string): Promise<void> => {
  for (const url of urls) {
    await downloadImage(url, directory);
  }
};

const run = async (lang: OPTCGLanguage) => {
  // // Check if --lang argument is provided
  // const langIndex = process.argv.indexOf('--lang');
  // if (langIndex === -1 || langIndex === process.argv.length - 1) {
  //   console.error('Error: --lang parameter is required');
  //   process.exit(1); // Exit the script with a non-zero exit code
  // }
  // const lang = process.argv[langIndex + 1] as OPTCGLanguage;

  // const validLangs = ['en', 'jp'];

  // if (!validLangs.includes(lang)) {
  //   console.error("Error: Only 'en' and 'jp' languages are supported.");
  //   process.exit(1); // Exit the script with a non-zero exit code
  // }

  const srcDomain =
    lang === 'en'
      ? `https://en.onepiece-cardgame.com/images/cardlist/card/`
      : `https://asia-en.onepiece-cardgame.com/images/cardlist/card/`;
  const outDir = path.resolve(__dirname, `../assets/raw/${lang}`);

  const imageList: string[] =
    cards[lang].map((card: OPTCGCard) => `${srcDomain}${card.id}.png`) || [];

  if (imageList.length) {
    fse.ensureDirSync(outDir);
    await downloadImages(imageList, outDir);
  }
};

export default run;
