import React, { Component } from 'react';

import TitleBar from './Title-bar';
import LogsList from './Logs-list';
import Dispatcher from '../utils/front-end-dispatcher';

var LogsUI = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div className="logs-ui-root">
        <TitleBar />
        <LogsList />
      </div>
    );
  }
});

// I keep forgetting to export. So here's a reminder.
module.exports = LogsUI;
