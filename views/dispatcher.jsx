var ipc = require('ipc');

var dispatcher = {
  send : function(message, content) {
    console.log("sending " + message);
    content = content || null;
    if (content == null) {
      ipc.send(message);
    } else {
      ipc.send(message, content);
    }
  },
  createCallback: function(channel, callback) {
    ipc.on(channel, callback);
  }
}

module.exports = dispatcher;
