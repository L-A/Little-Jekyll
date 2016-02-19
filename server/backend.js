require('babel-core/register');
var Dispatcher = require('./dispatcher.js');

module.exports.handleWillQuit = function() {
  // Nope, not here
  Dispatcher.handleWillQuit();
}

module.exports.openFile = function() {
  Dispatcher.addSite();
}
