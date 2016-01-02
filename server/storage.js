import app from 'app';
import fs from 'fs';
import path from 'path';

var appDataPath = path.join(app.getPath('userData'), "sitesList.json") ;
var appDataIsBeingWritten = false;

fs.readFile(appDataPath, function (err, data) {
  if (err) {
    console.log("No sites file exists, waiting for store to send some data")
  };
  console.log("File exists!");
});

// Update sites list, received from sites-store, in object format

exports.attemptToOpenSitesList = function (callback) {
  fs.readFile(appDataPath, 'utf8', function (err, data) {
    if (err) {
      return false;
    } else {
      callback(JSON.parse(data));
    }
  });
}

exports.updateSitesList = function (sitesList) {
  var sitesListString = JSON.stringify(sitesList);
  if (!appDataIsBeingWritten) {
    appDataIsBeingWritten = true;
    fs.writeFile(appDataPath, sitesListString, function(){
      appDataIsBeingWritten = false;
      console.log("written as: " + sitesListString);
    });
  }
}
