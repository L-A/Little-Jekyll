require('babel-core/register');
var Dispatcher = require('./dispatcher.js');

exports.handleWillQuit = function() {
  // Nope, not here
  Dispatcher.handleWillQuit();
}
