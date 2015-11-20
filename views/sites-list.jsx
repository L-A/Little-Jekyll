var React = require('react');
var Site = require('./site.jsx');
var dispatcher = require('./dispatcher.jsx');

var SitesList = React.createClass({
  getInitialState: function() {
    dispatcher.createCallback('updateSitesList', this.receiveSitesList);
    return {sites: []};
  },
  componentDidMount: function() {
    dispatcher.send('getSitesList');
  },
  receiveSitesList: function( list ) {
    this.setState({sites: list});
    console.log(list);
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
