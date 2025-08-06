import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import remarkToc from 'remark-toc';
import imageCaptionPlugin from './plugins/image/index.mjs';
import htmlClassnamesPlugin from './plugins/html-classnames/index.mjs';
import expressiveCode from 'astro-expressive-code';
import { tocInjectorPlugin, tocLeadingContentCleanupPlugin } from './plugins/toc-injector/index.mjs';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), expressiveCode()],

  site: process.env.CONTEXT === 'production' ? process.env.URL : process.env.DEPLOY_PRIME_URL,

  markdown: {
    remarkPlugins: [
      tocInjectorPlugin,
      () => {
        return (tree, file) => {
          if (file.history[0].endsWith('about.md')) return;
          return remarkToc()(tree);
        };
      },
      tocLeadingContentCleanupPlugin,
      imageCaptionPlugin,
      htmlClassnamesPlugin
    ],
    rehypePlugins: []
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
