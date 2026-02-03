import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { createRequire } from "node:module"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: createRequire(import.meta.url).resolve("react"),
      "react-dom": createRequire(import.meta.url).resolve("react-dom"),
      scheduler: createRequire(import.meta.url).resolve("scheduler"),
    },
  },
})
