import React, { Component } from 'react';

import TitleBar from './Title-bar';
import SitesList from './Sites-list';
import OptionsBar from './Options-bar';
import Reporter from './Reporter';

var UI = React.createClass({
  render: function() {
    return (
      <div className="ui-root">
        <TitleBar />
        <SitesList />
        <OptionsBar />
      </div>
    );
  }
});

// I keep forgetting to export. So here's a reminder.
module.exports = UI;
