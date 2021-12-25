// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
import remarkGfm from 'remark-gfm';

import imageCaptionPlugin from './plugins/image/index.mjs';
import htmlClassnamesPlugin from './plugins/html-classnames/index.mjs';

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

process.env.ASTRO_TS = new Date().toISOString();

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // Enable the React renderer to support React JSX components.
  renderers: ['@astrojs/renderer-preact'],
  markdownOptions: {
    render: [
      '@astrojs/markdown-remark',
      {
        remarkPlugins: [
          { default: remarkGfm },
          { default: imageCaptionPlugin },
          { default: htmlClassnamesPlugin }
        ],
        rehypePlugins: []
      }
    ]
  }
});
