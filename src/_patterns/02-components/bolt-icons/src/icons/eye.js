// import { Preact, h } from '@bolt/core';
const Eye = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Eye</title>
      <defs>
        <path id="a" d="M0 .006h24V18H0z" />
      </defs>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0"
          class="c-bolt-icon--background c-bolt-icon--circle-background"
          fill="none"
        />
        <g transform="translate(0 2.994)">
          <mask id="b" fill="currentColor">
            <use xlinkHref="#a" />
          </mask>
          <path
            d="M19.36 12.358c-2.287 2.418-4.762 3.643-7.36 3.643-2.599 0-5.075-1.225-7.362-3.643a18.752 18.752 0 0 1-2.5-3.355 18.847 18.847 0 0 1 2.5-3.354C6.925 3.23 9.4 2.005 12 2.005c2.6 0 5.075 1.225 7.361 3.644a18.935 18.935 0 0 1 2.5 3.354c-.4.675-1.25 2.024-2.5 3.355m4.531-3.805c-.044-.087-1.087-2.155-3.037-4.236C18.205 1.5 15.144.005 12 .005 8.856.005 5.794 1.5 3.144 4.323 1.194 6.403.151 8.471.108 8.56a.979.979 0 0 0 0 .894c.044.087 1.086 2.155 3.036 4.235C5.794 16.506 8.856 18 12 18c3.144 0 6.206-1.494 8.855-4.318 1.95-2.08 2.993-4.148 3.037-4.235a.973.973 0 0 0 0-.894"
            fill="currentColor"
            mask="url(#b)"
          />
        </g>
        <path
          d="M12 13.996c-1.1 0-2-.899-2-1.999s.9-1.999 2-1.999 2 .9 2 2-.9 1.998-2 1.998m0-5.998c-2.206 0-4 1.794-4 4a4.004 4.004 0 0 0 4 3.998 4.003 4.003 0 0 0 3.999-3.999A4.003 4.003 0 0 0 12 7.998"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
export default Eye;
