import { toString } from 'mdast-util-to-string';

// TODO(imballinst): ensure these are consistent.
const TEXT_COLOR = 'text-black dark:text-gray-200';
const DEFAULT_ATTRS = {
  h1: `${TEXT_COLOR} text-3xl font-bold my-6`,
  h2: `${TEXT_COLOR} text-2xl font-bold my-4`,
  h3: `${TEXT_COLOR} text-xl font-semibold my-2`,
  h4: `${TEXT_COLOR} text-lg font-semibold`,
  h5: `${TEXT_COLOR} text-base`,
  h6: `${TEXT_COLOR} text-sm`,
  p: `${TEXT_COLOR} my-2 first:mt-0 last:mb-0`,
  strong: `${TEXT_COLOR} font-semibold`
};

export default function htmlClassnamesPlugin() {
  return (tree) => {
    for (const child of tree.children) {
      if (child.type === 'paragraph') {
        const str = toString(child);

        child.type = 'html';
        child.children = undefined;
        child.value = `
          <p class="${DEFAULT_ATTRS.p}">
            ${str}
          </p>
        `;
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
      }
    }
  };
}
