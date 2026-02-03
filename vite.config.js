import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { createRequire } from "node:module"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react/jsx-runtime": createRequire(import.meta.url).resolve("react/jsx-runtime"),
      "react/jsx-dev-runtime": createRequire(import.meta.url).resolve("react/jsx-dev-runtime"),
      scheduler: createRequire(import.meta.url).resolve("scheduler"),
    },
  },
})
