import React, { Component } from 'react';
import Site from './Site';
import Dispatcher from '../utils/front-end-dispatcher';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var SitesList = React.createClass({
  getInitialState: function() {
    Dispatcher.createCallback('updateSitesList', this.receiveSitesList);
    return {sites: []};
  },
  componentDidMount: function() {
    Dispatcher.send('getSitesList');
  },
  receiveSitesList: function( event, list ) {
    this.setState({sites: list});
  },
  render: function () {
    var siteNodes = this.state.sites.map( function(data){
      return (
        <Site key={data.id} siteInfo={data}/>
        );
    });
    return(
      <ReactCSSTransitionGroup component="ul" className="sites-list" transitionName="slide" transitionEnterTimeout={400} transitionLeaveTimeout={500}>
        {siteNodes}
      </ReactCSSTransitionGroup>
    )
  }
})

module.exports = SitesList;
