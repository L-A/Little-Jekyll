var fs = require('fs');
var dialog = require('dialog');
var dispatcher = require('./dispatcher.js');
var jekyllController = require('./jekyll-controller.js');

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

this.siteById = function(id) {
  for (i=0; i<sitesList.length; i++) {
    if (sitesList[i].id === id) {
      return sitesList[i];
    }
  }
}

this.setSiteProperty = function(id, property, value) {
  var site = this.siteById(id);
  site[property] = value;
}

this.sendSitesList = function(requester) {
  requester.send('updateSitesList', sitesList);
};

this.addSite = function(requester, filePaths) {
  // TODO support multiple directories opening at once
  // (or split into handling the general OS "open" command and only manage the dialog here)

  var filePaths = (typeof filePaths === "string" ? [filePaths] : filePaths) || dialog.showOpenDialog({ properties: [ 'openDirectory' ]});
  console.log(filePaths);

  if ( filePaths != undefined ) {
    for (i = 0; i < filePaths.length; i++) {
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

    this.sendSitesList(requester);
  }
}

this.createSite = function(requester) {
  var folderPath = dialog.showSaveDialog({ properties: [ 'openDirectory' ]}).replace(/["']/g, "");

  fs.mkdir(folderPath);
  jekyllController.createNewSite(requester, folderPath);
}
