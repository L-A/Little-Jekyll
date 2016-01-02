import React, { Component } from 'react';
import Dispatcher from '../utils/dispatcher';
import shell from 'shell';

var Site = React.createClass({
  toggleServerState: function() {
    var message = this.props.siteInfo.serverActive ? 'stopServer' : 'startServer';
    if( !this.props.siteInfo.serverRequested ) {
      Dispatcher.send(message, this.props.siteInfo.id);
    }
  },
  openLocalServer: function() {
    if(this.props.siteInfo.serverActive) {
      shell.openExternal(this.props.siteInfo.server.localURL);
    }
  },
  openFolder: function() {
    shell.openItem(this.props.siteInfo.filePath);
  },
  render: function () {
    var siteInfo = this.props.siteInfo;
    var switchState = 'site-serve-switch ' + (siteInfo.serverActive ? 'switch-on' : (siteInfo.serverRequested ? 'switch-working' : 'switch-off'));
    return (
      <li className="site-cell">
        <a className={switchState} onClick={this.toggleServerState}>
          <div className="groove">
            <div className="knob"></div>
          </div>
        </a>
        <div className="site-info">
          <h1 className={siteInfo.serverActive ? 'server-active' : ''}>{siteInfo.name}</h1>
          <p className="site-folder" onClick={this.openFolder}>{siteInfo.filePath}</p>
        </div>
        <div className="site-options">
          <a className={siteInfo.serverActive ? 'btn-preview available' : 'btn-preview'} onClick={this.openLocalServer}></a>
          {/* <a className="btn-edit">Edit</a> */}
        </div>
      </li>
    );
  }
})

module.exports = Site;
