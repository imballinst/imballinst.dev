export default function tocInjectorPlugin() {
  return (/** @type {*} */ tree) => {
    tree.children.unshift({
      type: 'heading',
      depth: 2,
      value: 'Table of Contents'
    });
  };
}
