import React from 'react';

const UserDetails = ({ username, user_id }) => {
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

UserDetails.propTypes = {
  username: React.PropTypes.string.isRequired,
  user_id: React.PropTypes.string.isRequired
};

export default UserDetails;
