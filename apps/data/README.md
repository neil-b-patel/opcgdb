# @optcgdb/data

Main data source for the `@optcgdb/api`.

## Getting started

> **NOTE**: All commands in this section should be run at the monorepo's root directory

After cloning this project, install the monorepo's dependencies:

```bash
pnpm i
```

On clone, the project will not have any data, so the scraper needs to be run build the information locally:

```bash
pnpm data:scraper
```

> **NOTE**: This script requires an internet connection.

The process might take some time, as it will fetch the pages from the official One Piece TCG website, run the scraper, format the data and save it into files locally.

At this point, the application is ready to be run on dev mode or built for consumption in other projects.

```bash
pnpm data:watch
```

This will build the library in watch mode, meaning any changes will be recompiled. This is recommended while working on other projects in this monorepo which use this library.

```bash
pnpm data:build
```

This will build the library for production use.

## Updating the data

When new sets of cards are released, the scraper needs to be re-run to pull the latest information. This will only be possible
