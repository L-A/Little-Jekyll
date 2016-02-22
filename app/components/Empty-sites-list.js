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
    if(this.props.sitesReceived == true) {
      var childIcon = <div className="icon" />;
      return (
        <div className="empty-sites-list">
          <p>Oh dear! This list is empty.</p>
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
        </div>
      );
    } else {
      return ( <div className="empty-sites-list" /> );
    }
  }
})

module.exports = EmptySitesList;
