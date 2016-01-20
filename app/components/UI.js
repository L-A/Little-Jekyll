import React, { Component } from 'react';

import TitleBar from './Title-bar';
import SitesList from './Sites-list';
import OptionsBar from './Options-bar';
import Reporter from './Reporter';
import Dispatcher from '../utils/front-end-dispatcher';

var UI = React.createClass({
  getInitialState: function() {
    Dispatcher.createCallback('hint', this.handleChildHover);
    return {hintText: 'Howdy!'};
  },
  handleChildHover: function(event, hintText) {
    if (hintText == undefined) { hintText = "" };
    this.setState({hintText: hintText});
  },
  render: function() {
    return (
      <div className="ui-root">
        <TitleBar />
        <SitesList />
        <OptionsBar hintText={this.state.hintText} />
      </div>
    );
  }
});

// I keep forgetting to export. So here's a reminder.
module.exports = UI;
