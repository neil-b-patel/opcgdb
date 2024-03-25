import fs from 'fs';
import { basename, relative } from 'path';

import type { CdnCompressionOptions, CdnParsedInputFile } from '@opcgdb/types';

export const processInput = async (
  input: CdnParsedInputFile[],
  opts: CdnCompressionOptions,
  handler: (file: CdnParsedInputFile) => Promise<any>
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
