import {ipcMain} from 'electron';
import {app} from 'electron';
import sitesStore from './sites-store.js';
import siteController from './site-controller.js';
import Logger from './logger.js';

var reporter = null;
var nextLogs = null;

module.exports.reporter = reporter;

// The best thing for testing packaged apps
module.exports.report = function(message){
  console.log(message);
  if ( reporter ) reporter.send('report', message);
}

module.exports.createCallback = function (channel, callback) {
  ipcMain.on(channel, callback);
}

module.exports.prepareLogs = function(logsToSend) {
  nextLogs = logsToSend;
}

ipcMain.on('getLogs', function(event) {
  if (nextLogs) {
    event.sender.send('setLogs', nextLogs);
    nextLogs = null;
  }
})

ipcMain.on('hello', function(event) {
  reporter = event.sender;
})

ipcMain.on('getSitesList', function(event) {
  sitesStore.sendSitesList(event.sender);
});

ipcMain.on('addSite', function(event) {
  module.exports.addSite(event.sender);
});

ipcMain.on('createSite', function(event) {
  module.exports.createSite(event.sender);
});

ipcMain.on('startServer', function(event, siteId) {
  siteController.startServerOnSite(event.sender, siteId);
});

ipcMain.on('stopServer', function(event, siteId) {
  siteController.stopServerOnSite(event.sender, siteId);
});

ipcMain.on('removeSiteFromList', function(event, siteId) {
  siteController.removeSite(event.sender, siteId);
});

ipcMain.on('buildSite', function(event, siteId) {
  siteController.buildSite(event.sender, siteId);
});

ipcMain.on('openServerLogs', function(event, siteId) {
  siteController.openLogs(event.sender, siteId);
});

ipcMain.on('hint', function(event, hintText) {
  event.sender.send('hint', hintText); // I dub this the lol roundtrip
});

ipcMain.on('endHint', function(event) {
  event.sender.send('endHint');
});

module.exports.handleWillQuit = function() {
  sitesStore.sendSitesList(reporter);
  sitesStore.stopAllServers();
}

module.exports.createSite = function(sender) {
  if (sender || reporter) {
    sender = sender ? sender : reporter;
    sitesStore.createSite(sender);
  }
}

module.exports.addSite = function(sender) {
  if (sender || reporter) {
    sender = sender ? sender : reporter;
    sitesStore.addSite(sender);
  }
}
