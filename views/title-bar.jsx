var React = require('react');

var TitleBar = React.createClass({
  render: function () {
    return (
      <div className="title-bar">
        <a href="#" className="btn-close"></a>
        <a href="#" className="btn-minimize"></a>
        <img className="logo" src="assets/img/logo.svg" />
      </div>
    );
  }
})

module.exports = TitleBar;
