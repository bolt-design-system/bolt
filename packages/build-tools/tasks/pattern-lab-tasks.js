const chalk = require('chalk');
const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const chokidar = require('chokidar');
const del = require('del');
const debounce = require('lodash.debounce');
const Ora = require('ora');
const log = require('../utils/log');
const { getConfig } = require('../utils/config-store');
const events = require('../utils/events');
const sh = require('../utils/sh');
const { readYamlFileSync } = require('../utils/yaml');
const manifest = require('../utils/manifest');
const timer = require('../utils/timer');
const { fileExists, dirExists } = require('../utils/general');

let plSource, plPublic, consolePath;
let config;
let initialBuild = true;

async function asyncConfig() {
  if (config) {
    return config;
  } else {
    config = Object.assign(
      {
        plConfigFile: 'config/config.yml',
        watchedExtensions: ['twig', 'json', 'yaml', 'yml', 'md'],
        debounceRate: 1000,
      },
      await getConfig(),
    );

    const plConfig = readYamlFileSync(config.plConfigFile);
    const plRoot = path.join(config.plConfigFile, '../..');
    plSource = path.join(plRoot, plConfig.sourceDir);
    plPublic = path.join(plRoot, plConfig.publicDir);
    consolePath = path.join(plRoot, 'core/console.php');

    return config;
  }
}

async function compile(errorShouldExit, dataOnly = false) {
  config = config || (await asyncConfig());

  const plTaskName = dataOnly ? 'Pattern Lab Data' : 'Pattern Lab';

  return new Promise(async (resolve, reject) => {
    const startCompilingPlMsg = `Building ${plTaskName} for the first time...`;
    const startRecompilingPlMsg = `Recompiling ${plTaskName}...`;

    const failedCompilingPlMsg = `The initial ${plTaskName} compile failed!`;
    const failedRecompilingPlMsg = `Failed to recompile ${plTaskName}!`;

    const endCompilingPlMsg = function(startTime) {
      return `Compiled ${plTaskName} in ${chalk.bold(timer.end(startTime))}`;
    };

    const endRecompilingPlMsg = function(startTime) {
      return `${plTaskName} ${
        initialBuild ? 'compiled' : 'recompiled'
      } in ${chalk.bold(timer.end(startTime))}`;
    };

    const plSpinner = new Ora(
      chalk.blue(initialBuild ? startCompilingPlMsg : startRecompilingPlMsg),
    ).start();
    const startTime = timer.start();

    sh(
      'php',
      [
        '-d',
        'memory_limit=4048M',
        consolePath,
        '--generate',
        dataOnly ? '--dataonly' : '',
      ],
      errorShouldExit,
      false,
    )
      .then(output => {
        plSpinner.succeed(
          chalk.green(
            initialBuild
              ? endCompilingPlMsg(startTime)
              : endRecompilingPlMsg(startTime),
          ),
        );

        if (!dataOnly) {
          initialBuild = false;
        }

        if (config.verbosity > 2) {
          console.log('---');
          console.log(output);
          console.log('===\n');
        }

        if (dataOnly) {
          events.emit('build-tasks/pattern-lab:compiled-data');
        } else {
          events.emit('build-tasks/pattern-lab:compiled');
        }
        // events.emit('reload');

        resolve(output);
      })
      .catch(error => {
        plSpinner.fail(
          chalk.red(
            initialBuild ? failedCompilingPlMsg : failedRecompilingPlMsg,
          ),
        );

        if (!dataOnly) {
          initialBuild = false;
        }

        console.log(error);
        reject(error);
      });
  });
}

async function precompile() {
  config = config || (await asyncConfig());

  return new Promise(async (resolve, reject) => {
    const jsFolderExists = await dirExists(
      path.join(process.cwd(), config.wwwDir, 'pattern-lab/styleguide/js/'),
    );

    const scssFolderExists = await dirExists(
      path.join(process.cwd(), config.wwwDir, 'pattern-lab/styleguide/css/'),
    );

    const indexHtmlExists = await fileExists(
      path.join(process.cwd(), config.wwwDir, 'pattern-lab/index.html'),
    );

    const isPatternLabAlreadyCompiled =
      jsFolderExists && scssFolderExists && indexHtmlExists;

    await compile(true)
      .then(output => {
        // check if pattern lab's UIKIt assets exist -- automatically regenerate if the required assets are missing.
        if (!isPatternLabAlreadyCompiled || config.prod === true) {
          chalk.yellow(
            '⚠️ Uh-oh. Pattern Labs UIKit is missing... Regenerating!',
          );
          sh(
            'yarn',
            [
              '--cwd',
              path.join(process.cwd(), '../packages/uikit-workshop'),
              'run',
              'build',
            ],
            false,
            true,
          ).then(output => {
            // console.log(output);
            resolve();
          });
        } else {
          resolve();
        }
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

compile.description = 'Compile Pattern Lab';
compile.displayName = 'pattern-lab:compile';

async function compileWithNoExit() {
  await compile(true);
}

compileWithNoExit.displayName = 'pattern-lab:compile';

async function watch() {
  config = config || (await asyncConfig());
  const dirs = await manifest.getAllDirs();

  // Used by watches
  const debouncedCompile = debounce(compileWithNoExit, config.debounceRate);

  const globPattern = `**/*.{${config.watchedExtensions.join(',')}}`;
  const watchedFiles = [
    dirs.map(dir => path.join(dir, globPattern)),
    path.join(plSource, globPattern),
    path.join(config.dataDir, '**/*'),
    `!${path.join(config.dataDir, 'sassdoc.bolt.json')}`,
  ];

  // listen for api prep work to complete before re-generating PL
  events.on('api-tasks/status-board:generated', async () => {
    await compileWithNoExit();
  });

  // @todo show this when spinners are disabled at this high of verbosity
  // if (config.verbosity > 4) {
  //   log.info('Pattern Lab is Watching:');
  //   console.log(watchedFiles);
  // }

  // The watch event ~ same engine gulp uses https://www.npmjs.com/package/chokidar
  const watcher = chokidar.watch(watchedFiles, {
    ignoreInitial: true,
    cwd: process.cwd(),
    ignored: ['**/node_modules/**', '**/vendor/**'],
  });

  // list of all events: https://www.npmjs.com/package/chokidar#methods--events
  watcher.on('all', (event, path) => {
    if (config.verbosity > 3) {
      console.log('Pattern Lab watch event: ', event, path);
    }
    debouncedCompile();
  });
}

watch.description = 'Watch and rebuild Pattern Lab';
watch.displayName = 'pattern-lab:watch';

module.exports = {
  compile,
  precompile,
  watch,
};
