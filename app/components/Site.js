import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dispatcher from '../utils/front-end-dispatcher';
import SimpleButton from './simple-button.js';
import Mousetrap from 'Mousetrap';
import shell from 'shell';

var Site = React.createClass({
  getInitialState: function() {
    return {optionsShown: false};
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.selected && !nextProps.selected) {
      Mousetrap.unbind('space', this.toggleServerState);
    }
  },
  componentDidUpdate() {
    if (this.props.selected) {
      Mousetrap.bind('space', this.toggleServerState);
      ReactDOM.findDOMNode(this).scrollIntoViewIfNeeded();
    }
  },
  toggleServerState: function() {
    var message = this.props.siteInfo.serverActive ? 'stopServer' : 'startServer';
    Dispatcher.send(message, this.props.siteInfo.id);
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
  openServerLogs: function() {
    Dispatcher.send('openServerLogs', this.props.siteInfo.id);
  },
  openFolder: function() {
    shell.openItem(this.props.siteInfo.filePath);
  },
  removeSiteFromList: function() {
    this.setState({optionsShown: false});
    Dispatcher.send('removeSiteFromList', this.props.siteInfo.id);
  },
  buildSite: function() {
    Dispatcher.send('buildSite', this.props.siteInfo.id);
    this.toggleOptionsPanel();
  },
  render: function () {
    var siteInfo = this.props.siteInfo;
    var cellClass = (this.state.optionsShown ? "site-cell options-shown" : "site-cell") + (siteInfo.hasError ? " error" : "") + (siteInfo.serverActive ? " logs-available" : "") + (this.props.selected ? " selected" : "");
    var switchState = 'site-serve-switch ' + (siteInfo.serverWorking ? 'switch-working' : (siteInfo.serverActive ? 'switch-on' : 'switch-off'));
    return (
      <li className={cellClass} onClick={this.props.onClick}>
        <div className="main-panel">
          <SimpleButton className={switchState} onClick={this.toggleServerState} hintText="Start and stop this server">
            <div className="groove">
              <div className="knob">
                <div className="activity-indicator"></div>
              </div>
            </div>
          </SimpleButton>
          <div className="site-info">
            <h1 className={siteInfo.serverActive ? 'server-active' : ''}>{siteInfo.name}</h1>
            <SimpleButton className="site-folder" onClick={this.openFolder} textContent={siteInfo.filePath} hintText="Open site's folder"/>
          </div>
          <div className="site-options">
            <SimpleButton className={siteInfo.serverActive ? (siteInfo.serverWorking ? 'btn-preview available hold' : 'btn-preview available') : 'btn-preview'} onClick={this.openLocalServer} hintText="Open in browser"/>
          </div>
        </div>
        <div className="secondary-panel">
          <SimpleButton className="btn-remove" onClick={this.removeSiteFromList} hintText="Remove site from list"/>
          <SimpleButton className="btn-build" onClick={this.buildSite} hintText="Build site to..."/>
          <SimpleButton className={siteInfo.serverActive ? (siteInfo.hasError ? "btn-logs available error" : "btn-logs available") : "btn-logs"} onClick={this.openServerLogs} hintText="Open logs">
            <div className="btn" /><div className="indicator" />
          </SimpleButton>
          <SimpleButton className="btn-edit" onClick={this.toggleOptionsPanel} hintText="Toggle the options panel"/>
        </div>
      </li>
    );
  }
})

module.exports = Site;
