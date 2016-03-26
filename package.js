/* eslint strict: 0, no-shadow: 0, no-unused-vars: 0, no-console: 0 */
'use strict';

const os = require('os');
const webpack = require('webpack');
const cfg = require('./webpack.config.production.js');
const packager = require('electron-packager');
const del = require('del');
const exec = require('child_process').exec;
const TJ = require('./install.js');
const execFileSync = require('child_process').execFileSync;
const argv = require('minimist')(process.argv.slice(2));
const pkg = require('./package.json');
const devDeps = Object.keys(pkg.devDependencies);

const appName = argv.name || argv.n || pkg.productName;
const shouldUseAsar = argv.asar || argv.a || false;
const shouldBuildAll = argv.all || false;

const DEFAULT_OPTS = {
  'app-version': pkg.version || null,
  dir: './',
  name: appName,
  asar: shouldUseAsar,
  overwrite: true,
  ignore: [
    '/test($|/)',
    '/release($|/)',
    '/.install_cache($|/)'
  ].concat(devDeps.map(name => `/node_modules/${name}($|/)`))
};

const icon = argv.icon || argv.i || 'app/app.icns';

if (icon) {
  DEFAULT_OPTS.icon = icon;
}

const version = argv.version || argv.v;

if (version) {
  DEFAULT_OPTS.version = version;
  startPack();
} else {
  // use the same version as the currently-installed electron-prebuilt
  exec('npm list electron-prebuilt', (err, stdout) => {
    if (err) {
      DEFAULT_OPTS.version = '0.37.2';
    } else {
      DEFAULT_OPTS.version = stdout.split('electron-prebuilt@')[1].replace(/\s/g, '');
    }
    startPack();
  });
}

function startPack() {
  console.log('start pack...');
  webpack(cfg, (err, stats) => {
    if (err) return console.error(err);
    del('release')
    .then(paths => {
      if (shouldBuildAll) {
        // build for all platforms
        const platforms = ['linux', 'win32', 'darwin'];
        const archs = ['ia32', 'x64'];

        // Installs Traveling Jekyll versions between each pack(),
        // to pick the proper native components

        function packSeries(plat, arch) {
          if (plat >= platforms.length) { return; }
          else {
            if (arch >= archs.length) { packSeries (plat+1, 0) }
            else {
              pack(platforms[plat], archs[arch], function() {
                log(plat, arch);
                packSeries (plat, arch+1);
              });
            }
          }
        }
        packSeries(0,0);

      } else {
        // build for current platform only
        pack(os.platform(), os.arch(), log(os.platform(), os.arch()));
      }
    })
    .catch(err => {
      console.error(err);
    });
  });
}

function pack(plat, arch, cb) {
  if ((plat === 'darwin' && arch === 'ia32') || plat === 'win32') {
    console.log("Skipping build: " + plat + " " + arch );
    cb();
    return;
  }; // darwin 32 doesn't exist, and Windows support is planned if possible

  const opts = Object.assign({}, DEFAULT_OPTS, {
    platform: plat,
    arch,
    prune: true,
    out: `release/${plat}-${arch}`
  });

  TJ.installForTarget( plat, arch,
    function() { packager(opts, cb) }
  );

}

function log(plat, arch) {
  return (err, filepath) => {
    if (err) return console.error(err);
    console.log(`${plat}-${arch} finished!`);
  };
}
