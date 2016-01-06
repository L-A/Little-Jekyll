import React, { Component } from 'react';
import Dispatcher from '../utils/front-end-dispatcher';

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
        <a href="#" onClick={this.createNewSite} className="btn-create"></a>
        <a href="#" onClick={this.requestNewSite} className="btn-open"></a>
        <a href="#" className="btn-settings"></a>
      </div>
    );
  }
})

module.exports = OptionsBar;
