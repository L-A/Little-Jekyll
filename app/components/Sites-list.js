import React, { Component } from 'react';
import Site from './Site';
import dispatcher from './Dispatcher';

var SitesList = React.createClass({
  getInitialState: function() {
    dispatcher.createCallback('updateSitesList', this.receiveSitesList);
    return {sites: []};
  },
  componentDidMount: function() {
    dispatcher.send('getSitesList');
  },
  receiveSitesList: function( event, list ) {
    console.log(list);
    this.setState({sites: list});
  },
  render: function () {
    var siteNodes = this.state.sites.map( function(data){
      return (
        <Site key={data.id} siteInfo={data}/>
        );
    });
    return(
      <ul className="sites-list">
        {siteNodes}
      </ul>
    )
  }
})

module.exports = SitesList;
