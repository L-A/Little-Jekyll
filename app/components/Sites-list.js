import React, { Component } from 'react';
import Site from './Site';
import EmptySitesList from './Empty-sites-list';
import Dispatcher from '../utils/front-end-dispatcher';
import { VelocityElement, VelocityTransitionGroup } from 'velocity-react';

var SitesList = React.createClass({
  getInitialState: function() {
    Dispatcher.createCallback('updateSitesList', this.receiveSitesList);
    return {sites: null};
  },
  componentDidMount: function() {
    Dispatcher.send('getSitesList');
  },
  receiveSitesList: function( event, list ) {
    this.setState({sites: list});
  },
  render: function () {
    if (this.state.sites != null && this.state.sites.length > 0) {
      var siteNodes = this.state.sites.map( function(data){
        return (
          <Site key={data.id} siteInfo={data}/>
          );
      })
      return(
        <VelocityTransitionGroup component="ul" className="sites-list" enter={{animation: "slideDown", stagger:25, duration: 300, easing: "easeInOutQuart"}} leave={{animation: "slideUp", easing: "easeInOutQuart", duration: 450, delay:175}}>
          {siteNodes}
        </VelocityTransitionGroup>
      )
    } else {
      return (
        <EmptySitesList sitesReceived={this.state.sites == null ? false : true} />
      );
    }
  }
})

module.exports = SitesList;
