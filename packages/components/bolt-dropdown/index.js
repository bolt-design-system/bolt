import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import('./dropdown.js');
});
