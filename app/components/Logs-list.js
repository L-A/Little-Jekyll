import React, { Component } from 'react';
import Site from './Site';
import Log from './Log';
import Dispatcher from '../utils/front-end-dispatcher';
import { VelocityElement, VelocityTransitionGroup } from 'velocity-react';

var LogsList = React.createClass({
  getInitialState: function () {
    Dispatcher.createCallback('updateLogs', this.receiveLogs);
    return {logs:[]};
  },
  receiveLogs: function (event, receivedLogs) {
    this.setState({logs: receivedLogs});
    console.log(this.state.logs);
  },
  render: function () {
    if (this.state.logs != null && this.state.logs.length > 0) {
      var logsNodes = this.state.logs.map( function(data){
        return (
          <Log key={data.time} logData={data}/>
          );
      })
      return(
        <VelocityTransitionGroup component="ul" className="logs-list" enter={{animation: "slideDown", stagger:25, duration: 300, easing: "easeInOutQuart"}} leave={{animation: "slideUp", easing: "easeInOutQuart", duration: 450, delay:175}}>
          {logsNodes}
        </VelocityTransitionGroup>
      )
    } else {
      return (
        <div className="empty-logs-list">Yo I'm a list</div>
      );
    }
  }
})

module.exports = LogsList;
