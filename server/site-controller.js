var sitesStore = require('./sites-store.js');
var jekyllController = require('./jekyll-controller.js');

this.startServerOnSite = function(sender, siteID) {
  var site = sitesStore.siteById(siteID);
  var newServer = jekyllController.newServer(sender, site.id, site.filePath);

  sitesStore.setSiteProperty(siteID, 'serverRequested', true);
  sitesStore.setSiteProperty(siteID, 'server', newServer);

  sitesStore.sendSitesList(sender);
}

this.reportRunningServerOnSite = function(sender, siteID) {
  sitesStore.setSiteProperty(siteID, 'serverRequested', false);
  sitesStore.setSiteProperty(siteID, 'serverActive', true);

  sitesStore.sendSitesList(sender);
}

this.stopServerOnSite = function(sender, siteID) {
  var server = sitesStore.siteById(siteID).server;

  jekyllController.stopServer(server);

  sitesStore.setSiteProperty(siteID, 'serverActive', false);
  sitesStore.setSiteProperty(siteID, 'server', undefined);

  sitesStore.sendSitesList(sender);
}
