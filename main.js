/* eslint strict: 0 */
'use strict';

require('babel-core/register');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const crashReporter = electron.crashReporter;
let menu;
let template;
let mainWindow = null;

var appServer = require('./server/dispatcher.js');

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

app.on('ready', function() { initMainWindow() });
app.on('activate', function() {
  if (mainWindow == null) { initMainWindow() }
  else { (mainWindow.show()) }
});

var initMainWindow = function () {
  mainWindow = new BrowserWindow({
    frame: false,
    width: 340,
    height: 260,
    minWidth: 340,
    minHeight: 230,
    acceptFirstMouse: true
  });

  if (process.env.HOT) {
    mainWindow.loadURL(`file://${__dirname}/app/hot-dev-app.html`);
  } else {
    mainWindow.loadURL(`file://${__dirname}/app/app.html`);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  // }

  if (process.platform === 'darwin') {
    template = require("./server/menu.js").osxMenu(app, appServer);
    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = require("./server/menu.js").winLinMenu(appServer, mainWindow);
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
};
