import { polyfillLoader } from '@bolt/core/polyfills';

polyfillLoader.then(res => {
  import(/* webpackChunkName: 'bolt-device-viewer' */ './device-viewer.standalone.js');
});
