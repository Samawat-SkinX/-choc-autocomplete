import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";

import {
  peerDependencies as externals,
  name,
  dependencies,
} from "./package.json";

export default defineConfig(() => ({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ["src/", "src/components/"],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/index.tsx"),
      name,
      fileName: (format) =>
        format === "cjs" ? "index.js" : `index.${format}.js`,
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: [
        "react/jsx-runtime",
        ...Object.keys(externals),
        ...Object.keys(dependencies || {}),
      ],
    },
    output: {
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "react/jsx-runtime": "jsxRuntime",
        "@chakra-ui/react": "ChakraUI",
        "@emotion/react": "emotionReact",
      },
      preserveModules: false,
    },
    sourcemap: true,
    emptyOutDir: true,
    outDir: "dist",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
}));
