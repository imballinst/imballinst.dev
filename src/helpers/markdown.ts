export interface Heading {
  text: string;
  id: string;
  level: number;
  children: Heading[];
}

export function getAllHeadingIds(content: string) {
  const root: Heading = {
    id: '',
    text: '',
    level: 1,
    children: []
  };

  const lines = content.split('\n').filter((line) => line.match(/^#+\s/));
  recursivelyAddToPreviousHeading(lines, root);

  return root;
}

// Helper functions.
function convertHeadingToId(text: string) {
  return text
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '');
}

function recursivelyAddToPreviousHeading(
  lines: string[],
  parent: Heading,
  prev?: Heading
) {
  const line = lines.shift();
  if (!line) return;

  const indexOfFirstSpace = line.indexOf(' ');
  const headingTag = line.slice(0, indexOfFirstSpace);
  const headingText = line.slice(indexOfFirstSpace + 1);

  const level = headingTag.length;
  const node = {
    level,
    id: convertHeadingToId(headingText),
    children: [],
    text: headingText
  };
  if (prev && level > prev.level) {
    prev.children.push(node);
    recursivelyAddToPreviousHeading(lines, parent, prev);
    return;
  }

  parent.children.push(node);
  recursivelyAddToPreviousHeading(lines, parent, node);
}
