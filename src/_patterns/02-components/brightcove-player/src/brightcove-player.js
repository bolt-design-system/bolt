import { polyfillLoader } from '@bolt/core';

polyfillLoader.then((res) => {
  import('./brightcove-player.standalone.js');
});
