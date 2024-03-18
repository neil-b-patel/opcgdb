export type CompressImageFormat = 'jpeg' | 'png' | 'webp' | 'gif' | 'avif';

export interface CompressionOptions {
  /**
   * Base directory used to target files. Used to be called cwd
   */
  baseDir: string;
  /**
   * Directory where compressed files will be written to. Used to be called output
   */
  outputDir: string;
  /**
   * Glob pattern to files that should be ignored.
   */
  ignore?: string | string[];
  /**
   * Flag indicating if the process should run even if a cache exists. Default: false
   */
  force?: boolean; // force run, even if cached
  /**
   * Suffix appended to the output file names. Default: undefined
   */
  customSuffix?: string;
  /**
   * A breakpoint / responsive style set of keys. Any number higher than 1 is fixed sizing,
   * otherwise it's a scaling factor.
   */
  sizes?: {
    [key: string]: number;
  };
  /**
   * Format to which images will be compressed to
   */
  format: CompressImageFormat | CompressImageFormat[];
  /**
   * Compression quality to be applied to the images
   */
  quality: number;
}

/**
 * Generic function signature for any
 */
export type CompressionFn = (input: string, opts: CompressionOptions) => Promise<void>;

export type ParsedInputFile = {
  path: string;
  input: string;
  output: string;
  output_metadata: string;
  exists: boolean;
  extension: string;
  format?: string; // TBD - required for internal formats on mp4 / alpha
  sizing:
    | null
    | undefined
    | {
        type: 'scale' | 'fixed';
        size: number;
        name: string;
      };
};
