// import { Preact, h } from '@bolt/core';
const Communications = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" {...otherProps}>
      <title>Icon/Industry/Communications</title>
      <path
        d="M16.001 15.034a3 3 0 1 0 0 6 3 3 0 0 0 0-6m0-7.414C10.28 7.62 5.62 12.28 5.62 18c0 2.94 1.27 5.71 3.368 7.64l1.031-1.8A8.348 8.348 0 0 1 7.62 18c0-4.62 3.76-8.38 8.38-8.38 4.61 0 8.37 3.76 8.37 8.38 0 2.22-.9 4.32-2.4 5.85L23 25.63c2.1-1.92 3.37-4.69 3.37-7.63 0-5.72-4.65-10.38-10.37-10.38M32 18c0 5.05-2.31 9.63-6.13 12.6l-1.01-1.76C28.07 26.25 30 22.32 30 18c0-7.72-6.28-14-14-14S2 10.28 2 18c0 4.31 1.93 8.25 5.14 10.85L6.12 30.6C2.3 27.63 0 23.04 0 18 0 9.18 7.17 2 16 2c8.82 0 16 7.18 16 16"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default Communications;
