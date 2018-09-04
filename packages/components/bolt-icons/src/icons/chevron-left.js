
  import { h } from '@bolt/core/renderers';

  export const ChevronLeft = ({ bgColor, fgColor, size, ...otherProps }) => {
      return (
        <svg {...otherProps} viewBox="0 0 32 32"><path fill={bgColor} fill-rule="evenodd" d="M19.062 24.946a1.34 1.34 0 0 0 1.884 0 1.339 1.339 0 0 0 0-1.884l-7.059-7.06 7.059-7.059a1.34 1.34 0 0 0 0-1.884 1.329 1.329 0 0 0-1.883 0l-8 8a1.323 1.323 0 0 0 0 1.885l7.999 8.002z"/></svg>
      )
};
