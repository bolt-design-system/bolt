
  import { h } from '@bolt/core/renderers';

  export const Share = ({ bgColor, fgColor, size, ...otherProps }) => {
      return (
        <svg {...otherProps} viewBox="0 0 16 16"><g fill={bgColor} fill-rule="evenodd"><path fill-rule="nonzero" d="M4 11.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M4.799 6.5l5.196-3 1 1.732-5.196 3zM4.799 10.232l5.196 3 1-1.732-5.196-3z"/><path fill-rule="nonzero" d="M12 6.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM12 15.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></g></svg>
      )
};
