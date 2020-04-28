import { polyfillLoader } from '@bolt/core-v3.x/polyfills';
import meta from './animate.meta';

polyfillLoader.then(res => {
  import(
    /* , webpackChunkName: 'bolt-animate' */ './src/animate'
  );
});

export default {
  meta,
};
