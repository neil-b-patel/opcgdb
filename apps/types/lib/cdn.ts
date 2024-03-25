import { z } from 'zod';

export const CdnCompressImageFormatSchema = z.enum(['jpeg', 'png', 'webp', 'gif', 'avif']);
export type CdnCompressImageFormat = z.infer<typeof CdnCompressImageFormatSchema>;

export const CdnCompressionOptionsSchema = z.object({
  baseDir: z.string().describe('Base directory used to target files. Used to be called cwd'),
  outputDir: z
    .string()
    .describe('Directory where compressed files will be written to. Used to be called output'),
  ignore: z.string().array().optional().describe('Glob pattern to files that should be ignored.'),
  force: z
    .boolean()
    .optional()
    .describe('Flag indicating if the process should run even if a cache exists. Default: false'),
  customSuffix: z
    .string()
    .optional()
    .describe('Suffix appended to the output file names. Default: undefined'),
  sizes: z
    .record(z.string(), z.number())
    .optional()
    .describe(
      "A breakpoint / responsive style set of keys. Any number higher than 1 is fixed sizing, otherwise it's a scaling factor."
    ),
  format: z
    .union([CdnCompressImageFormatSchema, CdnCompressImageFormatSchema.array()])
    .describe('Format to which images will be compressed to'),
  quality: z.number().describe('Compression quality to be applied to the images'),
});
export type CdnCompressionOptions = z.infer<typeof CdnCompressionOptionsSchema>;

export const CdnCompressionFnSchema = z
  .function()
  .args(z.string(), CdnCompressionOptionsSchema)
  .returns(z.promise(z.void()));
export type CdnCompressionFn = z.infer<typeof CdnCompressionFnSchema>;

export const CdnParsedInputFileSchema = z.object({
  path: z.string(),
  input: z.string(),
  output: z.string(),
  output_metadata: z.string(),
  exists: z.boolean(),
  extension: z.string(),
  format: z.string().optional().describe('TBD - required for internal formats on mp4 / alpha'),
  sizing: z.union([
    z.null(),
    z.undefined(),
    z.object({
      type: z.enum(['scale', 'fixed']),
      size: z.number(),
      name: z.string(),
    }),
  ]),
});
export type CdnParsedInputFile = z.infer<typeof CdnParsedInputFileSchema>;
