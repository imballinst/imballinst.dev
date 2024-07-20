import type { Heading } from '../../helpers/markdown';
import { Link } from '../Links';

export function TableOfContents({ root }: { root: Heading }) {
  return <List headings={root.children} />;
}

// Composing functions.
function List({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) return null;

  return (
    <ul className="pl-4 list-disc">
      {headings.map((heading) => (
        <li key={heading.id}>
          <Link href={`#${heading.id}`}>{heading.text}</Link>

          <List headings={heading.children} />
        </li>
      ))}
    </ul>
  );
}
