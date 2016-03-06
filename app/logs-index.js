import React from 'react';
import { render } from 'react-dom';
import LogsUI from './components/Logs-UI.js';
import css from './assets/css/style.scss';

render(
  <LogsUI />,
  document.getElementById('root')
);
