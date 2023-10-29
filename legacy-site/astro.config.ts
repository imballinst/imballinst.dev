import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import remarkGfm from 'remark-gfm';

import imageCaptionPlugin from './plugins/image/index.mjs';
import htmlClassnamesPlugin from './plugins/html-classnames/index.mjs';

export default defineConfig({
  integrations: [preact()],
  site:
    process.env.CONTEXT === 'production'
      ? process.env.URL
      : process.env.DEPLOY_PRIME_URL,
  markdown: {
    remarkPlugins: [remarkGfm, imageCaptionPlugin, htmlClassnamesPlugin],
    rehypePlugins: []
  }
});
