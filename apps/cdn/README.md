# @opcgdb/cdn

This app has the scripts necessary to create the structure to host the database in a CDN as JSON files.

## Getting started

> [!NOTE]
> All commands in this section should be run at the monorepo's root directory

After cloning this project, install the monorepo's dependencies:

```bash
pnpm i
```

Then build the CDN content

```bash
pnpm run cdn:build
```

> [!IMPORTANT]
> This command requires an internet connection to run

Since this project depends on `@opcgdb/data`, the command will run the scraper and build its dependencies if they haven't been build previously

The command above will trigger the following tasks:

- Run the scraper and build `@opcgdb/data` if this hasn't been done
- Download all card image assets for both `jp` and `en` and store them in `apps/cdn/assets/raw` as PNGs
- Compress all card image assets for both `jp` and `en` and store them in `apps/cdn/assets/public` as WEBPs
- Write the Card and Set database for both `jp` and `en` as JSON files in `apps/cdn/assets/public`.

The command will take a long time as it will attempt to download all images which are +3000

However, this should only happen the first time the command is run, as if the files are already stored, they will be skipped by the download script.

### Possible errors when running the scripts

#### Asset failed to download

Sometimes, when trying to download an asset, the script will timeout and be unable to do so. A failsafe has been added to re-try any failed downlaods up to 3 times. However, if the script fails, just try to re-run it and it will most likely be successful

#### Asset failed to compress

At the end of the compression task, the script will output logs indicating the number of compressed, skipped and errors. If any images had an error compressing, it's most likely due to the source asset being corrupted. Try to manually re-download the asset and re-run the script to get it compressed (all previously successfully compressed assets will be skipped);

## Production deployment

For instructions on production deployment, refer to the [main README file](../../README.md#deployment)
