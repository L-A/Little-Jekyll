'use babel';

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

var dispatcher = require('./server/dispatcher.js');
var devCompile = require('./server/electron-compile-plug.js');
var mainWindow = null;

// Quit when all windows are closed.

app.on('window-all-closed', function() {

  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

  // if (process.platform != 'darwin') {
    app.quit();
  // }

});

app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    width: 340,
    height: 260
  });

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
