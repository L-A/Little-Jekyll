'use strict';

// Installs the appropriate Traveling Jekyll version in __dirname/jekyll

const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const argv = require('minimist')(process.argv.slice(2));

const platform = argv.plat || process.platform;
const arch = argv.arch || process.arch;

const releases_URL = "http://github.com/L-A/Traveling-Jekyll/releases/download/";
const release_prefix = "/traveling-jekyll-";
const release_suffix = ".tar.gz";
const TJ_version = "v3.1.2a";
const cache_location = ".install_cache"

const releases = {
  "darwin" : {
    "x64" : "osx"
  },
  "linux" : {
    "ia32" : "linux-x86",
    "x64" : "linux-x86_64"
  }
}

const fileName = release_prefix + TJ_version + "-" + platformFor(platform, arch) + release_suffix;
const localFile = require('path').join(__dirname, cache_location, fileName);

function downloadLJRelease(platform, arch, dest) {
  var fileURL = releaseURL(platformFor(platform, arch));

  fs.access(localFile, fs.F_OK, function(err) {
    if (!err) {
      console.log(dest + " archive is already there. Delete it to download a new version.");
      extract(dest);
    } else {
      console.log("Downloading from " + fileURL + " ...");
      download(fileURL, localFile, function() {extract(dest)});
    }
  });

}

function platformFor(platform, arch) {
  var correspondance = releases[platform][arch];
  console.log(correspondance);
  return correspondance || false;
}

function releaseURL(plat) {
  if(platformFor(platform, arch)) {
    return releases_URL + TJ_version + fileName;
  } else {
    return false;
  }
}

function download(url, dest, cb) {
  fs.mkdir(require('path').join(__dirname, cache_location));
  require('request')(url, cb).pipe(fs.createWriteStream(dest));
}

function extract(dest) {
  console.log("Extracting " + localFile);
  var extractor = require('tar').Extract({
    path: require('path').join(__dirname, 'jekyll'),
    strip: 1
  });
  extractor.on('error', function(err) {
    console.log('Error: ' + err);
  });
  extractor.on('end', function(e) {
    console.log("Extracted!");
  });
  fs.createReadStream(localFile)
  .on('error', function(err) {
    console.log('Error: ' + err);
  })
  .pipe(zlib.createGunzip())
  .pipe(extractor);
}

function moveToParent() {

}

downloadLJRelease(platform, arch, fileName);
