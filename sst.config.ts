import { SSTConfig } from 'sst';

import { ApiStack } from './stacks/ApiStack.js';

const config: SSTConfig = {
  config() {
    return {
      name: 'opcgdb',
      region: 'us-east-1',
      profile: process.env.AWS_PROFILE,
    };
  },
  stacks(app) {
    app.stack(ApiStack);
  },
};

export default config;
