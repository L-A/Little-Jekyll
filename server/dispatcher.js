import {ipcMain} from 'electron';
import sitesStore from './sites-store.js';
import siteController from './site-controller.js';
var reporter = null;

ipcMain.on('hello', function(event) {
  reporter = event.sender;
})

ipcMain.on('getSitesList', function(event) {
  sitesStore.sendSitesList(event.sender);
});

ipcMain.on('addSite', function(event) {
  sitesStore.addSite(event.sender);
});

ipcMain.on('createSite', function(event) {
  sitesStore.createSite(event.sender);
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

exports.report = function(message){
  if ( reporter ) reporter.send('report', message);
}

exports.reporter = reporter;

exports.handleWillQuit = function() {
  sitesStore.sendSitesList(reporter);
  sitesStore.stopAllServers();
}
