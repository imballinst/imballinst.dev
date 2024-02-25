import type { IconsCommonProps } from './common';

// From https://chakra-ui.com/docs/media-and-icons/icon.
export function EditIcon({ className }: IconsCommonProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      focusable="false"
      className={className}
      stroke-width={2}
    >
      <g fill="none" stroke="currentColor">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </g>
    </svg>
  );
}
