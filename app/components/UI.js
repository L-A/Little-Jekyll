import React, { Component } from 'react';

import TitleBar from './Title-bar';
import SitesList from './Sites-list';
import OptionsBar from './Options-bar';
import Reporter from './Reporter';
import Dispatcher from '../utils/front-end-dispatcher';

var UI = React.createClass({
  getInitialState: function() {
    Dispatcher.createCallback('hint', this.handleChildHover);
    Dispatcher.createCallback('endHint', this.endChildHover);
    return {hintText: '', hintAvailable: false};
  },
  handleChildHover: function(event, hintText) {
    if (hintText == undefined) { hintText = "" };
    this.setState({hintText: hintText, hintAvailable: true});
  },
  endChildHover: function () {
    this.setState({hintAvailable: false});
  },
  render: function() {
    return (
      <div className="ui-root">
        <TitleBar />
        <SitesList />
        <OptionsBar hintText={this.state.hintText} hintAvailable={this.state.hintAvailable} />
      </div>
    );
  }
});

// I keep forgetting to export. So here's a reminder.
module.exports = UI;
