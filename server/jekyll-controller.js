import { ipcMain } from 'electron';
import childProcess from 'child_process';
import browsersync from 'browser-sync';
import sitesStore from './sites-store';
import siteController from './site-controller';
import path from 'path';

var jekyllDist = path.join(require('electron').app.getAppPath(), "jekyll", "jekyll");
var usedPorts = []; // Will fill with active servers' used ports

exports.newServer = function(requester, id, dir) {
  var server = {
    siteID : id,
    localPath: dir,
    reportTo : requester,
    jekyllProcess : undefined,
    browserSyncProcess : browsersync.create(),
    localURL : undefined
  };
  var filePath = path.join(dir, "_site");
  server.browserSyncProcess.init({
    server: filePath,
    files: filePath,
    notify: false,
    ui: false,
    open: false
  }, function(err, bs) {
    server.jekyllProcess = startServer(dir);
    server.localURL = bs.options.getIn(["urls", "local"]);
    siteController.reportRunningServerOnSite(server.reportTo, server.siteID);
  });

  return server;
}

exports.createNewSite = function(requester, dir) {
  var creatorProcess = childProcess.spawn(jekyllDist, ["new", dir]);
  creatorProcess.stdout.on('data',
    function (data) {
      sitesStore.addSite(requester, dir);
    }
  );
  creatorProcess.stderr.on('data',
    function (data) {
      console.log("Creator error: " + data);
    }
  );
}

exports.buildSite = function(sourcePath, buildPath) {
  var buildProcess = childProcess.spawn(jekyllDist, ["build", "--source", sourcePath, "--destination", buildPath]);
  buildProcess.stderr.on('data',
    function (data) {
      console.log("Creator error: " + data);
    }
  );
}

var startServer = function(dir) {
  var destinationDir = path.join(dir, "_site"); // Needed, otherwise Jekyll may try writing to fs root
  var cmdLineArgs = ["build", "--source", dir, "--destination", destinationDir, "--watch"];

  return childProcess.spawn(jekyllDist, cmdLineArgs)
}

exports.stopServer = function(server) {
  for(var i = 0; i < usedPorts.length; i++) {
    if (server.port == usedPorts[i]) usedPorts.splice(i, 1);
  }
  server.browserSyncProcess.exit();
  server.jekyllProcess.kill();
}
