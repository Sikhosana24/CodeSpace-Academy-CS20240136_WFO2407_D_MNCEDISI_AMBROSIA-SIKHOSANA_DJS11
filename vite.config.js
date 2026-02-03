import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { createRequire } from "node:module"
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react/jsx-runtime": createRequire(import.meta.url).resolve("react/jsx-runtime"),
      "react/jsx-dev-runtime": createRequire(import.meta.url).resolve("react/jsx-dev-runtime"),
      "scheduler/cjs/scheduler.production.min.js": path.join(
        path.dirname(createRequire(import.meta.url).resolve("scheduler/package.json")),
        "cjs",
        "scheduler.production.min.js",
      ),
      "scheduler/cjs/scheduler.development.js": path.join(
        path.dirname(createRequire(import.meta.url).resolve("scheduler/package.json")),
        "cjs",
        "scheduler.development.js",
      ),
    },
  },
})
