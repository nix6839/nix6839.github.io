import hywConfig from '@nix6839/prettier-config';
import * as pluginAstro from 'prettier-plugin-astro';
import * as pluginTailwind from 'prettier-plugin-tailwindcss';

/** @type {import('prettier').Config} */
const config = {
  ...hywConfig,

  plugins: [pluginTailwind],

  overrides: [
    {
      files: '*.astro',
      options: {
        plugins: [pluginAstro, pluginTailwind],
        parser: 'astro',
        astroAllowShorthand: true,
      },
    },
  ],
};

export default config;
