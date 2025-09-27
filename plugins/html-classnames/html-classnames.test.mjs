// @ts-check
import { describe, test } from 'node:test';
import htmlClassnamesPlugin, { DEFAULT_ATTRS } from './index.mjs';
import assert from 'node:assert';
import { remark } from 'remark';
import { load } from 'cheerio';

describe('paragraph', () => {
  test('normal', async () => {
    const result = await remark()
      .use(htmlClassnamesPlugin)
      .process(
        `
hehe
  `.trim()
      );

    assert.strictEqual(beautifyHTML(String(result)), beautifyHTML(`<p class="${DEFAULT_ATTRS.p}">hehe</p>`));
  });

  test('process paragraph with :::', async () => {
    const result = await remark()
      .use(htmlClassnamesPlugin)
      .process(
        `
:::
hehe
:::
  `.trim()
      );

    assert.strictEqual(
      beautifyHTML(String(result)),
      beautifyHTML(`
<p class="${DEFAULT_ATTRS.admonition}">
  hehe
</p>`)
    );
  });

  test('paragraph with <a> tag inside it', async () => {
    const result = await remark()
      .use(htmlClassnamesPlugin)
      .process(
        `
This is a [link](https://imballinst.dev) inside a paragraph.
  `.trim()
      );

    assert.strictEqual(
      beautifyHTML(String(result)),
      beautifyHTML(`
<p class="${DEFAULT_ATTRS.p}">
  This is a <a href="https://imballinst.dev" class="${DEFAULT_ATTRS.a}">link</a> inside a paragraph.
</p>`)
    );
  });

  test('paragraph with an inline <code> tag in it', async () => {
    const result = await remark()
      .use(htmlClassnamesPlugin)
      .process(
        `
This is a \`code\` inside a paragraph.
  `.trim()
      );

    assert.strictEqual(
      beautifyHTML(String(result)),
      beautifyHTML(`
<p class="${DEFAULT_ATTRS.p}">
  This is a <code>\`code\`</code> inside a paragraph.
</p>`)
    );
  });
});

/**
 *
 * @param {string} html
 * @returns
 */
function beautifyHTML(html) {
  // Remove the whitespace from the elements.
  // <p>\n hehe</p> should be just <p>hehe</p>
  return load(
    html
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .join('')
  )('body').html();
}
