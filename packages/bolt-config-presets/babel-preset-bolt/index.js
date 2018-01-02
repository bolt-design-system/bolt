const preset = function (api, opts = {}) {
  return {
    presets: [
      '@babel/preset-stage-3',
      ['@babel/preset-env', {
        targets: {
          node: 'current',
          browsers: [
            'last 3 versions',
            'not ie < 9'
          ]
        },
        modules: false,
        debug: false
      }]
    ],
    plugins: [
      '@babel/plugin-syntax-decorators', // ex. @define
      '@babel/plugin-proposal-decorators',

      // critical for preact rendering
      [
        '@babel/plugin-transform-react-jsx',
        {
          pragma: 'h',
          pragmaFrag: '\"span\"',
          throwIfNamespace: false,
          useBuiltIns: false
        }
      ],

      // required for preact + SVG icons to work
      [
        'jsx-pragmatic',
        {
          module: 'preact',
          export: 'h',
          import: 'h'
        }
      ],


      [
        '@babel/plugin-proposal-class-properties',
        { loose: false }
      ],

      // @TODO: only include this when being run on a NODE environment
      // [
      //   require.resolve('babel-plugin-transform-es2015-modules-commonjs'),
      //   { loose: true }
      // ],

      // @TODO: only include this when being run on a NODE environment
      // [
      //   'transform-es2015-modules-commonjs',
      //   { loose: true }
      // ],

      // @TODO: only include this when being run on a NODE environment
      // 'dynamic-import-node'
    ]
  };
};

// @TODO: refactor -- block below is the general approach I've seen other babel presets take to conditionally
// include plugins in certain environments

// if (process.env.NODE_ENV === 'ssr') {
//   preset.plugins.push.apply(preset.plugins, [
//     require.resolve('babel-plugin-dynamic-import-node'),
//     // We always include this plugin regardless of environment
//     // because of a Babel bug that breaks object rest/spread without it:
//     // https://github.com/babel/babel/issues/4851
//     // require.resolve('babel-plugin-transform-es2015-parameters'),
//     // // Jest needs this to work properly with import/export syntax
//     // [
//     //   require.resolve('babel-plugin-transform-es2015-modules-commonjs'),
//     //   { loose: true }
//     // ]
//   ]);
// }

module.exports = preset;
