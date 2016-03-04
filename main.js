/* eslint strict: 0 */
'use strict';

require('babel-core/register');

const electron = require('electron');
const app = electron.app;
const crashReporter = electron.crashReporter;

const Windows = require('./server/windows.js');
const appServer = require('./server/dispatcher.js');

let mainWindow = null;

// crashReporter.start();

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
  else mainWindow = null;
});

var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
  // Someone tried to run a second instance, we should focus our window
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
  return true;
});

if (shouldQuit) {
  app.quit();
  return;
}

app.on('will-quit', function() {
  appServer.handleWillQuit();
})

app.on('ready', function() { mainWindow = Windows.initMain(appServer) });
app.on('activate', function() {
  if (mainWindow == null) { mainWindow = Windows.initMain(appServer) }
  else { (mainWindow.show()) }
});
