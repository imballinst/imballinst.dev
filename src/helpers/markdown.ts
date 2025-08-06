export interface Heading {
  text: string;
  id: string;
  level: number;
  children: Heading[];
}

// Helper functions.
function convertHeadingToId(text: string) {
  return text
    .trim()
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
