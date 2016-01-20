import React, { Component } from 'react';
import Dispatcher from '../utils/front-end-dispatcher';

var SimpleButton = React.createClass({
  getInitialState: function() {
    return {hintText: this.props.hintText};
  },
  reportHover: function() {
    Dispatcher.send('hint', this.state.hintText);
  },
  endHover: function() {
    Dispatcher.send('endHint');
  },
  render: function() {
    return (
      <a className={this.props.className}
         onClick={this.props.onClick}
         onMouseOver={this.props.hintText ? this.reportHover : null}
         onMouseLeave={this.endHover}>
        {this.props.textContent || ""}
      </a>
    );
  }
})

module.exports = SimpleButton;
