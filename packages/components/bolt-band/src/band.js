import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./band.standalone.js');
});