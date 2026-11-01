import { strict as assert } from 'node:assert';
import { describe, it, afterEach } from 'node:test';

import { remark } from 'remark';

import htmlClassnamesPlugin from './html-classnames/index.mjs';
import imageCaptionPlugin from './image/index.mjs';
import { TOC_ID, tocInjectorPlugin, tocLeadingContentCleanupPlugin } from './toc-injector/index.mjs';
import remarkToc from 'remark-toc';

//
// HTML classnames are authored to be stable, but subtle whitespace changes upstream
// (e.g. from `remark` updates) shouldn't break tests. Prefer structural regex and
// `includes` assertions over exact full-document string equality.
//
// The production pipeline order matches `astro.config.ts`:
//   tocInjectorPlugin -> remarkToc -> tocLeadingContentCleanupPlugin -> imageCaptionPlugin -> htmlClassnamesPlugin
//

const processWithHtmlClassnames = (md) => String(remark().use(htmlClassnamesPlugin).processSync(md));

/**
 * @param {string} md
 * @param {object} [options]
 * @param {boolean} [options.production] Simulate the production environment (affects image `srcset`).
 * @param {string} [options.path] File path, e.g. to test the `about.md` TOC skip.
 */
async function processWithFullPipeline(md, { production = false, path = undefined } = {}) {
  const previousNodeEnv = process.env.NODE_ENV;

  process.env.NODE_ENV = production ? 'production' : 'development';

  try {
    const value = await remark()
      .use(tocInjectorPlugin)
      .use(remarkToc)
      .use(tocLeadingContentCleanupPlugin)
      .use(imageCaptionPlugin)
      .use(htmlClassnamesPlugin)
      .process(path === undefined ? md : { value: md, path });

    return String(value);
  } finally {
    if (previousNodeEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = previousNodeEnv;
    }
  }
}

/**
 * @param {string} md
 * @param {object} [options]
 * @param {boolean} [options.production]
 */
async function processWithImagePlugin(md, { production = false } = {}) {
  const previousNodeEnv = process.env.NODE_ENV;

  process.env.NODE_ENV = production ? 'production' : 'development';

  try {
    return String(remark().use(imageCaptionPlugin).processSync(md));
  } finally {
    if (previousNodeEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = previousNodeEnv;
    }
  }
}

const runPlugin = (plugin, tree, file = {}) => plugin()(tree, file);

describe('toc-injector', () => {
  it('injects the TOC and leading content headings when the document has headings', () => {
    /** @type {*} */
    const tree = remark().parse('Intro paragraph.\n\n## A Heading\n\nBody.');

    runPlugin(tocInjectorPlugin, tree, { history: ['src/content/posts/some-post.md'] });

    assert.equal(tree.children.length, 5);
    // Both headings are unshifted to the front, TOC first.
    assert.equal(tree.children[0].type, 'heading');
    assert.equal(tree.children[0].depth, 2);
    assert.equal(tree.children[0].id, TOC_ID);
    assert.equal(tree.children[0].children[0].value, 'Table of Contents');
    assert.equal(tree.children[1].type, 'heading');
    assert.equal(tree.children[1].children[0].value, 'Leading content');
    // The original document follows both.
    assert.deepEqual(tree.children[2].type, 'paragraph');
    assert.deepEqual(tree.children[3].type, 'heading');
    assert.deepEqual(tree.children[4].type, 'paragraph');
  });

  it('skips injection when the file is about.md', () => {
    /** @type {*} */
    const tree = remark().parse('Intro paragraph.\n\n## A Heading');

    const file = { history: ['src/content/about.md'] };

    runPlugin(tocInjectorPlugin, tree, file);

    assert.equal(tree.children.length, 2);
    assert.equal(file.shouldSkipCreateTOC, true);
  });

  it('skips injection when the document has no headings', () => {
    /** @type {*} */
    const tree = remark().parse('Just some prose, nothing to see here.');

    const file = { history: ['src/content/posts/some-post.md'] };

    runPlugin(tocInjectorPlugin, tree, file);

    assert.equal(tree.children.length, 1);
    assert.equal(file.shouldSkipCreateTOC, true);
  });
});

describe('toc-injector cleanup', () => {
  it('removes the leading content heading', () => {
    /** @type {*} */
    const tree = remark().parse('Intro paragraph.\n\n## A Heading');

    runPlugin(tocInjectorPlugin, tree, { history: ['src/content/posts/some-post.md'] });
    // Simulate `remarkToc` moving the headings into a list right after the TOC heading.
    tree.children.splice(1, 1);

    runPlugin(tocLeadingContentCleanupPlugin, tree);

    assert.equal(tree.children[0].id, TOC_ID);
    assert.equal(tree.children.filter((child) => child.value === 'Leading content').length, 0);
    assert.deepEqual(tree.children[1].type, 'paragraph');
  });

  it('removes the first item of the list right after the TOC heading', () => {
    const firstItem = { type: 'listItem', children: [{ type: 'paragraph', children: [{ type: 'text', value: 'Leading content' }] }] };
    const secondItem = { type: 'listItem', children: [{ type: 'paragraph', children: [{ type: 'text', value: 'A Heading' }] }] };

    /** @type {*} */
    const tree = {
      type: 'root',
      children: [
        { type: 'heading', depth: 2, id: TOC_ID, children: [{ type: 'text', value: 'Table of Contents' }] },
        { type: 'list', children: [firstItem, secondItem] }
      ]
    };

    runPlugin(tocLeadingContentCleanupPlugin, tree);

    assert.equal(tree.children.length, 2);
    assert.deepEqual(tree.children[1].children, [secondItem]);
  });

  it('does not touch anything when the node after the TOC heading is not a list', () => {
    const paragraph = { type: 'paragraph', children: [{ type: 'text', value: 'Leading content' }] };

    /** @type {*} */
    const tree = {
      type: 'root',
      children: [
        { type: 'heading', depth: 2, id: TOC_ID, children: [{ type: 'text', value: 'Table of Contents' }] },
        paragraph
      ]
    };

    runPlugin(tocLeadingContentCleanupPlugin, tree);

    assert.deepEqual(tree.children[1], paragraph);
  });

  it('does not touch anything when TOC creation was skipped', () => {
    /** @type {*} */
    const tree = remark().parse('## A Heading');

    const file = { shouldSkipCreateTOC: true };

    runPlugin(tocLeadingContentCleanupPlugin, tree, file);

    assert.equal(tree.children.length, 1);
  });
});

describe('image', () => {
  it('wraps an image-only paragraph in a figure', async () => {
    const html = await processWithImagePlugin('![A caption](https://example.com/my-image.png)');

    // Non-fixed-size images take up the whole container width and default to 800x450.
    assert.match(html, /<img alt="A caption" loading="lazy" src="https:\/\/example\.com\/my-image\.png" height="450" width="800" class="border border-gray-200 dark:border-gray-600 w-full" \/>/);
    assert.match(html, /<figcaption class="text-sm text-center mt-1 text-gray-600 dark:text-gray-400">A caption<\/figcaption>/);
  });

  it('does not set a srcset outside of production', async () => {
    const html = await processWithImagePlugin('![A caption](https://example.com/my-image.png)');

    assert.equal(html.includes('srcset'), false);
  });

  it('respects the fixed-size image variant', async () => {
    const html = await processWithImagePlugin('![A caption](https://example.com/my-image-size512w.png)');

    assert.match(html, /height="288" width="512" class="border border-gray-200 dark:border-gray-600" \/>/);
    // Fixed-size images are not full-width.
    assert.equal(html.includes('w-full'), false);
  });

  it('rewrites compressed image URLs to the responsive srcset in production', async () => {
    const html = await processWithImagePlugin('![A caption](https://example.com/my-image.png)', { production: true });

    assert.match(
      html,
      /srcset="https:\/\/example\.com\/my-image--512w\.png 512w, https:\/\/example\.com\/my-image--1024w\.png 1024w, https:\/\/example\.com\/my-image--2048w\.png 2048w"/
    );
    // The effective URL is the biggest image.
    assert.match(html, /src="https:\/\/example\.com\/my-image--2048w\.png"/);
  });

  it('does not set a srcset in production for non-compressible extensions', async () => {
    const html = await processWithImagePlugin('![A caption](https://example.com/my-image.webp)', { production: true });

    assert.equal(html.includes('srcset'), false);
  });

  it('turns anchors in the alt text into caption links', async () => {
    const html = await processWithImagePlugin('![See <a href="https://x.com">the source</a>](https://example.com/my-image.png)');

    assert.match(html, /<figcaption class="text-sm text-center mt-1 text-gray-600 dark:text-gray-400">See \s*<a class="text-teal-600 dark:text-teal-300 hover:underline break-all inline-block" target="_blank" rel="noopener" href="https:\/\/x\.com">\s*the source.*?<\/a>\s*<\/figcaption>/s);
  });

  it('auto-links URLs in the alt text', async () => {
    const html = await processWithImagePlugin('![From https://x.com](https://example.com/my-image.png)');

    assert.match(html, /<figcaption class="text-sm text-center mt-1 text-gray-600 dark:text-gray-400">From <a[^>]*href="https:\/\/x\.com"[^>]*>/);
  });

  it('strips quotes from the image alt attribute but keeps them in the caption', async () => {
    const html = await processWithImagePlugin('![He said "hi" and \'bye\'](https://example.com/my-image.png)');

    assert.match(html, /<img alt="He said hi and bye"/);
    assert.match(html, /'bye'<\/figcaption>/);
  });

  it('leaves paragraphs mixing an image with text untouched', async () => {
    const html = await processWithImagePlugin('Some text ![A caption](https://example.com/my-image.png) more text');

    // Only standalone images are supported, so the paragraph is passed through as-is.
    assert.equal(html.includes('<figure'), false);
    assert.match(html, /Some text !\[A caption\]\(https:\/\/example\.com\/my-image\.png\) more text/);
  });

  it('leaves non-paragraph content untouched', async () => {
    const html = await processWithImagePlugin('# A Heading\n\nSome text.');

    assert.equal(html.includes('<figure'), false);
    assert.equal(html.includes('<img'), false);
  });
});

describe('html-classnames', () => {
  it('adds classes and slug ids to headings', () => {
    const html = processWithHtmlClassnames('# Big Title!\n\n## A Heading, With "Quoted" Text!\n\n### Deep & slow');

    assert.match(html, /<h1 class="base-text-default text-3xl font-bold my-6 pb-2 border-b border-solid border-\[#0000001a\] dark:border-\[#ffffff5a\]" id="big-title">\s*Big Title!\s*<\/h1>/);
    assert.match(html, /<h2 class="base-text-default text-2xl font-bold my-6[^"]*" id="a-heading-with-quoted-text">/);
    assert.match(html, /<h3 class="base-text-default text-xl font-medium my-6[^"]*" id="deep--slow">/);
  });

  it('adds classes to plain paragraphs', () => {
    const html = processWithHtmlClassnames('Some prose.');

    assert.match(html, /<p class="base-text-default mt-3 mb-4 first:mt-0 last:mb-0">Some prose\.<\/p>/);
  });

  it('renders `:::`-wrapped paragraphs as centered, gray, italic text', () => {
    const html = processWithHtmlClassnames(':::\nCentered gray text\n:::');

    assert.match(
      html,
      /<p class="base-text-variant-gray text-center italic py-2 mt-3 mb-4 first:mt-0 last:mb-0 border-y border-gray-200 dark:border-gray-600">\s*Centered gray text\s*<\/p>/
    );
  });

  it('adds `strong` styling to paragraphs outside of links', () => {
    const html = processWithHtmlClassnames('Plain **bold** text.');

    assert.match(html, /<strong>bold<\/strong>/);
  });

  it('styles external links and appends an external link icon', () => {
    const html = processWithHtmlClassnames('See [Claude status](https://status.claude.com) here.');

    assert.match(
      html,
      /<a href="https:\/\/status\.claude\.com" class="text-teal-600 dark:text-teal-300 hover:underline break-words inline" target="_blank" rel="noopener">Claude status(<svg [^>]*>.*?<\/svg>)?<\/a>/
    );
  });

  it('styles links to the current domain without an icon or target', () => {
    const html = processWithHtmlClassnames('Back to [my site](https://imballinst.dev/blog) or [a local page](/blog).');

    assert.match(html, /<a href="https:\/\/imballinst\.dev\/blog" class="text-teal-600 dark:text-teal-300 hover:underline break-words inline">my site<\/a>/);
    assert.match(html, /<a href="\/blog" class="text-teal-600 dark:text-teal-300 hover:underline break-words inline">a local page<\/a>/);
    assert.equal(html.includes('target="_blank"'), false);
    assert.equal(html.includes('<svg'), false);
  });

  it('strips the extension from relative link hrefs', () => {
    const html = processWithHtmlClassnames('Grab [the pdf](assets/paper.pdf) now.');

    assert.match(html, /<a href="assets\/paper" /);
  });

  it('adds backticks around inline code spans', () => {
    const html = processWithHtmlClassnames('Use `npm i` first.');

    assert.match(html, /<code>`npm i`<\/code>/);
  });

  it('anchors links with code text and strips the extension, without extra backticks', () => {
    const html = processWithHtmlClassnames('Run [`npm i`](./docs/getting-started.md).');

    const match = html.match(/<a href="\.\/docs\/getting-started" class="text-teal-600 dark:text-teal-300 hover:underline break-words inline"><code>npm i<\/code><\/a>/);

    assert.ok(match);
  });

  it('styles unordered lists as discs, including when the list is the first node (regression)', () => {
    // Regression: the plugin used to crash with a `TypeError` when a list was the first child
    // of the tree, because it accessed `tree.children[i - 1].previous` unguarded.
    const html = processWithHtmlClassnames('- first item\n- second item');

    assert.match(html, /<ul class="base-text-default list-disc pl-8 mb-4">/);
    assert.match(html, /<li class="pl-1">first item<\/li>/);
    assert.match(html, /<li class="pl-1">second item<\/li>/);
  });

  it('styles ordered lists as decimals', () => {
    const html = processWithHtmlClassnames('1. alpha\n2. beta');

    assert.match(html, /<ol class="base-text-default list-decimal pl-8 mb-4">/);
  });

  it('uses less indentation and no margin for nested lists', () => {
    const html = processWithHtmlClassnames('- parent\n  - child\n');

    assert.match(html, /<ul class="base-text-default list-disc pl-8 mb-4">/);
    assert.match(html, /<ul class="base-text-default list-disc pl-4 ">/);
    assert.match(html, /<li class="pl-1">child<\/li>/);
  });

  it('styles code spans and external links inside list items', () => {
    const html = processWithHtmlClassnames('- item `with code` and [link](https://example.com)');

    assert.match(html, /<code>`with code`<\/code>/);
    assert.match(
      html,
      /<a href="https:\/\/example\.com" class="text-teal-600 dark:text-teal-300 hover:underline break-words inline" target="_blank" rel="noopener">link<svg/
    );
  });

  it('styles a list after the TOC heading with the TOC styling', () => {
    // A list following the injected `Table of Contents` heading gets dot-dashed borders and
    // tight indentation instead of the regular list styling. The `previous` marker is only
    // present on headings converted by this plugin, so assemble the tree manually.
    /** @type {*} */
    const tree = {
      type: 'root',
      children: [
        { type: 'heading', depth: 2, id: TOC_ID, children: [{ type: 'text', value: 'Table of Contents' }] },
        {
          type: 'list',
          children: [
            {
              type: 'listItem',
              children: [{ type: 'link', url: '#a-heading', children: [{ type: 'text', value: 'A heading' }] }]
            }
          ]
        }
      ]
    };

    htmlClassnamesPlugin()(tree);

    assert.equal(tree.children[1].type, 'html');
    assert.match(tree.children[1].value, /<ul class="base-text-default list-disc pl-4 border-b border-dotted border-\[#0000001a\] dark:border-\[#ffffff1a\] mb-8">/);
    assert.match(tree.children[1].value, /<a href="#a-heading" class="text-teal-600 dark:text-teal-300 hover:underline break-words inline">A heading<\/a>/);
  });

  it('renders single-paragraph blockquotes without an inner paragraph class', () => {
    const html = processWithHtmlClassnames('> Single line quote');

    assert.match(html, /<blockquote class="base-text-variant-gray italic p-4 border-l-5 border-gray-200 dark:border-gray-600"><p>Single line quote<\/p><\/blockquote>/);
  });

  it('renders multi-paragraph blockquotes with the blockquote paragraph class', () => {
    const html = processWithHtmlClassnames('> Para one\n>\n> Para two line\n> continues');

    assert.match(html, /class="base-text-variant-gray italic p-4 border-l-5 border-gray-200 dark:border-gray-600"/);
    assert.match(html, /<p class="mt-3 mb-4 first:mt-0 last:mb-0">Para one<\/p>/);
    // Soft line breaks within one paragraph also become separate paragraphs.
    assert.match(html, /<p class="mt-3 mb-4 first:mt-0 last:mb-0">Para two line<\/p>/);
    assert.match(html, /<p class="mt-3 mb-4 first:mt-0 last:mb-0">continues<\/p>/);
  });

  it('styles thematic breaks', () => {
    const html = processWithHtmlClassnames('Above.\n\n---\n\nBelow.');

    assert.match(html, /<hr class="border-gray-200 dark:border-gray-600">/);
  });

  it('injects classes into `<details>` blocks', () => {
    const html = processWithHtmlClassnames('<details>\n\n<summary>Title</summary>\n\nHello\n\n</details>');

    assert.match(html, /<details class="base-text-variant-gray p-4 border border-solid border-\[#0000001a\] dark:border-\[#ffffff1a\]">/);
    assert.match(html, /<p class="base-text-default mt-3 mb-4 first:mt-0 last:mb-0">Hello<\/p>/);
  });

  it('styles tables and wraps them in a horizontally scrollable container', () => {
    /** @type {*} */
    const tree = {
      type: 'root',
      children: [
        {
          type: 'table',
          align: [undefined, undefined],
          children: [
            {
              type: 'tableRow',
              children: [
                { type: 'tableCell', children: [{ type: 'text', value: 'A' }] },
                { type: 'tableCell', children: [{ type: 'text', value: 'B' }] }
              ]
            },
            {
              type: 'tableRow',
              children: [
                { type: 'tableCell', children: [{ type: 'text', value: '1' }] },
                { type: 'tableCell', children: [{ type: 'text', value: '2' }] }
              ]
            }
          ]
        }
      ]
    };

    htmlClassnamesPlugin()(tree);

    assert.equal(tree.children[0].type, 'html');
    assert.match(tree.children[0].value, /^<div class="overflow-x-auto my-4"><table class="base-text-variant-gray border-gray-200 dark:border-gray-600 w-full text-sm">/);
    assert.match(tree.children[0].value, /<tr class="font-bold border-b-2 border-gray-200 dark:border-gray-600">/);
    assert.match(tree.children[0].value, /<th class="p-2">/);
    assert.match(tree.children[0].value, /<td class="p-2">/);
    assert.match(tree.children[0].value, /<\/table><\/div>$/);
  });
});

describe('full remark pipeline (as configured in astro.config.ts)', () => {
  afterEach(() => {
    assert.ok(['development', 'production', undefined].includes(process.env.NODE_ENV), 'NODE_ENV must be restored after each test');
  });

  it('injects the TOC, generates it, cleans it up, and converts all markdown to HTML', async () => {
    const html = await processWithFullPipeline(
      'Intro paragraph.\n\n![A caption](https://example.com/my-image.png)\n\n## First heading\n\nSome text.\n\n## Second heading'
    );

    // The injected TOC heading comes first, before the original content.
    const tocIndex = html.indexOf('id="table-of-contents"');
    assert.ok(tocIndex > -1);
    assert.ok(tocIndex < html.indexOf('Intro paragraph.'));

    // The TOC list links to the document headings, styled with the TOC styling,
    // and the "Leading content" placeholder is fully cleaned up.
    assert.match(html, /<ul class="base-text-default list-disc pl-4 border-b border-dotted border-\[#0000001a\] dark:border-\[#ffffff1a\] mb-8">/);
    assert.match(html, /<a href="#first-heading"[^>]*>First heading<\/a>/);
    assert.match(html, /<a href="#second-heading"[^>]*>Second heading<\/a>/);
    assert.equal(html.includes('Leading content'), false);

    assert.match(html, /<h2 class="base-text-default text-2xl font-bold my-6[^"]*" id="first-heading">\s*First heading\s*<\/h2>/);
    assert.match(html, /<figure class="flex flex-col items-center justify-center mt-3 mb-4">/);
    assert.match(html, /<p class="base-text-default mt-3 mb-4 first:mt-0 last:mb-0">Some text\.<\/p>/);
  });

  it('skips the whole TOC flow for about.md', async () => {
    const html = await processWithFullPipeline('## Hello\n\nWorld', { path: 'about.md' });

    assert.equal(html.includes('id="table-of-contents"'), false);
    assert.equal(html.includes('Leading content'), false);
  });

  it('skips the whole TOC flow when there are no headings', async () => {
    const html = await processWithFullPipeline('Just some prose.\n\nNo headings here.');

    assert.equal(html.includes('id="table-of-contents"'), false);
    assert.equal(html.includes('Leading content'), false);
  });
});
