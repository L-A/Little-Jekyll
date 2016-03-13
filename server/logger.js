import Dispatcher from './dispatcher';
import siteController from './site-controller';
import Windows from './windows';

let Logger = function () {
  var newLogger = {
    logs: [],
    window: null,
    addLog: function (server, logData, logType) {

      logData = logData.toString().replace(/(\[\d+m)/g, '').trim();

      var logEntry = {
        logType: logType || "std",
        logData: logData,
        time: new Date().valueOf()
      }

      if (logEntry.logData.search("done\ in ") != -1) { logEntry.logType = "success" }

      if (logEntry.logType === "err") { siteController.reportErrorOnSite(server.reportTo, server.siteID); }

      serverUpdate(server, logEntry);

      this.logs.push(logEntry);
      if (this.window != null) { this.sendLogs() };

    },
    setup: function (server) {
      server.jekyllProcess.stdout.on('data',
        function (data) {
          server.logger.addLog(server, data);
        }
      )

      server.jekyllProcess.stderr.on('data',
        function (data) {
          server.logger.addLog(server, data, "err");
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
      this.window = null;
    }
  }
  return newLogger;
};

var serverUpdate = function(server, logEntry) {
  var matched = false;
  var data = logEntry.logData;
  for (var i = 0; i < updateHandlers.length; i++) {
    if (data.search(updateHandlers[i].str) != -1) {
      matched = true;
      updateHandlers[i].handler(server, logEntry);
     }
  }
  if (matched == false) { console.log("no match: " + data) };
};

var updateHandlers = [
  {
    str: "Configuration file:",
    handler: function (server,  logEntry) {
      // Unused, maybe check if _config.yml is always under site root
      // var path = data.match("(/.*\.yml)");
    }
  },
  {
    str: "Generating...",
    handler: function (server, logEntry) {
      siteController.reportWorkingServerOnSite(server.reportTo, server.siteID);
    }
  },
  {
    str: "Regenerating:",
    handler: function (server, logEntry) {
      siteController.reportWorkingServerOnSite(server.reportTo, server.siteID);
    }
  },
  {
    str: "Source: ",
    handler: function (server, logEntry) {
      // Unused
    }
  },
  {
    str: "done\ in ",
    handler: function (server, logEntry) {
      // Unused
      // var duration = data.match(/\d+\.?\d*/g);
      siteController.reportSuccessOnSite(server.reportTo, server.siteID);
      siteController.reportAvailableServerOnSite(server.reportTo, server.siteID);
    }
  },
  {
    str: "Auto-regeneration:",
    handler: function (server, logEntry) {
      // Unused
      // var autoregen = ( data.match("(enabled)") >= 0 );
    }
  },
  {
    str: "Server address:",
    handler: function (server, logEntry) {
      // Unused yo
    }
  }
];

module.exports = Logger;
