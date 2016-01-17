import { ipcMain } from 'electron';
import childProcess from 'child_process';
import sitesStore from './sites-store.js';
import siteController from './site-controller.js';
import path from 'path';

var jekyllDist = require('electron').app.getAppPath() + '/jekyll/jekyll';
var usedPorts = []; // Will fill with active servers' used ports

exports.newServer = function(requester, id, path) {
  var port = firstAvailablePort();
  var server = {
    siteID : id,
    reportTo : requester,
    process : (startServer(path, port)),
    port : port,
    localURL : undefined
  };

  server.process.stdout.on('data',
    function (data) {
      serverUpdate(server, data);
    }
  );

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
      // Unused
    }
  },
  {
    str: "Source: ",
    handler: function (server, data) {
      // Unused
    }
  },
  {
    str: "running...",
    handler: function (server, data) {
      siteController.reportRunningServerOnSite(server.reportTo, server.siteID);
    }
  },
  {
    str: "done in ",
    handler: function (server, data) {
      // Unused
      // var duration = data.match("(?:\d*\.)?\d+");
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
      var url = data.match("(http.*/)");
      server.localURL = url[url.length-1];
      sitesStore.sendSitesList(server.reportTo);
    }
  }
];

var startServer = function(dir, port) {
  // dir = dir.replace(/ /g, "\\ ");
  var destinationDir = path.join(dir, "_site"); // Needed, otherwise Jekyll servers may try writing to fs root
  var cmdLineArgs = ["serve", "--source", dir, "--destination", destinationDir, "--port", port];

  var serverProcess = childProcess.spawn(jekyllDist, cmdLineArgs);

  return serverProcess;
}

var serverUpdate = function(server, data) {
  data = data.toString();
  for (var i = 0; i < updateHandlers.length; i++) {
    if (data.search(updateHandlers[i].str) != -1) {
      updateHandlers[i].handler(server, data);
     }
  }
  console.log("no match: " + data);
}

var firstAvailablePort = function () {
  var port = 4000;

  for(var i = 0; i < usedPorts.length; i++) {
    if (port == usedPorts[i]) port++;
  }

  usedPorts.push(port);

  return port;
}

exports.stopServer = function(server) {
  for(var i = 0; i < usedPorts.length; i++) {
    if (server.port == usedPorts[i]) usedPorts.splice(i, 1);
  }

  server.process.kill();
}
