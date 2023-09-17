import { defineConfig } from 'cypress';
import eyesPlugin from '@applitools/eyes-cypress'
// const { defineConfig } = require('cypress')

export default eyesPlugin(defineConfig({
  projectId: '9nfcgw',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    screenshotOnRunFailure: false,
    video: false,
  },
}))


