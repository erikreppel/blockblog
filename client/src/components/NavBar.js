import React from 'react';
import { getCookie } from '../helpers';

const NavBar = () => {
  const user_id = getCookie('user_id');
  
  return (
    <div className='navbar'>
      <h1 className='profile'>
        <a href={`http://localhost:3005/${user_id}`}>PROFILE</a>
      </h1>
      <h1 className='home'>
        <a href={`http://localhost:3005/`}>HOME</a>
      </h1>
    </div>
  );
};

export default NavBar;
