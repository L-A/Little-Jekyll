import Path from 'path';
import { BrowserWindow, Menu, app } from 'electron';

const appPath = Path.join('file:', app.getAppPath(), 'app');

module.exports.initMain = function (appServer) {
  let menu;
  let template;
  var mainWindow = new BrowserWindow({
    frame: false,
    width: 340,
    height: 260,
    minWidth: 340,
    minHeight: 230,
    acceptFirstMouse: true
  });

  var url = Path.join(appPath, (process.env.HOT ? '/hot-dev-app.html' : 'app.html' ));

  mainWindow.loadURL(url);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  // }

  if (process.platform === 'darwin') {
    template = require("./menu.js").osxMenu(app, appServer, mainWindow);
    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = require("./menu.js").winLinMenu(appServer, mainWindow);
    menu = Menu.buildFromTemplate(template);
    mainWindow.setMenu(menu);
  }
  return mainWindow;
};

module.exports.initLogs = function () {
  var logsWindow = new BrowserWindow({
    frame: false,
    width: 600,
    height: 320,
    minWidth: 400,
    minHeight: 320,
    acceptFirstMouse: true
  });

  var url = Path.join(appPath, (process.env.HOT ? '/hot-dev-logs.html' : 'logs-index.html' ));

  logsWindow.loadURL(url);

  logsWindow.openDevTools();

  logsWindow.on('closed', () => {
    logsWindow = null;
  });

  return logsWindow;
};
