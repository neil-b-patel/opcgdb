import fse from 'fs-extra/esm';
import { dirname } from 'path';
import sharp from 'sharp';

import type { CompressionFn } from '../types.js';
import { parseInput } from './parse-input.js';
import { processInput } from './process-input.js';

const compressImages: CompressionFn = async (input, opts) => {
  const tasks = Array.isArray(opts.format) ? opts.format : [opts.format];

  const files = tasks.flatMap((format) =>
    parseInput(input, opts, {
      overrideOutputExtension: `.${format}`,
    })
  );

  await processInput(files, opts, async (file) => {
    const format = file.extension.replace('.', '') as keyof sharp.FormatEnum;
    fse.ensureDirSync(dirname(file.output));

    const op = sharp(file.input);

    await op
      .toFormat(format, {
        quality: opts.quality,
      })
      .toFile(file.output);

    sharp(file.output);
  });
};

export default compressImages;
