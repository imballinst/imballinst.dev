const LEADING_CONTENT_ID = '__leading-content__';

export function tocInjectorPlugin() {
  return (/** @type {*} */ tree) => {
    tree.children.unshift(
      {
        type: 'heading',
        depth: 2,
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
  };
}
