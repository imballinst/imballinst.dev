import type { JSX } from 'preact';

export interface LinkProps {
  href: string;
  children: JSX.Element | JSX.Element[] | string;
  isExternal?: boolean;
  className?: string;
  disableUnderline?: boolean;
  disableExternalIcon?: boolean;
}

const ADDITIONAL_EXTERNAL_PROPS = { target: '_blank', rel: 'noopener' };

export function Link({
  href,
  children,
  isExternal,
  className = '',
  disableUnderline = false,
  disableExternalIcon = false
}: LinkProps) {
  const anchorProps: JSX.HTMLAttributes<HTMLAnchorElement> = {
    href,
    className: `text-teal-600 dark:text-teal-300 ${disableUnderline ? '' : 'hover:underline'
      } break-all ${className}`
  };
  let additionalChildren: JSX.Element | undefined;

  if (isExternal) {
    anchorProps.target = ADDITIONAL_EXTERNAL_PROPS.target;
    anchorProps.rel = ADDITIONAL_EXTERNAL_PROPS.rel;
    anchorProps.className = `${anchorProps.className} inline-flex`;

    if (!disableExternalIcon) {
      additionalChildren = <ExternalLinkIcon />;
    }
  }

  return (
    <a {...anchorProps}>
      {children}
      {additionalChildren}
    </a>
  );
}

export function ExternalLinkIcon() {
  return (
    // Taken from https://chakra-ui.com/docs/media-and-icons/icon.
    <svg
      viewBox="0 0 24 24"
      className="ml-0.5 mb-1 h-3 w-3 inline-block"
      focusable="false"
      aria-hidden={true}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <path d="M15 3h6v6"></path>
        <path d="M10 14L21 3"></path>
      </g>
    </svg>
  );
}
