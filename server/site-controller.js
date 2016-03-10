import sitesStore from './sites-store.js';
import processController from './process-controller.js';

module.exports.startServerOnSite = function(sender, siteID) {
  var site = sitesStore.siteById(siteID);
  var newServer = processController.newServer(sender, site.id, site.filePath);
  sitesStore.setSiteProperty(siteID, 'serverWorking', true);
  sitesStore.setSiteProperty(siteID, 'server', newServer);
  sitesStore.sendSitesList(sender);
}

module.exports.reportRunningServerOnSite = function(sender, siteID) {
  sitesStore.setSiteProperty(siteID, 'serverActive', true);
  sitesStore.sendSitesList(sender);
}

module.exports.reportWorkingServerOnSite = function(sender, siteID) {
  sitesStore.setSiteProperty(siteID, 'serverWorking', true);
  sitesStore.sendSitesList(sender);
}

module.exports.reportAvailableServerOnSite = function(sender, siteID) {
  sitesStore.setSiteProperty(siteID, 'serverWorking', false);
  sitesStore.sendSitesList(sender);
}

module.exports.reportErrorOnSite = function(sender, siteID) {
  sitesStore.setSiteProperty(siteID, 'hasError', true);
  sitesStore.sendSitesList(sender);
}

module.exports.reportSuccessOnSite = function(sender, siteID) {
  sitesStore.setSiteProperty(siteID, 'hasError', false);
  sitesStore.sendSitesList(sender);
}

module.exports.stopServerOnSite = function(sender, siteID) {
  var server = sitesStore.siteById(siteID).server;

  if (server) {
    processController.stopServer(server);
    sitesStore.setSiteProperty(siteID, 'serverActive', false);
    sitesStore.setSiteProperty(siteID, 'serverWorking', false);
    sitesStore.setSiteProperty(siteID, 'hasError', undefined);
    sitesStore.setSiteProperty(siteID, 'server', undefined);
  }

  if (sender) { sitesStore.sendSitesList(sender) };
}

module.exports.removeSite = function (sender, siteID) {
  var site = sitesStore.siteById(siteID);
  if (site.server) { module.exports.stopServerOnSite(sender, siteID)}
  sitesStore.removeSite(siteID);

  sitesStore.sendSitesList(sender);
}

module.exports.openLogs = function (sender, siteID) {
  var site = sitesStore.siteById(siteID);
  if (site.server) { site.server.logger.openLogsWindow(siteID); }

  sitesStore.sendSitesList(sender);
}

module.exports.buildSite = function (sender, siteID) {
  sitesStore.buildSite(siteID);
  sitesStore.sendSitesList(sender);
}
