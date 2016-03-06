import Dispatcher from './dispatcher';
import siteController from './site-controller';
import Windows from './windows';

let Logger = function () {
  var newLogger = {
    logs: [],
    window: null,
    addLog: function (logData, logType) {
      logType = logType || "std";
      logData = logData.toString();

      if (logData.match(/error/i)) { logType = "err" }
      if (logData.search("done\ in ") != -1) { logType = "success" } // Not very reliable, but helps some
      // newLogEntry is a string?
      this.logs.push({
        time: new Date().valueOf(),
        log: logData.replace(/(\[\d+m)/g, '').trim(),
        type: logType
      });
      if (this.window != null) { this.sendLogs() };
    },
    setup: function (server) {
      server.jekyllProcess.stdout.on('data',
        function (data) {
          serverUpdate(server, data);
          server.logger.addLog(data);
        }
      )

      server.jekyllProcess.stderr.on('data',
        function (data) {
          server.logger.addLog(data, "err");
        }
      )

      server.jekyllProcess.on('close',
        function (data) {
          // ssssh
        }
      )
    },
    openLogsWindow: function() {
      if ( this.window ) {
        this.window.show();
      } else {
        this.window = Windows.initLogs();
        this.window.on('did-start-loading', function() {
          Dispatcher.prepareLogs(this.logs);
        })
        Dispatcher.prepareLogs(this.logs);
      }
    },
    sendLogs: function () {
      this.window.webContents.send('setLogs', this.logs);
    },
    closeLogsWindow: function () {
      if (this.window) { this.window.close(); }
    }
  }
  return newLogger;
};

var serverUpdate = function(server, data) {
  var matched = false;
  data = data.toString();
  for (var i = 0; i < updateHandlers.length; i++) {
    if (data.search(updateHandlers[i].str) != -1) {
      matched = true;
      updateHandlers[i].handler(server, data);
     }
  }
  if (matched == false) { console.log("no match: " + data) };
};

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

module.exports = Logger;
