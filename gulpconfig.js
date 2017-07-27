module.exports = {
  patternLab: {
    enabled: true,
    configFile: 'sandbox/pattern-library/config/config.yml',
    twigNamespaces: {
      addToDrupalThemeFile: true,
      sets: [
        {
          namespace: 'bolt',
          paths: ['node_modules/@bolt', 'packages/bolt-ui-toolkit'],
        },
        {
          namespace: 'settings',
          paths: ['sandbox/pattern-library/source/_patterns/00-settings'],
        }, {
          namespace: 'elements',
          paths: ['sandbox/pattern-library/source/_patterns/01-elements'],
        }, {
          namespace: 'objects',
          paths: ['sandbox/pattern-library/source/_patterns/02-objects'],
        }, {
          namespace: 'components',
          paths: ['sandbox/pattern-library/source/_patterns/03-components'],
        }, {
          namespace: 'templates',
          paths: ['sandbox/pattern-library/source/_patterns/04-templates'],
        }, {
          namespace: 'pages',
          paths: ['sandbox/pattern-library/source/_patterns/05-pages'],
        }
      ],
    },
  },
  browserSync: {
    enabled: true,
    serverName: 'bolt-server'
  }
};
// watchedExtensions: [
//   'twig',
//   'json',
//   'yaml',
//   'yml',
//   'md',
//   'jpg',
//   'jpeg',
//   'png',
// ],
// injectFiles: [],
// bowerBasePath: './',

// css: {
//   enabled: false,
//   src: [
//     'scss/**/*.scss',
//     'source/_patterns/**/*.scss',
//     'source/styleguide/*.scss',
//   ],
//   dest: 'dest/',
//   flattenDestOutput: true,
//   lint: {
//     enabled: true,
//     failOnError: true,
//     // in addition to linting `css.src`, this is added.
//     extraSrc: [],
//   },
//   // additional debugging info in comment of the output CSS - only use when necessary
//   sourceComments: false,
//   sourceMapEmbed: false,
//   // tell the compiler whether you want 'expanded' or 'compressed' output code
//   outputStyle: 'expanded',
//   // https://github.com/ai/browserslist#queries
//   autoPrefixerBrowsers: [
//     'last 2 versions',
//     'IE >= 10',
//   ],
//   includePaths: [
//     './node_modules',
//     './bower_components',
//   ],
//   // http://sassdoc.com
//   sassdoc: {
//     enabled: false,
//     dest: 'dest/sassdoc',
//     verbose: false,
//     basePath: 'https://github.com/phase2/pattern-lab-starter/blob/master/source/_patterns',
//     exclude: [],
//     theme: 'default',
//     // http://sassdoc.com/customising-the-view/#sort
//     sort: [
//       'file',
//       'group',
//       'line>',
//     ],
//   },
// },
// js: {
//   enabled: false,
//   src: [
//     'js/**/*.js',
//     'source/_patterns/**/*.js',
//   ],
//   dest: 'dest/',
//   destName: 'script.js',
//   sourceMapEmbed: false,
//   uglify: false,
//   babel: true,
//   // Will bundle all bower JS dependencies (not devDeps)
//   // creates a `bower_components.min.js` file in `js.dest`.
//   bundleBower: false,
//   eslint: {
//     enabled: true,
//     src: [
//       'js/**/*.js',
//       'source/_patterns/**/*.js',
//       '.*.js',
//       '*.js',
//     ],
//   },
// },

// scssToJson: [
//   {
//     src: 'source/_patterns/00-base/05-colors/_color-vars.scss',
//     dest: 'source/_patterns/00-base/05-colors/colors.json',
//     lineStartsWith: '$c-',
//     allowVarValues: false,
//   },
//   {
//     src: 'source/_patterns/00-base/15-typography/fonts/_fonts.scss',
//     dest: 'source/_patterns/00-base/15-typography/fonts/font-sizes.json',
//     lineStartsWith: '$fs--',
//     allowVarValues: false,
//   },
//   {
//     src: 'source/_patterns/00-base/15-typography/fonts/_fonts.scss',
//     dest: 'source/_patterns/00-base/15-typography/fonts/font-families.json',
//     lineStartsWith: '$ff--',
//     allowVarValues: false,
//   },
//   {
//     src: 'source/_patterns/00-base/breakpoints/_breakpoints.scss',
//     dest: 'source/_patterns/00-base/breakpoints/breakpoints.json',
//     lineStartsWith: '$bp--',
//     allowVarValues: false,
//   },
//   {
//     src: 'source/_patterns/00-base/10-spacing/_spacing.scss',
//     dest: 'source/_patterns/00-base/10-spacing/spacing.json',
//     lineStartsWith: '$spacing--',
//     allowVarValues: false,
//   },
//   {
//     src: 'source/_patterns/00-base/animations/01-transitions/_transitions.scss',
//     dest: 'source/_patterns/00-base/animations/01-transitions/transitions.json',
//     lineStartsWith: '$trans-',
//     allowVarValues: true,
//   },
// ],
// https://github.com/nfroidure/gulp-iconfont
// icons: {
//   enabled: false,
//   src: 'images/icons/src/*.svg',
//   dest: 'dest/',
//   fontPathPrefix: '',
//   classNamePrefix: 'icon',
//   autohint: false,
//   normalize: true,
//   templates: {
//     enabled: true,
//     css: {
//       src: 'images/icons/templates/_icons-settings.scss',
//       dest: 'source/_patterns/01-atoms/images/',
//     },
//     demo: {
//       src: 'images/icons/templates/icons.twig',
//       dest: 'source/_patterns/01-atoms/images/',
//     },
//   },
//   formats: [
//     'ttf',
//     'eot',
//     'woff',
//     'svg',
//   ],
// },
// browserSync: {
//   enabled: true,
//   port: 3050,
//   watchFiles: [],
//   // enable when full CMS is set up
//   // domain: 'mysite.dev',
//   baseDir: './',
//   startPath: 'public/',
//   openBrowserAtStart: false,
//   // requires above to be true; allows non-default browser to open
//   browser: [
//     'Google Chrome',
//   ],
//   // Tunnel the Browsersync server through a random Public URL
//   // -> http://randomstring23232.localtunnel.me
//   tunnel: false,
//   reloadDelay: 50,
//   reloadDebounce: 750,
//   rewriteRules: [],
// },
// drupal: {
//   enabled: true,
//   themeFile: 'patternlab.info.yaml',
//   // when these files change
//   watch: [
//     'templates/**',
//     '*.theme',
//   ],
//   // run this command
//   command: 'drush cache-rebuild',
//   // in this directory
//   dir: './',
// },
