import app from 'app';
import fs from 'fs';
import path from 'path';

var appDataPath = path.join(app.getPath('userData'), "sitesList.json") ;
var appDataIsBeingWritten = false;

var storableProperties = ["filePath", "id", "name"];

exports.attemptToOpenSitesList = function (callback, sender) {
  fs.readFile(appDataPath, 'utf8', function (err, data) {
    if (err) {
      return false;
    } else {
      callback(JSON.parse(data), sender);
    }
  });
}

exports.updateSitesList = function (sitesList) {
  var sitesListString = createStorableList(sitesList);
  if (!appDataIsBeingWritten) {
    appDataIsBeingWritten = true;
    fs.writeFile(appDataPath, sitesListString, function(){
      appDataIsBeingWritten = false;
    });
  }
}

var createStorableList = function (sitesList) {
  var storableList = [];
  for (var i = 0; i < sitesList.length; i++) {
    storableList[i] = {};
    for (var j = 0; j < storableProperties.length; j++) {
      var prop = storableProperties[j]
      storableList[i][prop] = sitesList[i][prop];

      // stores whether to start a server on the next app load
      storableList[i].serverRequested = sitesList[i].serverActive;
    }
  }
  return JSON.stringify(storableList);
}
