import { polyfillLoader } from '@bolt/core-v3.x/polyfills';

polyfillLoader.then((res) => {
  import(
    /*
    webpackMode: 'lazy',
    webpackChunkName: 'editor-integration'
  */ './editor-integration'
  );
});
