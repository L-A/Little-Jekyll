import React from 'react';
import { render } from 'react-dom';
import Renderer from './components/Renderer';
import css from './assets/css/style.scss';

render(
  <Renderer />,
  document.getElementById('root')
);
