import path from "node:path";
import { defineConfig } from "vite";
import VuePlugin from "@vitejs/plugin-vue";
import DtsPlugin from "vite-plugin-dts";

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
      external: ["vue", "vue-demi"],
      output: {
        globals: {
          "vue": "Vue",
          "vue-demi": "VueDemi"
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
  ]
});