// @ts-check
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // TODO_CANONICAL_SITE_URL: Üretim alan adı kesinleştiğinde `site` eklenmeli.
  adapter: vercel(),
  devToolbar: {
    enabled: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
