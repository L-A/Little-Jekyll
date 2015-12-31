import ipc from 'ipc';
import sitesStore from './sites-store.js';
import siteController from './site-controller.js';

ipc.on('getSitesList', function(event) {
  sitesStore.sendSitesList(event.sender);
});

ipc.on('addSite', function(event) {
  sitesStore.addSite(event.sender);
});

ipc.on('createSite', function(event) {
  sitesStore.createSite(event.sender);
});

ipc.on('startServer', function(event, siteId) {
  siteController.startServerOnSite(event.sender, siteId);
});

ipc.on('stopServer', function(event, siteId) {
  siteController.stopServerOnSite(event.sender, siteId);
});

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
