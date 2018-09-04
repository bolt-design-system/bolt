
  import { h } from '@bolt/core/renderers';

  export const Financial = ({ bgColor, fgColor, size, ...otherProps }) => {
      return (
        <svg {...otherProps} viewBox="0 0 32 32"><g fill={bgColor} fill-rule="evenodd"><path d="M5 30h22V2H5v28zM27 0H5a2 2 0 0 0-2 2v28a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/><path d="M9 10.72h14v-5H9v5zm-2 2h18v-9H7v9zM9 18.279h2v-2H9zM13 18.279h2v-2h-2zM17 18.279h2v-2h-2zM21 18.279h2v-2h-2zM9 22.28h2v-2H9zM13 22.28h2v-2h-2zM17 22.28h2v-2h-2zM21 22.28h2v-2h-2zM9 26.28h2v-2H9zM13 26.28h2v-2h-2zM17 26.28h2v-2h-2zM21 26.28h2v-2h-2z"/></g></svg>
      )
};
