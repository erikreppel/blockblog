import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import { getCookie } from './helpers'
import './styles/index.sass';

const user_id = getCookie('user_id');

ReactDOM.render(
  <Home user_id={user_id}/>,
  document.getElementById('root')
);
