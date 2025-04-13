import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import remarkToc from 'remark-toc';
import imageCaptionPlugin from './plugins/image/index.mjs';
import htmlClassnamesPlugin from './plugins/html-classnames/index.mjs';
import expressiveCode from 'astro-expressive-code';
import tocInjectorPlugin from './plugins/toc-injector/index.mjs';

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact(),
    tailwind({
      applyBaseStyles: false
    }),
    expressiveCode()
  ],
  site:
    process.env.CONTEXT === 'production'
      ? process.env.URL
      : process.env.DEPLOY_PRIME_URL,
  markdown: {
    remarkPlugins: [
      imageCaptionPlugin,
      tocInjectorPlugin,
      remarkToc,
      htmlClassnamesPlugin
    ],
    rehypePlugins: []
  }
});
