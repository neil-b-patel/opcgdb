import fs from 'fs';
import { basename, relative } from 'path';

import type { CompressionOptions, ParsedInputFile } from '../types.js';

export const processInput = async (
  input: ParsedInputFile[],
  opts: CompressionOptions,
  handler: (file: ParsedInputFile) => Promise<any>
) => {
  console.info(`⚙️ Found ${input.length} files to compress`);

  let count = 1;
  let skipped = 0;
  let compressed = 0;
  let errors = 0;
  const eFiles = [];

  for (const file of input) {
    if (file.exists) {
      if (fs.existsSync(file.output) && !opts.force) {
        skipped++;
        console.info(
          '⚙️',
          `(${count}/${input.length})`,
          '[ SKIPPED ]',
          `${basename(file.input)} >`,
          `${relative(opts.outputDir, file.output)}`
        );
      } else {
        try {
          await handler(file);
          compressed++;
          console.info(
            '📦',
            `(${count}/${input.length})`,
            '[ DONE ]',
            `${basename(file.input)} >`,
            `${relative(opts.outputDir, file.output)}`
          );
        } catch (err) {
          errors++;
          eFiles.push(file.input);
          console.error('❌', '[ ERROR ]', JSON.stringify(err));
        }
      }
    }
    count++;
  }

  console.info(
    `✅ Compression complete!`,
    `(Compressed: ${compressed}, Skipped: ${skipped}, Errors: ${errors})`
  );
  if (errors > 0) {
    console.info(`❌ [ FILES ]`, eFiles);
  }
};
