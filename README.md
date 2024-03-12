# OPTCGDB

This repository houses different projects as part of an effort to create a public card database for the One Piece Trading Card game.

The objective is to have this as a hosted API to which people can sign up and consume publicly. However, the intention is for it to be built as an open source project which can alsop be self hosted by people within their own infrastructure.

The overall project is built in typoscript, but the different applications will have additional dependencies based on their needs.

## How to use

The project is setup as a monorepo using `pnpm` workspaces in combination with `nx` runners. To get started, simply clone this repo and install dependencies using pnpm in the root directory.

```bash
pnpm i
```

This will install dependencies for all of the apps in the repo. Additionally, you can check the scripts in the root's `package.json` develop/build/run any of the applications. `nx` has been configure to ensure all cross app dependencies are built in the right order.

## Projects

Here is a list of the different applications hosted in this repo. Deeper READMEs can be found within each app's directory.

### @optcgdb/data

The source of card data. Includes the scraper and exposes the cards and set data in JSON format.

### @optcgdb/api

The API project. It consumes the information from `@optcgdb/data` and exposes it using different endpoints.

### @optcgdb/client

This is a basic UI application to explore the database. It uses the `@optcgdb/data` as its data source.

> [!CAUTION]
> This is a fan made project. All information and assets provided by the applications housed by this repository are owned by: BANDAI, BANDAI CARD GAMES, BANDAI NAMCO, Eiichiro Oda/Shueisha, Toei Animation. In case of issues, the project may be taken down
