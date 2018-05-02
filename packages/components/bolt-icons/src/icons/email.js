import { h } from '@bolt/core';

export const Email = ({ bgColor, fgColor, size, ...otherProps }) => {
  return (
    <svg width={size} height={size} {...otherProps} viewBox="0 0 24 24">
      <g fill="none" fill-rule="evenodd">
        <path />
        <path
          d="M20 19H4c-.55 0-1-.45-1-1V7.919l8.425 5.9c.175.119.375.181.575.181.2 0 .4-.063.575-.181L21 7.919V18c0 .55-.45 1-1 1zM4 5h16c.394 0 .731.225.894.556L12 11.781 3.106 5.556A.99.99 0 0 1 4 5zm19 .981A3.004 3.004 0 0 0 20 3H4a3 3 0 0 0-3 2.981V18c0 1.656 1.344 3 3 3h16c1.656 0 3-1.344 3-3V5.981z"
          fill={bgColor}
        />
      </g>
    </svg>
  );
};
