import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./dropdown.js');
});
