import { defineConfig } from 'astro/config';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  server: {
    host: true,
  },
  vite: {
    plugins: [basicSsl()],
    server: {
      host: true,
      https: true,
    },
  },
});
