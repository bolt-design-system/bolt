// import { Preact, h } from '@bolt/core';
const Calendar = ({ color, size, ...otherProps }) => {
  color = color || 'currentColor';
  size = size || '24';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
      <title>Icon/utility/Indigo/24px/Calendar</title>
      <g fill="currentColor" fill-rule="evenodd">
        <path
          d="M0,64a64,64 0 1,0 128,0a64,64 0 1,0 -128,0"
          class="c-bolt-icon--background c-bolt-icon--circle-background"
          fill="none"
        />
        <g fill="currentColor">
          <path d="M4 20.125h16v-11H4v11zm16-17.5h-.938V1h-2v1.625H6.937V1h-2v1.625H4a2 2 0 0 0-2 2v15.5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-15.5a2 2 0 0 0-2-2z" />
          <path d="M6.292 13.125h11.416v-2H6.292zM6.292 17.458h9v-2h-9z" />
        </g>
      </g>
    </svg>
  );
};
export default Calendar;
