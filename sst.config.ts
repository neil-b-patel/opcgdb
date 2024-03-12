import { SSTConfig } from 'sst';

import { API } from './stacks/ApiStack.js';

const config: SSTConfig = {
  config() {
    return {
      name: 'optcgdb',
      region: 'us-east-1',
      profile: process.env.AWS_PROFILE,
    };
  },
  stacks(app) {
    app.stack(API);
  },
};

export default config;
