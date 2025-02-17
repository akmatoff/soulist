import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: "0.0.0.0",
  },
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        bar: "./bar.html",
        cuisine: "./cuisine.html",
      },
    },
  },
});
