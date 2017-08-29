import { events } from '@bolt/build-core';
import merge from 'merge';
import gulp from 'gulp';
import getDevelopmentCertificate from 'devcert-with-localhost';
import defaultConfig from './config.default';

const historyApiFallback = require('connect-history-api-fallback');
const autoClose = require('browser-sync-close-hook');
const browserSync = require('browser-sync');
const connect = require('gulp-connect-php');
const htmlInjector = require('bs-html-injector');

const debug = require('debug')('@bolt/build-server');

function server(userConfig) {
  function serveTask() {
    const config = merge({}, defaultConfig, userConfig, {
      middleware: [
        // historyApiFallback()
      ],
      server: './bolt-website',
      baseDir: ['./bolt-website', 'bolt-website/'],
      notify: false,
      // notify: {
      //   styles: [
      //     'display: none',
      //     'padding: 5px 15px',
      //     'font-family: sans-serif',
      //     'position: fixed',
      //     'font-size: 0.9em',
      //     'z-index: 9999',
      //     'bottom: 0px',
      //     'right: 0px',
      //     'border-top-right-radius: 5px',
      //     'border-top-left-radius: 5px',
      //     'background-color: #1B2032',
      //     'margin: 0',
      //     'color: white',
      //     'text-align: center',
      //   ],
      // },
      // routes: {
      //   '/bower_components': 'bower_components'
      // }
      // serveStatic: [{
      //   route: ['/'],
      //   dir: './bolt-website'
      // }, {
      //   route: ['/schemas'],
      //   dir: './packages/website-pattern-lab/schemas'
      // }, {
      //   route: ['/pattern-lab'],
      //   dir: './bolt-website/pattern-lab'
      // }, {
      //   route: ['/vendor/pattern-builder/pattern-kit/web'],
      //   dir: './packages/website-pattern-lab/schemas/pattern-kit/web'
      // }, {
      //   route: ['/styles'],
      //   dir: './bolt-website/styles'
      // }],
      // proxy: '127.0.0.1:8000',
      // serveStatic: [{
      //   route: ['/patterns'],
      //   dir: './bolt-website/pattern-lab'
      // }]
      // {
      //   route: ['/schemas'],
      //   dir: './packages/website-pattern-lab/schemas'
      // },


    });


    // config.files = config.files.map(pattern => ({
    //   match: pattern,
    //   fn: (event) => {
    //     if (!['add', 'change'].includes(event)) {
    //
    //     }
    //     // browserSync.reload('*.html');
    //   }
    // }));


    // browserSync.use({
    //   plugin() {},
    //   hooks: {
    //     'client:js': autoClose, // <-- important part
    //   },
    // });

    browserSync.create(config.serverName);

    browserSync.use(htmlInjector, {
      files: './bolt-website/**/*.html'
    });
    // const browserSyncReuseTab = require('browser-sync-reuse-tab')(browserSync, 'localhost:3000');

    // if (config.installCert) {
    //   getDevelopmentCertificate(config.certNames, {
    //     installCertutil: config.installCert
    //   }).then((ssl) => {
    //     config.https.key = ssl.keyPath;
    //     config.https.cert = ssl.certPath;
    //
    //     browserSync.init(config);
    //   });
    // } else {


    // connect.server({
    //   base: './packages/website-pattern-lab/schemas'
    // }, () => {
    browserSync.init(config);
    // browserSync({
    //
    // });
    // });

    // gulp.task('connect-sync', () => {


    // gulp.watch('**/*.php').on('change', function () {
    //   browserSync.reload();
    // });
    // });
    // }
  }

  serveTask.displayName = 'browsersync:serve';
  serveTask.description = 'Spin up a local server environment w/ live reloading.';

  return serveTask;
}


/**
  * Reload BrowserSync
  * @param {(string|string[])=} files - File paths to reload
  */
function reloadBrowserSync(files) {
  if (files) {
    browserSync.reload(files);
  }
}

function reloadTask(files) {
  function reload() {
    reloadBrowserSync(files);
  }

  reload.displayName = 'browsersync:reload';
  reload.description = 'Abstraction to reload BrowserSync when something changes';

  return reload;
}

events.on('reload', (files) => {
  console.log('Event triggered: "reload"', files);
  debug('Event triggered: "reload"', files);
  reloadBrowserSync(files);
});


export { server, reloadTask as reload };
