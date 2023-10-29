import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';

import imageCaptionPlugin from './plugins/image/index.mjs';
import htmlClassnamesPlugin from './plugins/html-classnames/index.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), tailwind()],
  site:
    process.env.CONTEXT === 'production'
      ? process.env.URL
      : process.env.DEPLOY_PRIME_URL,
  markdown: {
    remarkPlugins: [imageCaptionPlugin, htmlClassnamesPlugin],
    rehypePlugins: []
  }
});
