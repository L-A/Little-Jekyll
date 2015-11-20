var React = require('react');

var TitleBar = require('./title-bar.jsx');
var SitesList = require('./sites-list.jsx');
var OptionsBar = require('./options-bar.jsx');

var UI = React.createClass({
  render: function() {
    return (
      <div className="ui-root">
        <TitleBar />
        <SitesList />
        <OptionsBar />
      </div>
    );
  }
});

// I keep forgetting to export. So here's a reminder.
module.exports = UI;
