import { defineConfig } from "vite";
import VuePlugin from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [
    VuePlugin(),
    UnoCSS()
  ]
});