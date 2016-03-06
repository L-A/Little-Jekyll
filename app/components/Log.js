import React, { Component } from 'react';

var Log = React.createClass({
  render: function () {
    return (
      <li className={this.props.logData.type}><p className="log-data">{this.props.logData.log}</p></li>
    );
  }
})

module.exports = Log;
