import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then(res => {
  import(
    /* , webpackChunkName: 'bolt-banner' */ './src/banner'
  );
});
