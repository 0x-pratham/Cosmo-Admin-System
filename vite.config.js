import path from "path"
import { fileURLToPath } from "url"

import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function normalizeBase(url) {
  if (!url || !String(url).trim()) return "/"
  const t = String(url).trim()
  if (t === "/") return "/"
  return t.endsWith("/") ? t : `${t}/`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    base: normalizeBase(env.VITE_BASE_URL),

    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
