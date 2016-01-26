import React, { Component } from 'react';
import Dispatcher from '../utils/front-end-dispatcher';
import SimpleButton from './simple-button'

var OptionsBar = React.createClass({
  requestNewSite: function() {
    Dispatcher.send('addSite');
  },
  createNewSite: function() {
    Dispatcher.send('createSite');
  },
  render: function () {
    return (
      <div className="options-bar">
        <SimpleButton href="#" onClick={this.requestNewSite} className="btn-open" hintText="Open an existing Jekyll site" />
        <span className={this.props.hintAvailable ? "hint-text hint-available" : "hint-text"}>{this.props.hintText}</span>
        <SimpleButton onClick={this.createNewSite} className="btn-create" hintText="Create a new template site" />
        {/* <SimpleButton className="btn-settings" /> */}
      </div>
    );
  }
})

module.exports = OptionsBar;
