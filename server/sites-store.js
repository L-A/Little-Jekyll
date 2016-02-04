import fs from 'fs';
import dialog from 'dialog';
import Dispatcher from './dispatcher';
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
    module.exports.sendSitesList(sender);
  }
}

module.exports.siteById = function(id) {
  for (var i=0; i < sitesList.length; i++) {
    if (sitesList[i].id === id) {
      return sitesList[i];
    }
  }
}

module.exports.setSiteProperty = function(id, property, value) {
  var site = module.exports.siteById(id);
  site[property] = value;
}

module.exports.sendSitesList = function(sender) {
  if (initialGetSitesList) {
    storage.attemptToOpenSitesList(initSitesList, sender);
    initialGetSitesList = false;
  } else {
    storage.updateSitesList(sitesList);
    if (sender) sender.send('updateSitesList', sitesList);
  }
}

module.exports.addSite = function(sender, filePaths) {
  var filePaths = (typeof filePaths === "string" ? [filePaths] : filePaths) || dialog.showOpenDialog({ properties: [ 'openDirectory', 'multiSelections' ]});

  if ( filePaths != undefined ) {
    for ( var i = (filePaths.length - 1); i >= 0 ; i-- ) {
      for ( var j = 0; j < sitesList.length; j++ ) {
        if(filePaths[i] == sitesList[j].filePath) {
          filePaths.splice(i, 1);
        }
      }
    }

    for (var i = 0; i < filePaths.length; i++) {
      var filePath = filePaths[i];
      var automaticName = filePath.slice(filePath.lastIndexOf("/") + 1);
      var id = new Date().valueOf() + i; // I am an expert at unique IDs

      sitesList.unshift({
        id: id,
        name: automaticName,
        filePath: filePath,
        serverActive: false,
        serverWorking: false,
        server: null
      });
    }

    module.exports.sendSitesList(sender);
  }
}

module.exports.createSite = function(sender) {
  var folderPath = dialog.showSaveDialog({ properties: [ 'openDirectory' ]});

  if ( folderPath != undefined ) {
    folderPath = folderPath.replace(/["']/g, "");
    fs.mkdir(folderPath);
    processController.createNewSite(sender, folderPath);
  };
}

module.exports.buildSite = function(siteID) {
  var buildPath = dialog.showSaveDialog({ properties: [ 'openDirectory' ]});
  var sitePath = module.exports.siteById(siteID).filePath;

  if ( buildPath != undefined ) {
    buildPath = buildPath.replace(/["']/g, "");
    processController.buildSite(sitePath, buildPath);
  };
}

module.exports.removeSite = function(siteID) {
    var site = module.exports.siteById(siteID);
    sitesList.splice(sitesList.indexOf(site), 1);
}

module.exports.stopAllServers = function(id) {
  for (var i=0; i < sitesList.length; i++) {
    if (sitesList[i].serverActive) {
      siteController.stopServerOnSite(Dispatcher.reporter, sitesList[i].id);
    }
  }
}
