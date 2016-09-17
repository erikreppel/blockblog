import React from 'react';

const UserDetails = ({ user }) => {
  return (
    <div className='user-details'>
      <img
        className='avatar'
        alt='avatar'
        src='https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'>
      </img>
      <h1 className='username'>{user}</h1>
    </div>
  );
};

// UserDetails.propTypes = {

// };

export default UserDetails;
