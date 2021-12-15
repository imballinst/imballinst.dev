import { CategorizedCollectionItem } from '../../helpers/collections';
import {
  DirectorySegment,
  DirectorySegmentProps,
  DirectoryFooter
} from './Directory';

export function CategoryDirectories({
  viewAllSlugPrefix = '',
  updateDate,
  items,
  title,
  numOfCards = 3,
  titleCardPrefixes
}: {
  viewAllSlugPrefix?: string;
  updateDate: string;
  items: CategorizedCollectionItem[];
  title?: string;
  numOfCards?: number;
  titleCardPrefixes: DirectorySegmentProps['titleCardPrefixes'];
}) {
  return (
    <div className="md:p-4 flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-200">{title}</h2>

      {items.map((item) => (
        <div className="flex-0 mb-8" key={item.slug}>
          <DirectorySegment
            collections={item.collections}
            title={item.title}
            slug={`${viewAllSlugPrefix}/${item.slug}`}
            numOfCards={numOfCards}
            titleCardPrefixes={titleCardPrefixes}
          />
        </div>
      ))}

      <DirectoryFooter updateDate={updateDate} />
    </div>
  );
}
