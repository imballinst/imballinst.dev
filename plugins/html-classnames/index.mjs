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
      }
    }
  };
}
