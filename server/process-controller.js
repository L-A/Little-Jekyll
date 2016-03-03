import { ipcMain } from 'electron';
import childProcess from 'child_process';
import sitesStore from './sites-store';
import siteController from './site-controller';
import browsersync from 'browser-sync';
import Dispatcher from './dispatcher';
import Logger from './logger';
import path from 'path';

var jekyllDist = path.join(require('electron').app.getAppPath(), "jekyll", "jekyll");
var usedPorts = []; // Will fill with active servers' used ports (BrowserSync has trouble with two simultaneous inits)

module.exports.newServer = function(requester, id, dir) {
  var server = {
    siteID: id,
    localPath: dir,
    reportTo: requester,
    jekyllProcess: undefined,
    browserSyncProcess: browsersync.create(),
    logger: Logger(),
    localURL: undefined,
    port: firstAvailablePort()
  };

  var filePath = path.join(dir, "_site");
  server.browserSyncProcess.init({
    server: filePath,
    files: filePath,
    port: server.port,
    notify: false,
    ui: false,
    logLevel: "silent", // I trust you BrowserSync
    open: false
  }, function(err, bs) {
    server.jekyllProcess = startServer(dir);
    server.localURL = bs.options.getIn(["urls", "local"]);
    siteController.reportRunningServerOnSite(server.reportTo, server.siteID);
    server.logger.setup(server);
  });

  return server;
}

module.exports.createNewSite = function(requester, dir) {
  var creatorProcess = childProcess.spawn(jekyllDist, ["new", dir]);
  creatorProcess.stdout.on('data',
    function (data) {
      sitesStore.addSite(requester, dir);
    }
  );
  creatorProcess.stderr.on('data',
    function (data) {
      Dispatcher.report("Creator error: " + data);
    }
  );
}

module.exports.buildSite = function(sourcePath, buildPath) {
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

module.exports.stopServer = function(server) {
  for(var i = 0; i < usedPorts.length; i++) {
    if (server.port == usedPorts[i]) usedPorts.splice(i, 1);
  }
  server.browserSyncProcess.exit();
  server.jekyllProcess.kill();
}

// There's probably some better organization to do here

var updateHandlers = [
  {
    str: "Configuration file:",
    handler: function (server, data) {
      // Unused, maybe check if _config.yml is always under site root
      // var path = data.match("(/.*\.yml)");
    }
  },
  {
    str: "Generating...",
    handler: function (server, data) {
      siteController.reportWorkingServerOnSite(server.reportTo, server.siteID);
    }
  },
  {
    str: "Regenerating:",
    handler: function (server, data) {
      siteController.reportWorkingServerOnSite(server.reportTo, server.siteID);
    }
  },
  {
    str: "Source: ",
    handler: function (server, data) {
      // Unused
    }
  },
  {
    str: "done\ in ",
    handler: function (server, data) {
      // Unused
      // var duration = data.match(/\d+\.?\d*/g);
      siteController.reportAvailableServerOnSite(server.reportTo, server.siteID);
    }
  },
  {
    str: "Auto-regeneration:",
    handler: function (server, data) {
      // Unused
      // var autoregen = ( data.match("(enabled)") >= 0 );
    }
  },
  {
    str: "Server address:",
    handler: function (server, data) {
      // Unused yo
    }
  }
];



var firstAvailablePort = function () {
  var port = 4000;

  for(var i = 0; i < usedPorts.length; i++) {
    if (port == usedPorts[i]) port++;
  }

  usedPorts.push(port);

  return port;
}
