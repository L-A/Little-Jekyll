import React, { Component } from 'react';
import Dispatcher from '../utils/front-end-dispatcher';
import SimpleButton from './simple-button'

var EmptySitesList = React.createClass({
  requestNewSite: function() {
    Dispatcher.send('addSite');
  },
  createNewSite: function() {
    Dispatcher.send('createSite');
  },
  render: function () {
    var listClass = this.props.isActive ? "empty-sites-list active" : "empty-sites-list";
    var buttonsRow = (
      <div className="buttons-row">
        <SimpleButton onClick={this.createNewSite} className="btn-create">
          <div className="icon" />
          <span>Create</span>
        </SimpleButton>
        <SimpleButton href="#" onClick={this.requestNewSite} className="btn-open">
          <div className="icon" />
          <span>Open</span>
        </SimpleButton>
      </div>
    )

    if (this.props.sitesReceived) {
      return (
        <div className={listClass}>
          <p>Oh dear! This list is empty.</p>
          {buttonsRow}
          <div className="activity-indicator" />
        </div>
      )
    } else {
      return (
        <div className="empty-sites-list" />
      )
    }
  }
})

module.exports = EmptySitesList;
