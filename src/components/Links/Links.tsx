import { AnchorHTMLAttributes, ReactNode } from 'react';

export interface LinkProps {
  href: string;
  children: ReactNode;
  isExternal?: boolean;
  className?: string;
}

const ADDITIONAL_EXTERNAL_PROPS = { target: '_blank', rel: 'noopener' };

export function Link({
  href,
  children,
  isExternal,
  className = ''
}: LinkProps) {
  const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
    href,
    className: `text-teal-600 dark:text-teal-300 hover:underline transition-colors break-all ${className}`
  };
  let additionalChildren: ReactNode | undefined;

  if (isExternal) {
    anchorProps.target = ADDITIONAL_EXTERNAL_PROPS.target;
    anchorProps.rel = ADDITIONAL_EXTERNAL_PROPS.rel;
    anchorProps.className = `${anchorProps.className} inline`;

    additionalChildren = (
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
  } else {
    anchorProps.className = `${anchorProps.className} flex`;
  }

  return (
    <a {...anchorProps}>
      {children}
      {additionalChildren}
    </a>
  );
}
