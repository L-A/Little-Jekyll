import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import MainRenderer from './containers/MainRenderer';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={MainRenderer} />
  </Route>
);
