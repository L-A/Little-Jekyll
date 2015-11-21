var React = require('react');
var UI = require('./ui.jsx');

var remote = require('remote');
var app = remote.require('app');
var ipc = require('ipc');

var container = document.querySelector('body');

React.render(<UI />, container);
