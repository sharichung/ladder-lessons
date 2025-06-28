import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://sharichung.github.io/ladder-lessons/",
    supportFile: "cypress/support/e2e.js",
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  env: {
    firebaseConfig: {
      apiKey: "AIzaSyA760A3u4jPGjq0verrZ1JpjYXnDJo4Ukg",
      authDomain: "ladder-lessons.firebaseapp.com",
      projectId: "ladder-lessons",
      storageBucket: "ladder-lessons.firebasestorage.app",
      messagingSenderId: "1012798746977",
      appId: "1:1012798746977:web:b239f0713b9d29fab79520",
      measurementId: "G-GNLLTFQEJF"
    }
  }
});

