import { useRef } from 'react';
import { Collection } from '../../helpers/collections';
import { formatLastDirectoryUpdate } from '../../helpers/date';
import { Card, CardProps } from '../Card';
import { Link } from '../Links';
import { Text } from '../Typography';

export interface DirectoryProps {
  cards: CardProps[];
}

export function Directory({ cards }: DirectoryProps) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, idx) => (
        <li key={idx}>
          <Card {...card} />
        </li>
      ))}
    </ul>
  );
}

// Directory segment.
// This is used when a view contains multiple segments, e.g. list of categories.
export interface DirectorySegmentProps {
  titleCardPrefixes?: {
    parentTitle?: boolean;
    expression?: boolean | string;
  };
  slug?: string;
  numOfCards: number;
  title: string;
  collections: Collection[];
}

export function DirectorySegment({
  title,
  titleCardPrefixes,
  slug = '',
  numOfCards,
  collections
}: DirectorySegmentProps) {
  const shownCollections = useRef(
    numOfCards > 0 ? collections.slice(0, numOfCards) : collections
  );

  return (
    <>
      {numOfCards > 0 && (
        <>
          <div className="flex flex-row justify-between items-end">
            <Text as="h3" className="text-xl font-bold w-1/2">
              {title}
            </Text>

            <Link href={`/${slug}`}>View all</Link>
          </div>

          <hr className="h-1 mt-2 mb-4" />
        </>
      )}

      <Directory
        cards={shownCollections.current.map((file) => ({
          title: getCardTitle(file, titleCardPrefixes),
          text: file.events[0].description,
          date: file.events[0].datetime,
          href: `/${file.expression}/${file.category}/${file.slug}`
        }))}
      />
    </>
  );
}

export function DirectoryFooter({ updateDate }: { updateDate: string }) {
  return (
    <Text
      colorScheme="gray"
      className="flex flex-1 flex-col justify-end items-center italic text-sm mt-8"
    >
      This page was last updated on {formatLastDirectoryUpdate(updateDate)}.
    </Text>
  );
}

// Helper functions.
function getCardTitle(
  file: Collection,
  prefixes: DirectorySegmentProps['titleCardPrefixes']
) {
  const { title, parentTitle, events } = file;
  const event = events[0];
  const eventValueOf = new Date(event.datetime).valueOf();
  const currentValueOf = new Date().valueOf();

  const newPrefixes: string[] = [];

  if (prefixes?.expression) {
    let expressionText: string;

    if (typeof prefixes?.expression === 'boolean') {
      // boolean.
      expressionText = currentValueOf >= eventValueOf ? 'Since' : 'Until';
    } else {
      // string.
      expressionText = prefixes?.expression;
    }

    newPrefixes.push(expressionText);
  }

  if (prefixes?.parentTitle) {
    newPrefixes.push(parentTitle);
  }

  const prefix = newPrefixes.length > 0 ? `${newPrefixes.join(' ')} ` : '';
  return `${prefix}${title}`;
}
