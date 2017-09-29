/* eslint no-unused-vars: ["error", { "args": "none" }] */
const gulp = require('gulp');
const core = require('@bolt/build-core');
const defaultConfig = require('./config.default');
const yaml = require('js-yaml');
const merge = require('merge').recursive;
const gulpConfig = require('../../gulpconfig.js');
const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const glob = require('glob');
const debug = require('gulp-debug');

const patternLabConfig = yaml.safeLoad(
  fs.readFileSync(gulpConfig.patternLab.configFile, 'utf8')
);
const twigNamespaces = gulpConfig.patternLab.twigNamespaces;
const patternLabRoot = path.join(gulpConfig.patternLab.configFile, '../..');
const patternLabSource = path.join(patternLabRoot, patternLabConfig.sourceDir);

const consolePath = path.join(patternLabRoot, 'core/console');
// const patternLabPublic = path.join(patternLabRoot, patternLabConfig.publicDir);


// Build Pattern Lab via CLI command -- can exit or not based on 2nd param passed in
function patternLab(done, errorShouldExit) {
  core.events.emit('pattern-lab:precompile');
  core.notify.sh(`php -d memory_limit=4048M ${consolePath} --generate`, errorShouldExit, (err) => {
    core.events.emit('reload', '**/*.html', true);
    done(err);
  });
}

// Used by watches
function compileWithNoExit(done) {
  patternLab(done, false);
}

function getTwigNamespaceConfig(workingDir) {
  workingDir = workingDir || process.cwd(); // eslint-disable-line no-param-reassign
  const twigNamespaceConfig = {};
  twigNamespaces.sets.forEach((namespaceSet) => {
    const pathArray = namespaceSet.paths.map((pathBase) => {
      const results = globby.sync([path.join(pathBase, '**/*.twig'), '!**/node_modules/**/*']);
      // console.log(results);
      // arr.forEach(object, index, array), function(){
      //   a[i] = myNewVal
      // };
      results.forEach(function (result, index, results) {
        results[index] = path.relative(workingDir, path.dirname(result));
      });

      const uniqEs6 = results.filter((elem, pos, arr) => arr.indexOf(elem) == pos);

      // console.log(uniqEs6);
   
      // results.forEach(function (value, index) {
      //   console.log(value);
        
      // });

      // results.forEach(function (part, index, theArray) {
      //   theArray[index] = "hello world";
      // });
      return uniqEs6;
      
      
      // const results = glob.sync(path.join(pathBase, '**/*.twig')).map((pathItem) => { // eslint-disable-line arrow-body-style
      //   return path.relative(workingDir, path.dirname(pathItem));
      // });
      // results.unshift(path.relative(workingDir, pathBase));
      // console.log(results);
      // return results;


      // const results = glob.sync(path.join(pathBase, '**/*.twig'), {
      //   // cache: resultsCache,
      //   // ignore: 'src/_patterns/01-core/03-generic/generic-normalize/node_modules'
      // }).then((pathItem) => { // eslint-disable-line arrow-body-style
      //   return path.relative(workingDir, path.dirname(pathItem));
      // });
      // 
      // results.unshift(path.relative(workingDir, pathBase));
      // return results;
    });
    twigNamespaceConfig[namespaceSet.namespace] = {
      paths: core.utils.uniqueArray(core.utils.flattenArray(pathArray)),
    };
  });
  return twigNamespaceConfig;
}

function addTwigNamespaceConfigToDrupal(done) {
  if (!twigNamespaces.drupalThemeFile) {
    done();
  } else {
    const twigNamespaceConfig = getTwigNamespaceConfig(
      path.dirname(twigNamespaces.drupalThemeFile)
    );
    const drupalThemeFile = yaml.safeLoad(
      fs.readFileSync(twigNamespaces.drupalThemeFile, 'utf8')
    );
    Object.assign(drupalThemeFile['component-libraries'], twigNamespaceConfig);
    const newThemeFile = yaml.safeDump(drupalThemeFile);
    fs.writeFileSync(twigNamespaces.drupalThemeFile, newThemeFile, 'utf8');
    done();
  }
}

function addTwigNamespaceConfigToPl(done) {
  const twigNamespaceConfig = getTwigNamespaceConfig(patternLabRoot);
  // plConfig = yaml.safeLoad(
  //   fs.readFileSync(config.configFile, 'utf8')
  // );
  if (!patternLabConfig.plugins) {
    Object.assign(patternLabConfig, {
      plugins: {
        twigNamespaces: { enabled: true, namespaces: {} },
      },
    });
  } else if (!patternLabConfig.plugins.twigNamespaces) {
    Object.assign(patternLabConfig.plugins, {
      twigNamespaces: { enabled: true, namespaces: {} },
    });
  } else if (!patternLabConfig.plugins.twigNamespaces.namespaces) {
    patternLabConfig.plugins.twigNamespaces.enabled = true;
    patternLabConfig.plugins.twigNamespaces.namespaces = {};
  }
  patternLabConfig.plugins.twigNamespaces.enabled = true;
  patternLabConfig.twigAutoescape = false;

  Object.assign(patternLabConfig.plugins.twigNamespaces.namespaces, twigNamespaceConfig);

  const newConfigFile = yaml.safeDump(patternLabConfig);


  fs.writeFileSync(gulpConfig.patternLab.configFile, newConfigFile, 'utf8');
  done();
}

core.events.on('pattern-lab:precompile', () => {
  if (patternLabConfig.plugins.twigNamespaces) {
    addTwigNamespaceConfigToPl(() => {
      addTwigNamespaceConfigToDrupal(() => {});
    });
  }
});


// Initial PL build - exits if error
function compilePatternLab() {
  function compilePatternLabTask(done, errorShouldExit) {
    patternLab(done, true);
  }
  compilePatternLabTask.description = 'Compile Pattern Lab -- Exit If Error';
  compilePatternLabTask.displayName = 'patternlab:compile';
  return compilePatternLabTask;
}
module.exports.compile = compilePatternLab;

// Recompile PL -- doesn't exit if error
function recompilePatternLab() {
  function recompilePatternLabTask(done, errorShouldExit) {
    patternLab(done, false);
  }
  recompilePatternLabTask.description = 'Recompile Pattern Lab w/ Error Handling';
  recompilePatternLabTask.displayName = 'patternlab:recompile';
  return recompilePatternLabTask;
}
module.exports.recompile = recompilePatternLab;


// Watch PL for changes
function watchPatternLab(userConfig) {
  const config = merge(defaultConfig, userConfig);

  function watchPatternLabTask() {
    const watchedExtensions = config.watchedExtensions.join(',');
    const patternLabGlob = [
      path.normalize(`${patternLabSource}/**/*.{${watchedExtensions}}`)
    ];
    //   '!**/package.json'
    // ];
    // const patternLabGlob = [
    //   path.normalize(`${patternLabSource}/**/*.{${watchedExtensions}}`),
    //   '!**/package.json'
    // ];
    const watchedSources = config.extraWatches
      ? [].concat(patternLabGlob, config.extraWatches)
      : patternLabGlob;

    gulp.watch(watchedSources, compileWithNoExit);
  }
  watchPatternLabTask.description = 'Watch and rebuild Pattern Lab';
  watchPatternLabTask.displayName = 'patternlab:watch';
  return watchPatternLabTask;
}
module.exports.watch = watchPatternLab;
