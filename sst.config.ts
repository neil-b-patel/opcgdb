import { SSTConfig } from 'sst';

import { ApiStack } from './stacks/ApiStack.js';
import { CdnStack } from './stacks/CDNStack.js';
import { DbStack } from './stacks/DbStack.js';

const config: SSTConfig = {
  config() {
    return {
      name: 'opcgdb',
      region: 'us-east-1',
      profile: process.env.AWS_PROFILE,
    };
  },
  stacks(app) {
    const disableApiKeys =
      process.env.DISABLE_API_KEYS === 'true' || process.env.DISABLE_API_KEYS === '1';
    if (!disableApiKeys) {
      app.stack(DbStack);
    }
    app.stack(ApiStack).stack(CdnStack);
  },
};

export default config;
