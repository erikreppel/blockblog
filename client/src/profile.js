import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './components/Profile';
import { getCookie } from './helpers'
import './styles/index.sass';

const username = getCookie('username');
const user_id = getCookie('user_id');

ReactDOM.render(
  <Profile user_id={user_id} username={username} />,
  document.getElementById('root')
);
