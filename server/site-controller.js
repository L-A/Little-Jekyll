import sitesStore from './sites-store.js';
import jekyllController from './jekyll-controller.js';

exports.startServerOnSite = function(sender, siteID) {
  var site = sitesStore.siteById(siteID);
  var newServer = jekyllController.newServer(sender, site.id, site.filePath);

  sitesStore.setSiteProperty(siteID, 'serverRequested', true);
  sitesStore.setSiteProperty(siteID, 'server', newServer);

  sitesStore.sendSitesList(sender);
}

exports.reportRunningServerOnSite = function(sender, siteID) {
  sitesStore.setSiteProperty(siteID, 'serverRequested', false);
  sitesStore.setSiteProperty(siteID, 'serverActive', true);

  sitesStore.sendSitesList(sender);
}

exports.stopServerOnSite = function(sender, siteID) {
  var server = sitesStore.siteById(siteID).server;

  if (server) {
    jekyllController.stopServer(server);
    sitesStore.setSiteProperty(siteID, 'serverActive', false);
    sitesStore.setSiteProperty(siteID, 'server', undefined);
  }

  sitesStore.sendSitesList(sender);
}
