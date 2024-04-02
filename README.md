# One Piece Card Game database and API

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/T6T841YPJ)

This repository houses different projects as part of an effort to create a public card database for the One Piece Card Game.

The objective is to have this as a hosted API to which people can sign up and consume publicly. However, the intention is for it to be built as an open source project which can alsop be self hosted by people within their own infrastructure.

The overall project is built in typoscript, but the different applications will have additional dependencies based on their needs.

## How to use

The project is setup as a monorepo using `pnpm` workspaces in combination with `nx` runners. To get started, simply clone this repo and install dependencies using pnpm in the root directory.

```bash
pnpm i
```

This will install dependencies for all of the apps in the repo. Additionally, you can check the scripts in the root's `package.json` develop/build/run any of the applications. `nx` has been configure to ensure all cross app dependencies are built in the right order.

Since we are using NX runners, all projects can be built in the right order with a single command:

```bash
pnpm run build
```

The command above will trigger the following tasks:

- Run the scraper from `@opdbcg/data` to download the dataset of card information
- Compile `@opdbcg/data` to javascript so it can be consumed by other projects
- Download all card assets
- Created a compressed version of all card assets in `.webp` format
- Build the Client project for production

## Applications

Here is a list of the different applications hosted in this repo. Deeper READMEs can be found within each app's directory with instructions on how to run this locally for development

### @opcgdb/data

The source of card data. Includes the scraper and exposes the cards and set data in JSON format.

### @opcgdb/cdn

This app is just a bunch of scripts that format and create files for hosting in a CDN

- Pulls the card information for `jp` and `en` from `@opcgdb/data`
- Traverses through all card information to download images
- Compresses images to a webp format
- Saves the compiled card/set data into JSON files for hosting in a CDN

### @opcgdb/api

The API project. It consumes the information from `@opcgdb/data` and exposes it using different endpoints.

### @opcgdb/client

This is a basic UI application to explore the database. It uses the `@opcgdb/data` as its data source.

## Deployment

The databse and its apps are hosted in [DOMAIN COMING SOON]. However, anyone can self host both the DB and API.

This repo is designed to have everything deployed to AWS using [SST](https://sst.dev/). The following apps become hosted as follows:

- `@opcgdb/api`: AWS Lambda
- `@opcgdb/cdn`: AWS S3 + Cloudfront
- `@opcgdb/client`: AWS S3 + Cloudfront
- `@opcgdb/data`: No hosting needed, as it's only a shared dependency for the projects above.

To deploy this project, first build everything:

```bash
pnpm run build
```

This will take care of building all dependencies, scraping all data and downloading and compressing all images. If the script fails due to images not being properly downloaded, try running it again, or try running the different commands separately:

`@opcgdb/data`

```bash
pnpm run data:build
```

`@opcgdb/cdn`

```bash
pnpm run cdn:build
```

Check the logs to make sure all images were properly downloaded and compressed.

Specify the environment variables in `.env.example` to setup a custom domain. Only the `AWS_PROFILE` is required. All others are optional to set a custom domain.

Then you can deploy things to AWS

```bash
pnpm run sst:deploy
```

> [!IMPORTANT]
> This assumes you've setup and configured your AWS account as per instructed in the SST website

If you only want to exclude the CDN or the API from your deploymnent, you can remove them from the `sst.config.ts` file.

## Things missing

- Implement Token authentication on the API
- Procure production domains
- For some reason the information on different DON!! cards for the different sets is not included in the lists of the official website, so an alternative method to fetch these cards will be needed.

## Support

If you'd like to support this project, you're welcome to contribute either via pull requests to improve and maintain the code. If coding isn't your thing, you can also supprot via donations to help fund the project. The funds will be used to support the continuous development of the tools as well as to keep the infrastructure running (servers, domains, CDN, etc).

You can support directly through my Kofi page [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/T6T841YPJ).

## A note on usage

> [!CAUTION]
> This is a fan made project. All information and assets provided by the applications housed by this repository are owned by: BANDAI, BANDAI CARD GAMES, BANDAI NAMCO, Eiichiro Oda/Shueisha, Toei Animation. In case of issues, the project may be taken down

## TODO

[ ] Client - Card page
[ ] Client - Advance Search Page
[ ] Client - Syntax Page
[ ] Client - Developer Docs
[ ] Client - All things mobile
[ ] Data - scrape Promo card set name
[ ] Data + Client + Api - Pull card info from Dynamo instead of data json (update filter/sort mechanism)
[ ] Data - ban list support
[ ] Client - Support/Issue page
[ ] Data - update list.ts programatically
[ ] CDN - Add support for --force to force asset download
[ ] Bot - Discord Bot
