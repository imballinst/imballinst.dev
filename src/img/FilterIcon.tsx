import React from 'react';
import { IconProps } from './commons';

export function FilterIcon({ size = 16 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className="fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}
