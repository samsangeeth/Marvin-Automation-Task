
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false, // add this line
    baseUrl: "https://www.saucedemo.com",
    watchForFileChanges: false,
    execTimeout: 70000,
    defaultCommandTimeout: 70000,
    requestTimeout: 70000,
    pageLoadTimeout: 60000,
    responseTimeout: 70000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
  },
});
