import React, { Component } from 'react';

var Log = React.createClass({
  render: function () {
    return (
      <li>{this.props.logData.log} <small>at {this.props.logData.time}</small></li>
    );
  }
})

module.exports = Log;
