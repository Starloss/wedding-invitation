import { defineConfig } from 'astro/config';
import mkcert from 'vite-plugin-mkcert';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  server: {
    host: true,
  },
  vite: {
    plugins: [mkcert()],
    server: {
      host: true,
      https: true,
    },
    preview: {
      https: true,
    },
  },
});
