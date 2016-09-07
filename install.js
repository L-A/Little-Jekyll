'use strict';

// Installs the appropriate Traveling Jekyll version in __dirname/jekyll

const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const Path = require('path');
const Request = require('request');
const rimraf = require('rimraf');

const argv = require('minimist')(process.argv.slice(2));

const releases_URL = "https://github.com/L-A/Traveling-Jekyll/releases/download/";
const release_prefix = "/traveling-jekyll-";
const release_suffix = ".tar.gz";
const TJ_version = "v3.1.2b";
const cache_location = Path.join(__dirname, ".install_cache");

const releases = {
  "darwin" : {
    "x64" : "osx"
  },
  "linux" : {
    "ia32" : "linux-x86",
    "x64" : "linux-x86_64"
  }
}

function downloadLJRelease(platform, arch, cb) {
  cb = cb || null;
  var fileURL = releaseURL(platform, arch);
  var localFile = localFilePath(platform, arch);

  var extractDownloadedArchive = function() {
    extract(platform, arch, cb);
  }

  fs.access(localFile, fs.F_OK, function(err) {
    if (!err) {
      console.log("Traveling Jekyll archive found. Delete it (in '/.install-cache') to download a new version instead. ");
      extractDownloadedArchive();
    } else {
      console.log("Downloading " + fileURL);
      download(fileURL, localFile, extractDownloadedArchive);
    }
  });
}

function download(url, dest, cb) {
  mkdirSync(cache_location);
  Request(url, cb)
  .pipe(fs.createWriteStream(dest));
}

function extract(platform, arch, cb) {
  var localFile = localFilePath(platform, arch);
  var jekyllPath = Path.join(__dirname, 'jekyll');
  rmdirSync(jekyllPath);

  var extractor = require('tar').Extract({
    path: jekyllPath,
    strip: 1
  });
  extractor.on('error', function(err) {
    console.log('Error: ' + err);
  });
  extractor.on('end', function() {
    console.log("Traveling Jekyll for " + platform + " " + arch + " installed")
    if(cb) { cb() };
  });
  fs.createReadStream(localFile)
  .on('error', function(err) {
    console.log('Error: ' + err);
  })
  .pipe(zlib.createGunzip())
  .pipe(extractor);

  console.log("Extracting... ");
}

function mkdirSync (path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
  }
}

function rmdirSync (path) {
  try {
    rimraf.sync(path);
  } catch(e) {
    if ( e.code != 'ENOENT' ) throw e;
  }
}

function platformFor(platform, arch) {
  return releases[platform][arch];
}

function fileName(platform, arch) {
  return release_prefix + TJ_version + "-" + platformFor(platform, arch) + release_suffix;
}

function localFilePath(platform, arch) {
  return Path.join(cache_location, fileName(platform, arch));
}

function releaseURL(platform, arch) {
  return releases_URL + TJ_version + fileName(platform, arch);
}

module.exports.installForTarget = function(platform, arch, cb){
  downloadLJRelease(platform, arch, cb);
}

if(require.main === module) {
  var platform = argv.plat || process.platform;
  var arch = argv.arch || process.arch;
  downloadLJRelease(platform, arch);
}
