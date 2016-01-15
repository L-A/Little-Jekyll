import React, { Component } from 'react';
import { remote } from 'electron';

var TitleBar = React.createClass({
  minimize: function() {
    var window = remote.BrowserWindow.getFocusedWindow();
    window.minimize();
  },
  close: function() {
    var window = remote.BrowserWindow.getFocusedWindow();
    if (process.platform !== 'darwin') {
      window.close();
    } else {
      window.hide();
    }

  },
  render: function () {
    return (
      <div className="title-bar">
        <a onClick={this.close} className="btn-close"></a>
        <a onClick={this.minimize} className="btn-minimize"></a>
        <img className="logo" src="assets/img/logo.svg" width="14" />
      </div>
    );
  }
})

module.exports = TitleBar;
