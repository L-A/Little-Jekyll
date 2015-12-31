import { ipc } from 'ipc';
import childProcess from 'child_process';
import sitesStore from './sites-store.js';
import siteController from './site-controller.js';
import dialog from 'dialog';

import {getPath} from 'consistent-path'

exports.newServer = function(requester, id, path) {
  var server = {
    siteID : id,
    reportTo : requester,
    process : (startServer(path)),
    localURL : undefined
  };

  server.process.stdout.on('data',
    function (data) {
      serverUpdate(server, data);
    }
  );

  return server;
}

exports.createNewSite = function(requester, path) {
  var creatorProcess = childProcess.spawn(process.env.SHELL, ["-c", "cd '" + path + "' && jekyll new ."]);

  creatorProcess.stdout.on('data',
    function (data) {
      sitesStore.addSite(requester, path);
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
    }
  }
];

var startServer = function(path) {
  var serverProcess = childProcess.spawn(process.env.SHELL, ["-c", "cd '" + path + "' && jekyll serve"]);

  return serverProcess;
}

var serverUpdate = function(server, data) {
  data = data.toString();
  for (var i = 0; i < updateHandlers.length; i++) {
    if (data.search(updateHandlers[i].str) != -1) {
      updateHandlers[i].handler(server, data);
     return;
     }
  }
  console.log("no match: " + data);
}

exports.stopServer = function(server) {
  server.process.kill();
}

console.log(process.env.PATH);
