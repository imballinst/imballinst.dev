import { toString } from 'mdast-util-to-string';

import { toHast } from 'mdast-util-to-hast';
import { toHtml } from 'hast-util-to-html';

// TODO(imballinst): ensure these are consistent.
const TEXT_COLOR = 'text-black dark:text-gray-200';
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

export default function htmlClassnamesPlugin() {
  return (tree) => {
    for (const child of tree.children) {
      if (child.type === 'paragraph') {
        const hast = toHast(child);
        hast.properties.class = DEFAULT_ATTRS.p;

        // Check if the paragraph has links.
        if (child.children) {
          for (const paragraphChild of hast.children) {
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
        hast.properties.class = `${TEXT_COLOR} list-decimal pl-4`;
        for (const el of hast.children) {
          el.properties = { class: 'pl-1' };
        }

        const html = toHtml(hast);

        child.type = 'html';
        child.value = html;
        child.children = undefined;
      } else if (child.type === 'blockquote') {
        const hast = toHast(child);
        hast.properties.class = `${TEXT_COLOR} italic pl-4`;

        const html = toHtml(hast);

        child.type = 'html';
        child.value = html;
        child.children = undefined;
      }
    }
  };
}

// Function helpers.
function modifyAnchorNode({ node }) {
  node.properties.class =
    'text-teal-600 dark:text-teal-300 hover:underline break-all inline';

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
