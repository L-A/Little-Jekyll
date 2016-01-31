import fs from 'fs';
import dialog from 'dialog';
import dispatcher from './dispatcher';
import siteController from './site-controller';
import processController from './process-controller';
import storage from './storage';

var sitesList = [];
var strippedList = [];
var initialGetSitesList = true;

var initSitesList = function(sitesData, sender) {
  if(sitesData) {
    sitesList = sitesData;
    for (var i = 0; i < sitesList.length; i++) {
      if (sitesList[i].serverWorking) {
        siteController.startServerOnSite(sender, sitesList[i].id);
      }
    }
    exports.sendSitesList(sender);
  }
}

exports.siteById = function(id) {
  for (var i=0; i < sitesList.length; i++) {
    if (sitesList[i].id === id) {
      return sitesList[i];
    }
  }
}

exports.setSiteProperty = function(id, property, value) {
  var site = exports.siteById(id);
  site[property] = value;
}

exports.sendSitesList = function(sender) {
  if (initialGetSitesList) {
    storage.attemptToOpenSitesList(initSitesList, sender);
    initialGetSitesList = false;
  } else {
    storage.updateSitesList(sitesList);
    if (sender) sender.send('updateSitesList', sitesList);
  }
}

exports.addSite = function(sender, filePaths) {
  var filePaths = (typeof filePaths === "string" ? [filePaths] : filePaths) || dialog.showOpenDialog({ properties: [ 'openDirectory' ]});

  if ( filePaths != undefined ) {
    for (var i = 0; i < filePaths.length; i++) {
      var filePath = filePaths[i];
      var automaticName = filePath.slice(filePath.lastIndexOf("/") + 1);
      var id = new Date().valueOf(); // I am an expert at unique IDs

      sitesList.push({
        id: id,
        name: automaticName,
        filePath: filePath,
        serverActive: false,
        serverWorking: false,
        server: null
      });
    }

    exports.sendSitesList(sender);
  }
}

exports.createSite = function(sender) {
  var folderPath = dialog.showSaveDialog({ properties: [ 'openDirectory' ]});

  if ( folderPath != undefined ) {
    folderPath = folderPath.replace(/["']/g, "");
    fs.mkdir(folderPath);
    processController.createNewSite(sender, folderPath);
  };
}

exports.buildSite = function(siteID) {
  var buildPath = dialog.showSaveDialog({ properties: [ 'openDirectory' ]});
  var sitePath = exports.siteById(siteID).filePath;

  if ( buildPath != undefined ) {
    buildPath = buildPath.replace(/["']/g, "");
    processController.buildSite(sitePath, buildPath);
  };
}

exports.removeSite = function(siteID) {
    var site = exports.siteById(siteID);
    sitesList.splice(sitesList.indexOf(site), 1);
}

exports.stopAllServers = function(id) {
  for (var i=0; i < sitesList.length; i++) {
    if (sitesList[i].serverActive) {
      siteController.stopServerOnSite(dispatcher.reporter, sitesList[i].id);
    }
  }
}
