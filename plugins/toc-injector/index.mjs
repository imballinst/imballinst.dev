const LEADING_CONTENT_ID = '__leading-content__';

export const TOC_ID = 'table-of-contents';

export function tocInjectorPlugin() {
  return (/** @type {*} */ tree) => {
    tree.children.unshift(
      {
        type: 'heading',
        depth: 2,
        id: TOC_ID,
        children: [{ type: 'text', value: 'Table of Contents' }]
      },
      {
        type: 'heading',
        depth: 2,
        id: LEADING_CONTENT_ID,
        children: [{ type: 'text', value: 'Leading content' }]
      }
    );
  };
}

export function tocLeadingContentCleanupPlugin() {
  return (/** @type {*} */ tree) => {
    const idx = tree.children.findIndex(
      (child) => child.id === LEADING_CONTENT_ID
    );
    if (idx > -1) {
      tree.children.splice(idx, 1);
    }

    const tocIdx = tree.children.findIndex((child) => child.id === TOC_ID);
    if (tocIdx > -1 && tree.children[tocIdx + 1].type === 'list') {
      // The first list after TOC heading is the TOC itself.
      tree.children[tocIdx + 1].children.splice(0, 1);
    }
  };
}
