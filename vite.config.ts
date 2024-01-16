import path from "node:path";
import { defineConfig } from "vite";
import VuePlugin from "@vitejs/plugin-vue";
import DtsPlugin from "vite-plugin-dts";
import Autoprefixer from "autoprefixer";

function resolve(...paths: string[]): string {
  return path.resolve(__dirname, ...paths);
}

export default defineConfig({
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "XhCountTo",
      formats: ["es", "cjs", "umd"],
      fileName: "index"
    },
    rollupOptions: {
      external: ["vue", "vue-demi", "xiaohe-transition"],
      output: {
        globals: {
          "vue": "Vue",
          "vue-demi": "VueDemi",
          "xiaohe-transition": "XhTransition"
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ["vue-demi"]
  },
  plugins: [
    VuePlugin(),
    DtsPlugin({
      rollupTypes: true
    })
  ],
  css: {
    postcss: {
      plugins: [Autoprefixer()]
    }
  }
});