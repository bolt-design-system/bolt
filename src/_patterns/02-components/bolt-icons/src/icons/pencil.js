// import { Preact, h } from '@bolt/core';
const Pencil = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Pencil</title>
      <path
        d="M19.276 7.329l-2.61-2.61c1.44-1.44 2.469-2.75 3.92-1.31 1.44 1.45.129 2.48-1.31 3.92zm-12.4 12.4c-1.44 1.44-3.92 1.31-3.92 1.31s-.13-2.48 1.309-3.92l8.485-8.485 2.61 2.61-8.484 8.485zM17.97 8.633L16.666 9.94l-2.611-2.611 1.306-1.305 2.609 2.61zm3.915-6.526c-2.16-2.16-4.36-.86-6.53 1.301l-12.4 12.4c-2.16 2.17-1.95 7.18-1.95 7.18s5.01.21 7.18-1.95l12.4-12.4c2.16-2.17 3.46-4.37 1.3-6.53z"
        fill="currentColor"
        fill-rule="evenodd"
      />
    </svg>
  );
};
export default Pencil;
