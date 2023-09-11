import { defineConfig } from 'cypress';
// const { defineConfig } = require('cypress')

export default defineConfig({
  projectId: '9nfcgw',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    screenshotOnRunFailure: true,
    video: true,
  },
})