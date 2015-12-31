import React, { Component } from 'react';
import UI from './UI.js';

var remote = require('remote');
var app = remote.require('app');

import { ipc } from 'ipc';

export default class Renderer extends Component {
  render() {
    return (
      <UI />
    );
  }
}
