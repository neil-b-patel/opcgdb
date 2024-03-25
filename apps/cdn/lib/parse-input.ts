import fs from 'fs';
import * as glob from 'glob';
import path from 'path';

import { CdnCompressionOptions, CdnParsedInputFile } from '@opcgdb/types';

type IParseInputOpts = {
  format?: string; // custom / internal format
  overrideOutputExtension?: string;
};
/**
 * Returns a list of matched files from an input string,
 * and checks if they exist.
 * @param input
 * @param inputOpts
 * @param opts
 * @returns
 */
export const parseInput = (
  input: string,
  inputOpts: CdnCompressionOptions,
  opts: IParseInputOpts = {}
) => {
  const isGlob = input.includes('*'); // basic check for now.

  const baseInput = inputOpts.baseDir;
  const baseOutput = inputOpts.outputDir;

  let files: string[];
  if (isGlob) {
    files = glob.sync(input, {
      cwd: baseInput,
      ignore: inputOpts.ignore,
    });
  } else {
    files = [input];
  }

  return files.map((_path) => {
    /**
     * Map the input path to payload including meta & file IO information.
     */
    const filePath = path.join(inputOpts.baseDir || '', _path); // path is full file path
    const extension = path.extname(filePath);

    const outExtension = opts.overrideOutputExtension || extension;
    // append a custom suffix to the output path.
    const output = inputOpts.customSuffix
      ? path
          .join(baseInput, path.relative(baseInput, filePath))
          .replace(extension, `${inputOpts.customSuffix}${outExtension}`)
      : path
          .join(baseOutput, path.relative(baseInput, filePath))
          .replace(extension, `${outExtension}`);

    const output_metadata = ''; // created after sizes flatMap below.
    return {
      path: filePath,
      input: filePath,
      output,
      output_metadata,
      exists: fs.existsSync(filePath),
      extension: outExtension,
      format: opts.format || outExtension.replace('.', ''),
      sizing: null,
    } satisfies CdnParsedInputFile;
  });
};
