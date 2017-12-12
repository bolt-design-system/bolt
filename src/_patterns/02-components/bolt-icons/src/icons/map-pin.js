// import { Preact, h } from '@bolt/core';
const MapPin = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Map-pin</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0"
          class="c-bolt-icon--background c-bolt-icon--circle-background"
          fill="none"
        />
        <g fill-rule="nonzero" fill="currentColor">
          <path d="M12 0C6.488 0 2 4.488 2 10c0 1.769.513 3.606 1.531 5.463.787 1.444 1.881 2.906 3.244 4.35 2.3 2.431 4.575 3.956 4.669 4.019a1 1 0 0 0 1.112 0c.094-.063 2.369-1.587 4.669-4.019 1.369-1.444 2.456-2.906 3.244-4.35C21.481 13.607 22 11.763 22 10c0-5.512-4.488-10-10-10zm0 21.769C10.1 20.363 4 15.413 4 10c0-4.413 3.588-8 8-8s8 3.588 8 8c0 5.412-6.106 10.362-8 11.769z" />
          <path d="M12 6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </g>
      </g>
    </svg>
  );
};
export default MapPin;
