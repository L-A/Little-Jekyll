import fs from 'fs';
import dialog from 'dialog';
import dispatcher from './dispatcher.js';
import jekyllController from './jekyll-controller.js';

var sitesList = [
  {
    id: 2,
    name: "Dummy site",
    filePath: "/Users/lalabadie/git/l-a.github.io",
    configFile: "_config.yml",
    serverActive: false,
    serverRequested: false,
    server: null
  }
];

exports.siteById = function(id) {
  for (var i=0; i<sitesList.length; i++) {
    if (sitesList[i].id === id) {
      return sitesList[i];
    }
  }
}

exports.setSiteProperty = function(id, property, value) {
  var site = exports.siteById(id);
  site[property] = value;
}

var sendSitesList = function(sender) {
  sender.send('updateSitesList', sitesList);
};

exports.sendSitesList = function(sender) {
  sender.send('updateSitesList', sitesList);
}

exports.addSite = function(sender, filePaths) {
  // TODO support multiple directories opening at once
  // (or split into handling the general OS "open" command and only manage the dialog here)

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
        serverRequested: false,
        server: null
      });
    }

    sendSitesList(sender);
  }
}

exports.createSite = function(sender) {
  var folderPath = dialog.showSaveDialog({ properties: [ 'openDirectory' ]});
  if ( folderPath != undefined ) {
    folderPath = folderPath.replace(/["']/g, "");
    fs.mkdir(folderPath);
    jekyllController.createNewSite(sender, folderPath);
  };
}
