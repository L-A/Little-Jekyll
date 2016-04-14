import React, { Component } from 'react';
import Site from './Site';
import Mousetrap from 'Mousetrap';
import EmptySitesList from './Empty-sites-list';
import Dispatcher from '../utils/front-end-dispatcher';
import Cycle from '../utils/cycle';
import { VelocityElement, VelocityTransitionGroup } from 'velocity-react';

var SitesList = React.createClass({
  getInitialState: function() {
    Dispatcher.createCallback('updateSitesList', this.receiveSitesList);
    Dispatcher.createCallback('activityStarted', this.showActivity);
    Dispatcher.createCallback('activityStopped', this.stopActivity);
    return {sites: null, isActive: false, selectedSite: 0};
  },
  componentDidMount: function() {
    Dispatcher.send('getSitesList');
    Mousetrap.bind('up', this.selectPrevious);
    Mousetrap.bind('down', this.selectNext);
  },
  componentWillUnmount: function() {
    Mousetrap.unbind('up', this.selectNext);
    Mousetrap.unbind('down', this.selectPrevious);
  },
  receiveSitesList: function( event, list ) {
    this.setState({sites: list});
  },
  showActivity: function() {
    this.setState({isActive:true});
  },
  stopActivity: function() {
    this.setState({isActive:false})
  },
  selectNext: function() {
    var nextIndex = Cycle(this.state.sites, this.state.selectedSite, 1);
    this.setSelection(nextIndex);
  },
  selectPrevious: function() {
    var previousIndex = Cycle(this.state.sites, this.state.selectedSite, -1);
    this.setSelection(previousIndex);
  },
  setSelection: function(index) {
    this.setState({selectedSite: index});
  },
  render: function () {
    if (this.state.sites != null && this.state.sites.length > 0) {
      var siteNodes = this.state.sites.map( function(data, mapIndex){

        var selectMe = function (){this.setSelection(mapIndex)};

        return (
          <Site key={data.id} onClick={this.setSelection.bind(this, mapIndex)} selected={this.state.selectedSite == mapIndex} siteInfo={data}/>
          );
      }, this)
      return(
        <VelocityTransitionGroup component="ul" className="sites-list" enter={{animation: "slideDown", stagger:25, duration: 300, easing: "easeInOutQuart"}} leave={{animation: "slideUp", easing: "easeInOutQuart", duration: 450, delay:175}}>
          {siteNodes}
        </VelocityTransitionGroup>
      )
    } else {
      return (
        <EmptySitesList isActive={this.state.isActive} sitesReceived={this.state.sites == null ? false : true} />
      );
    }
  }
})

module.exports = SitesList;
