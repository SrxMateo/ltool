import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  site: 'https://ltool.lumax.lat',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: 8025,
    host: '0.0.0.0'
  }
});