import hywConfig from '@nix6839/prettier-config';
import * as pluginAstro from 'prettier-plugin-astro';

/** @type {import('prettier').Config} */
const config = {
  ...hywConfig,

  overrides: [
    {
      files: '*.astro',
      options: {
        plugins: [pluginAstro],
        parser: 'astro',
        astroAllowShorthand: true,
      },
    },
  ],
};

export default config;
