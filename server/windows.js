import Path from 'path';
import { BrowserWindow, Menu, app } from 'electron';

const appPath = Path.join(app.getAppPath(), 'app');
const darwin = (process.platform === 'darwin');
const win32 = (process.platform === 'win32');

module.exports.initMain = function (appServer) {
  let menu;
  let template;
  var iconPath = "";

  if (!darwin) {
    iconPath = Path.join( appPath, ( win32 ? "appicon.ico" : "appicon-512.png"));
  }
  console.log(iconPath);

  var mainWindow = new BrowserWindow({
    frame: false,
    icon: (iconPath || null),
    width: 340,
    height: 260,
    minWidth: 340,
    minHeight: 230,
    acceptFirstMouse: true
  });

  var url = Path.join("file://", appPath, (process.env.HOT ? '/hot-dev-app.html' : 'app.html' ));

  mainWindow.loadURL(url);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // if (darwin) {
  //   mainWindow.on('close', function(event) {
  //     event.preventDefault();
  //     mainWindow.hide();
  //   })
  // }

  if (darwin) {
    template = require("./menu.js").osxMenu(app, appServer, mainWindow);
    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    template = require("./menu.js").winLinMenu(mainWindow, appServer);
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

  var url = Path.join("file://", appPath, (process.env.HOT ? '/hot-dev-logs.html' : 'logs-index.html' ));

  logsWindow.loadURL(url);

  logsWindow.on('closed', () => {
    logsWindow = null;
  });

  // if (darwin) {
  //   logsWindow.on('close', function(event) {
  //     event.preventDefault();
  //     logsWindow.hide();
  //   })
  // }

  return logsWindow;
};
