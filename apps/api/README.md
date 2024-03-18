# @opcgdb/api

This is the main API to be consumed in other projects.

The API is built for 2 different cases:

- Deployment as a NodeServer
- Deployment as Lambda Functions to AWS

The Node Server approach will be kept in this repo, but will not be further explored. However, it will serve as a basis for anyone wanting to self deploy this API anywhere outside of AWS Lambda. Be careful with this approach, as the existing code for the Node Server API does not include API Token or Rate Limitting protection.

## Getting started

> [!NOTE]
> All commands in this section should be run at the monorepo's root directory

After cloning this project, install the monorepo's dependencies:

```bash
pnpm i
```

Then, we'll need to build `@opcgdb/data`.

```bash
pnpm run data:build
```

> [!NOTE]
> Please check the [`@opcgdb/data` README file](../data/README.md) for details on what this command does

Since this project is meant to be run as AWS Lambda functions, you'll need an AWS Account to detup the development environment. The project uses SST to easily bootstrap the AWS project. Please follow the [SST Guide to Create and configure an AWS account](https://sst.dev/chapters/create-an-aws-account.html).

Once you've configured your AWS account properly, you'll be able to run the dev command:

```bash
pnpm run sst:dev
```

This will create an SST development environment with a `local` stage.

If you'd like to remove everything from AWS after you finish working on any development you're doing, you can run the following command:

```bash
pnpm run sst:remove
```

When prompted, enter the name of the stage to remove (if it's the environment from `pnpm run sst:dev`, that would be `local`). This will remove everything SST created in your AWS account.

## Production deployment

For instructions on production deployment, refer to the [main README file](../../README.md#deployment)

## TODO

- [ ] Add node server dev (watch) command
- [ ] Add API Token support (File based, S3? Path based? URL bases?)
