import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "4qnr2a",
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    video: false,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});