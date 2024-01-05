import path from "node:path";
import { defineConfig } from "vite";
import VuePlugin from "@vitejs/plugin-vue";

function resolve(...paths: string[]): string {
  return path.resolve(__dirname, ...paths);
}

export default defineConfig({
  plugins: [VuePlugin()],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "XhCountTo",
      formats: ["es", "cjs", "umd"],
      fileName: "index"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});