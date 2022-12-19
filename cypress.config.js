const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://63931229ab513e12c50221ea.mockapi.io'
  },
});