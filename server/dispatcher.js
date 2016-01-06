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

exports.report = function(message){
  if ( reporter ) reporter.send('report', message);
}

exports.reporter = reporter;

exports.handleWillQuit = function() {
  sitesStore.sendSitesList(reporter);
  sitesStore.stopAllServers();
}

/*
  Draft:
  Depuis le client
  - Get sites list → updateSitesList(array)
  - Add site → updateSitesList(array)
  - Remove site → updateSitesList(array)

  - Start server → updateSite(site ID, {site properties})
  - Stop server (site ID) → updateSite(site ID, {site properties})

  Depuis le serveur
  - updateSite(site ID, {site properties})
*/
