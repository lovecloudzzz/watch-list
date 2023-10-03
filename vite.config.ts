import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// vite.config.js
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@styles": path.resolve(__dirname, "./src/styles"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@utils": path.resolve(__dirname, "./src/utils"),
        },
    },
    esbuild: {
        supported: {
            "top-level-await": true, //browsers can handle top-level-await features
        },
    },
});
