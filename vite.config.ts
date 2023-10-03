import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// vite.config.js
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@src": "/src",
            "@components": "/src/components",
            "@variables": "src/styles/variables.sass",
        },
    },
    esbuild: {
        supported: {
            "top-level-await": true, //browsers can handle top-level-await features
        },
    },
});
