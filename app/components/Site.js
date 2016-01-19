import React, { Component } from 'react';
import Dispatcher from '../utils/front-end-dispatcher';
import shell from 'shell';

var Site = React.createClass({
  getInitialState: function() {
    return {optionsShown: false};
  },
  toggleServerState: function() {
    var message = this.props.siteInfo.serverActive ? 'stopServer' : 'startServer';
    if( !this.props.siteInfo.serverRequested ) {
      Dispatcher.send(message, this.props.siteInfo.id);
    }
  },
  toggleOptionsPanel: function() {
    var newOptionsState = !this.state.optionsShown;
    this.setState({optionsShown: newOptionsState});
  },
  openLocalServer: function() {
    if(this.props.siteInfo.serverActive) {
      shell.openExternal(this.props.siteInfo.server.localURL);
    }
  },
  openFolder: function() {
    shell.openItem(this.props.siteInfo.filePath);
  },
  removeSiteFromList: function() {
  },
  buildSite: function() {
  },
  render: function () {
    var siteInfo = this.props.siteInfo;
    var cellClass = this.state.optionsShown ? "site-cell options-shown" : "site-cell";
    var switchState = 'site-serve-switch ' + (siteInfo.serverActive ? 'switch-on' : (siteInfo.serverRequested ? 'switch-working' : 'switch-off'));
    return (
      <li className={cellClass}>
        <div className="main-panel">
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
            <a className="btn-edit" onClick={this.toggleOptionsPanel}></a>
          </div>
        </div>
        <div className="secondary-panel">
          <a className="btn-remove" onClick={this.removeSiteFromList}></a>
          <a className="btn-build" onClick={this.buildSite}></a>
          <a className="btn-edit" onClick={this.toggleOptionsPanel}></a>
        </div>
      </li>
    );
  }
})

module.exports = Site;
