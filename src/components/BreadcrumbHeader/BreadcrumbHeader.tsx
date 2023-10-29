import { Link } from '../Links';
import { Page } from '../../helpers/paths';

export interface BreadcrumbHeaderProps {
  pages: Page[];
}

export function BreadcrumbHeader(props: BreadcrumbHeaderProps) {
  const length = props.pages.length;

  return (
    <nav aria-label="Breadcrumb">
      <ul className="md:pl-4 list-style-none flex font-semibold flex-wrap">
        {props.pages.map((page, idx) => (
          <li key={page.href} className="flex flex-row items-center">
            <Link href={page.href} className="py-3 px-2">
              {page.title}
            </Link>

            {idx + 1 < length && (
              <ChevronRight className="w-4 h-4 mx-1 mt-1 text-gray-500 dark:text-gray-200" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Taken from https://chakra-ui.com/docs/media-and-icons/icon.
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      focusable="false"
      className={className}
      aria-hidden={true}
    >
      <path
        fill="currentColor"
        d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
      ></path>
    </svg>
  );
}
