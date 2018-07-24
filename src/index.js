import merge from 'lodash.merge';

const CONFIGLY_ENV = 'CONFIGLY';
const CONFIGLY_BROWSER = 'CONFIGLY';
const DEFAULT_CONFIG = {};

export default class Configly {
  static getConfig(config, environmentVariable=CONFIGLY_ENV, browserVariable=CONFIGLY_BROWSER) {
    // If passed a filename, load as JSON
    /* global require */
    if (typeof require !== 'undefined' && typeof config === 'string') {
      try {
        // Need to get by webpack and browserfy and the like
        const r = require;
        const fs = r('fs');
        const string = fs.readFileSync(config, 'utf8');
        if (string) {
          return Configly.getConfig(JSON.parse(string));
        }
      } catch(error) {
        console.warn('Failed to load config file (' + config + '), using default config.', error);
        config = DEFAULT_CONFIG;
      }
    }
    // If not passed a config, look for from environment or from browser
    if (!config) {
      /* global process */
      config = typeof process !== 'undefined' && process.env && process.env[environmentVariable];
      if (config) {
        // Found config from environment var
        return Configly.getConfig(config);
      }
      /* global window */
      config = typeof window !== 'undefined' && window[browserVariable];
      if (config) {
        return Configly.getConfig(config);
      }

      // Will use only default config
      return Configly.getConfig({});
    }
    return merge({}, DEFAULT_CONFIG, config);
  }
}
