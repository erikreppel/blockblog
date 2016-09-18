import React from 'react';
import { getCookie } from '../helpers';

const UserDetails = () => {
  const username = getCookie('username');
  const user_id = getCookie('user_id');
  return (
    <div className='user-details'>
      <img
        className='avatar'
        alt='avatar'
        src='https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'>
      </img>
      <h1 className='username'>{username}</h1>
      <h1 className='user_id'>uid: {user_id}</h1>
    </div>
  );
};

export default UserDetails;
