const core = require('../core');
const merge = require('merge').recursive;
const defaultConfig = require('./config.default');
const browserSync = require('browser-sync');
const htmlInjector = require('bs-html-injector');
const debug = require('debug')('@bolt/build-server');

function server(userConfig) {
  function serveTask() {
    const config = merge({}, defaultConfig, userConfig, {
      server: './apps/pattern-lab--workshop/dist',
      notify: false,
      snippetOptions: {
        // Ignore all HTML files within the templates folder
        blacklist: ['./dist/pattern-lab/index.html', './dist/pattern-lab/']
      }
      // files: './dist/**/*.html'
    });

    browserSync.create(config.serverName);
    // browserSync.use(htmlInjector, {
    //   files: './dist/**/*.html',
    //   snippetOptions: {
    //     // Ignore all HTML files within the templates folder
    //     blacklist: ['./dist/pattern-lab/index.html', './dist/pattern-lab/']
    //   }
    // });
    browserSync.init(config);
  }

  serveTask.displayName = 'browsersync:serve';
  serveTask.description = 'Spin up a local server environment w/ live reloading.';

  return serveTask;
}
module.exports.server = server;


/**
  * Reload BrowserSync
  * @param {(string|string[])=} files - File paths to reload
  */
function reloadBrowserSync(files, stream) {
  if (files && stream === true) {
    browserSync.reload(files, { stream: true });
  } else if (files) {
    browserSync.reload(files);
  } else if (stream === true) {
    browserSync.reload({ stream: true });
  }
}


function reloadTask(files, stream) {
  function reload() {
    reloadBrowserSync(files, stream);
  }
  reload.displayName = 'browsersync:reload';
  reload.description = 'Abstraction to reload BrowserSync when something changes';
  return reload;
}

core.events.on('reload', (files, stream) => {
  reloadBrowserSync(files, stream);
});

module.exports.reload = reloadTask;
