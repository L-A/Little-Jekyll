import React, { Component } from 'react';

var Log = React.createClass({
  render: function () {
    return (
      <li className={this.props.log.logType}><p className="log-data">{this.props.log.logData}</p></li>
    );
  }
})

module.exports = Log;
