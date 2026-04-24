import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://foremann.app',
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
});
