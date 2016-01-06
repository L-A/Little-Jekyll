require("babel-register");
var dispatcher = require('./dispatcher.js');

exports.handleWillQuit = function() {
  // Nope, not here
  dispatcher.handleWillQuit();
}
