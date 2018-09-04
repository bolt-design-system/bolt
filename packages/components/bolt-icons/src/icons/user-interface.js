
  import { h } from '@bolt/core/renderers';

  export const UserInterface = ({ bgColor, fgColor, size, ...otherProps }) => {
      return (
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" {...otherProps} viewBox="0 0 32 32"><defs><path id="a" d="M20 25.999h6v-8h-6v8zM18 28h10V15.999H18V28zM6 9.998h20V5.999H6v3.999zm-2 2.001h24V3.998H4v8.001zM30 0H2C.895 0 0 .894 0 1.999V30c0 1.103.895 1.998 2 1.998h28c1.105 0 2-.895 2-1.998V1.999A1.999 1.999 0 0 0 30 0zm0 28.998A1 1 0 0 1 29 30H3a1 1 0 0 1-1-1.002V3a1 1 0 0 1 1-1.001h26A1 1 0 0 1 30 3v25.998zM6 25.999h6v-8H6v8zM4 28h10V15.999H4V28z"/></defs><g fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><g fill={bgColor} mask="url(#b)"><path d="M0 0h32v32H0z"/></g></g></svg>
      )
};
