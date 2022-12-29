import { toString } from 'mdast-util-to-string';

import { toHast } from 'mdast-util-to-hast';
import { toHtml } from 'hast-util-to-html';

// TODO(imballinst): ensure these are consistent.
const TEXT_COLOR = 'text-black dark:text-gray-200';
const ALTERNATIVE_TEXT_COLORS = {
  black: 'text-black dark:text-gray-200',
  gray: 'text-gray-600 dark:text-gray-400',
  teal: 'text-teal-600 dark:text-teal-300'
};

const DEFAULT_ATTRS = {
  h1: `${TEXT_COLOR} text-3xl font-bold my-6`,
  h2: `${TEXT_COLOR} text-2xl font-bold my-4`,
  h3: `${TEXT_COLOR} text-xl font-semibold mt-4 my-2`,
  h4: `${TEXT_COLOR} text-lg font-semibold`,
  h5: `${TEXT_COLOR} text-base`,
  h6: `${TEXT_COLOR} text-sm`,
  p: `${TEXT_COLOR} mt-3 mb-4 first:mt-0 last:mb-0`,
  strong: `${TEXT_COLOR} font-semibold`
};

const NEW_PARAGRAPH = {
  type: '__token__',
  value: '__NEW_PARAGRAPH__'
};
const NEW_LINE = {
  type: '__token__',
  value: '__NEW_LINE__'
};
const BLOCKQUOTE_PARAGRAPH_CLASS = DEFAULT_ATTRS.p.replace(
  `${TEXT_COLOR} `,
  ''
);

export default function htmlClassnamesPlugin() {
  return (tree) => {
    for (const child of tree.children) {
      if (child.type === 'paragraph') {
        const hast = toHast(child);
        hast.properties.class = DEFAULT_ATTRS.p;

        // Check if the paragraph has links.
        if (hast.children) {
          const firstChild = hast.children[0];
          const lastChild = hast.children[hast.children.length - 1];

          // Process `:::` for centered, gray texts.
          if (
            firstChild.value?.startsWith(':::') &&
            lastChild.value?.endsWith(':::')
          ) {
            hast.properties.class = `${ALTERNATIVE_TEXT_COLORS.gray} text-center italic py-2 mt-3 mb-4 first:mt-0 last:mb-0 border-y border-gray-200 dark:border-gray-600`;
            firstChild.value = firstChild.value.slice(3);
            lastChild.value = lastChild.value.slice(0, -3);
          }

          for (const paragraphChild of hast.children) {
            // Process others.
            if (
              paragraphChild.tagName === 'a' &&
              paragraphChild.children?.length === 1 &&
              paragraphChild.children?.[0].type === 'text'
            ) {
              modifyAnchorNode({ node: paragraphChild });
            } else if (
              paragraphChild.tagName === 'code' &&
              paragraphChild.children?.length === 1 &&
              paragraphChild.children?.[0].type === 'text'
            ) {
              paragraphChild.children[0].value = `\`${paragraphChild.children[0].value}\``;
            }
          }
        }

        child.type = 'html';
        child.children = undefined;
        child.value = toHtml(hast);
      } else if (child.type === 'heading') {
        const str = toString(child);
        const tag = `h${child.depth}`;

        child.type = 'html';
        child.children = undefined;
        child.value = `
          <${tag} class="${DEFAULT_ATTRS[tag]}">
            ${str}
          </${tag}>
        `;
      } else if (child.type === 'list') {
        const hast = toHast(child);
        hast.properties.class = `${TEXT_COLOR} list-decimal pl-8`;

        for (const el of hast.children) {
          el.properties = { class: 'pl-1' };
        }

        const html = toHtml(hast);

        child.type = 'html';
        child.value = html;
        child.children = undefined;
      } else if (child.type === 'blockquote') {
        const hast = toHast(child);

        const pureTextArray = [];
        let numberOfParagraphs = 0;

        // TODO(imballinst): change \n to <p> tags.
        for (const hastChild of hast.children) {
          if (hastChild.type === 'element' && hastChild.tagName === 'p') {
            pureTextArray.push(NEW_PARAGRAPH);
            numberOfParagraphs += 1;

            for (const hastGrandChild of hastChild.children) {
              if (hastGrandChild.value) {
                const spl = hastGrandChild.value.split('\n');

                for (let i = 0; i < spl.length; i++) {
                  pureTextArray.push({ type: 'text', value: spl[i] });

                  if (i + 1 < spl.length) {
                    pureTextArray.push(NEW_LINE);
                  }
                }
              } else {
                pureTextArray.push(hastGrandChild);
              }
            }
          }
        }

        const pureHast = [];
        let lastParagraph;

        for (const el of pureTextArray) {
          const properties = {};

          if (el === NEW_LINE) {
            // New line token.
            lastParagraph = {
              type: 'element',
              tagName: 'p',
              properties,
              children: []
            };

            pureHast.push(lastParagraph);
            continue;
          }

          if (el === NEW_PARAGRAPH) {
            // New paragraph token.
            properties.class =
              numberOfParagraphs > 1 ? BLOCKQUOTE_PARAGRAPH_CLASS : undefined;

            lastParagraph = {
              type: 'element',
              tagName: 'p',
              properties,
              children: []
            };
            pureHast.push(lastParagraph);
          } else {
            // Text.
            lastParagraph.children.push(el);
          }
        }

        hast.properties.class = `${ALTERNATIVE_TEXT_COLORS.gray} italic p-4 border border-gray-200 dark:border-gray-600 rounded`;
        hast.children = pureHast;
        // TODO(imballinst): ensure there is a way to create a proper newlines in blockquotes.
        const html = toHtml(hast);

        child.type = 'html';
        child.value = html;
        child.children = undefined;
      } else if (child.type === 'thematicBreak') {
        const hast = toHast(child);
        hast.properties.class = `border-gray-200 dark:border-gray-600`;

        const html = toHtml(hast);

        child.type = 'html';
        child.value = html;
        child.children = undefined;
      } else if (child.type === 'table') {
        const hast = toHast(child);
        hast.properties.class = `${ALTERNATIVE_TEXT_COLORS.gray} border-gray-200 dark:border-gray-600 w-full text-sm`;

        const head = hast.children.find((e) => e.tagName === 'thead');
        const body = hast.children.find((e) => e.tagName === 'tbody');

        for (const tr of head.children) {
          if (tr.tagName !== 'tr') continue;

          if (tr.properties === undefined) {
            tr.properties = {};
          }

          tr.properties.class =
            'font-bold border-b-2 border-gray-200 dark:border-gray-600';

          for (const th of tr.children) {
            if (th.tagName !== 'th') continue;

            if (th.properties === undefined) {
              th.properties = {};
            }

            th.properties.class = 'p-2';
          }
        }

        for (const tr of body.children) {
          if (tr.tagName !== 'tr') continue;

          if (tr.properties === undefined) {
            tr.properties = {};
          }

          tr.properties.class = 'border-b border-gray-200 dark:border-gray-600';

          for (const td of tr.children) {
            if (td.tagName !== 'td') continue;

            if (td.properties === undefined) {
              td.properties = {};
            }

            td.properties.class = 'p-2';
          }
        }

        const html = toHtml(hast);

        child.type = 'html';
        child.value = `<div class="overflow-x-auto my-4">${html}</div>`;
        child.children = undefined;
      }
    }
  };
}

// Function helpers.
function modifyAnchorNode({ node }) {
  node.properties.class =
    'text-teal-600 dark:text-teal-300 hover:underline break-words inline';

  if (
    node.properties.href.includes('https://') ||
    node.properties.href.includes('http://')
  ) {
    node.children.push({
      type: 'element',
      tagName: 'svg',
      properties: {
        viewBox: '0 0 24 24',
        class: 'ml-1 mb-2 h-3 w-3 inline-block',
        focusable: 'false',
        'aria-hidden': 'true'
      },
      children: [
        {
          type: 'element',
          tagName: 'g',
          properties: {
            fill: 'none',
            stroke: 'currentColor',
            'stroke-linecap': 'round',
            'stroke-width': '2'
          },
          children: [
            {
              type: 'element',
              tagName: 'path',
              properties: {
                d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'
              }
            },
            {
              type: 'element',
              tagName: 'path',
              properties: { d: 'M15 3h6v6' }
            },
            {
              type: 'element',
              tagName: 'path',
              properties: { d: 'M10 14L21 3' }
            }
          ]
        }
      ]
    });

    node.properties.target = '_blank';
    node.properties.rel = 'noopener';
  }
}
