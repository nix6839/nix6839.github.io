import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
const config = defineConfig({
  site: 'https://yeongwoo.dev',
  compressHTML: true,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});

export default config;
