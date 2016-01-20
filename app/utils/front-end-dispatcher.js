import {ipcRenderer} from 'electron';

var dispatcher = {
  send: function(message, content) {
    content = content || null;
    if (content == null) {
      ipcRenderer.send(message);
    } else {
      ipcRenderer.send(message, content);
    }
  },
  createCallback: function(channel, callback) {
    ipcRenderer.on(channel, callback);
  }
}

ipcRenderer.on("log", function(event, ...args) {
  console.log("--- Server event ---");
  args.forEach(function(arg){
    console.log(arg);
  });
  console.log("--- Fin ---");
});

module.exports = dispatcher;
