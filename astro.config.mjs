import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tradetext.app',
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
});
