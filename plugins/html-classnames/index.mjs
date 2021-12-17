import { toString } from 'mdast-util-to-string';
import { DEFAULT_ATTRS } from '../../src/helpers/tag-styles';

export default function htmlClassnamesPlugin() {
  return (tree) => {
    if (tree.children) {
      // Skip parsing Markdown images.
      if (tree.children && tree.children.length === 2) {
        const [firstChild, secondChild] = tree.children;

        if (
          firstChild.type === 'paragraph' &&
          secondChild.type === 'paragraph'
        ) {
          return;
        }
      }

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
    }
  };
}
