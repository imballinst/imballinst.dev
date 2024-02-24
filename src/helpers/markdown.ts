export interface Heading {
  text: string;
  id: string;
  children: Heading[];
}

export function getAllHeadingIds(content: string) {
  const headings: Heading[] = [];

  const linesArray = content.split('\n');
  for (const line of linesArray) {
    if (line.startsWith('#')) {
      let numberOfTags = 0;
      let text = '';

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '#') {
          numberOfTags++;
          continue;
        }

        text = line.slice(i + 1);
        break;
      }

      // TOOD: need to make this nested
      headings.push({
        text,
        id: convertHeadingToId(text),
        children: []
      });
    }
  }

  return headings;
}

export function convertHeadingToId(text: string) {
  return text
    .toLowerCase()
    .replace(/['/@?]/g, '')
    .replace(/\s/g, '-');
}
