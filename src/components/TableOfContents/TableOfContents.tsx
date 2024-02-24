import type { JSX } from 'preact/jsx-runtime';
import type { Heading } from '../../helpers/markdown';

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const elements: JSX.Element[] = [];
  let previousHeading: Heading | undefined;

  for (const heading of headings) {
    // TODO
    previousHeading = heading;
  }

  return <ul>{elements}</ul>;
}
