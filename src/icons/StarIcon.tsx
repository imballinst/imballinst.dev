import React from 'react';
import { IconProps } from './commons';

// Source: https://svgsilh.com/image/30466.html.
export function StarIcon({ size }: IconProps) {
  return (
    <svg
      version="1"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="matrix(0.1,0,0,-0.1,0,1145)" fill="#000000" stroke="none">
        <path d="M 792.7 11352.8 c -3 -16 -34 -145 -67 -287 l -61 -259 l -267 -111 c -147 -61 -266 -115 -265 -121 c 2 -5 111 -74 243 -154 c 131 -79 242 -148 245 -153 c 3 -5 13 -109 23 -231 c 23 -302 28 -347 35 -347 c 4 0 104 83 222 185 c 118 102 222 185 231 185 c 10 0 140 -29 290 -65 c 149 -36 272 -64 274 -62 c 1 1 -47 119 -107 262 c -59 143 -109 268 -109 278 c 0 9 63 121 140 247 c 78 127 143 237 147 245 c 7 19 1 19 -282 -5 c -126 -11 -246 -20 -266 -20 c -34 0 -43 9 -223 220 c -104 121 -190 220 -192 220 c -2 0 -7 -12 -11 -27 z" />
      </g>
    </svg>
  );
}
