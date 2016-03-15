import React, { Component } from 'react';
import Site from './Site';
import Log from './Log';
import Dispatcher from '../utils/front-end-dispatcher';
import { VelocityElement, VelocityTransitionGroup } from 'velocity-react';

var LogsList = React.createClass({
  getInitialState: function () {
    Dispatcher.createCallback('setLogs', this.receiveLogs);
    Dispatcher.send('getLogs');
    this.shouldScroll = true;
    return {logs:[]};
  },
  handleScroll: function(e) {
    var node = this.node;
    this.shouldScroll = node.scrollTop + node.offsetHeight === node.scrollHeight;
    console.log(this.shouldScroll);
  },
  scrollDown: function() {
    console.log("I should scroll down");
  },
  receiveLogs: function (event, receivedLogs) {
    this.setState({logs: receivedLogs});
    this.node = require('react-dom').findDOMNode(this);
  },
  componentDidUpdate: function () {
    if(this.shouldScroll) {
      console.log("I should scroll down");
      this.node.scrollTop = this.node.scrollHeight + 200;
    }
  },
  render: function () {
    if (this.state.logs != null && this.state.logs.length > 0) {
      var logsNodes = this.state.logs.map( function(data, rank){
        return (
          <Log key={(data.time + rank)} log={data}/>
          );
      })
      return(
        <ul className="logs-list" onScroll={this.handleScroll}>
          {logsNodes}
        </ul>
      )
    } else {
      return (
        <div className="empty-logs-list">Yo I'm a list</div>
      );
    }
  }
})

module.exports = LogsList;
