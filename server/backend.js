require('babel-core/register');
var dispatcher = require('./dispatcher.js');

exports.handleWillQuit = function() {
  // Nope, not here
  dispatcher.handleWillQuit();
}
