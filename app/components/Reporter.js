import React, { Component } from 'react';
import Dispatcher from '../utils/front-end-dispatcher';

var displayReport = function(event, message) {
  console.log(message);
}

Dispatcher.createCallback('report', displayReport);
Dispatcher.send('hello');
console.log('Reporter is up!');
