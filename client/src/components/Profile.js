import React from 'react';
import UserDetails from './UserDetails';
import Feed from './Feed';

const Profile = ({ user_id }) => {
  // change url to         window.location.href + 'users/user'          for prod
  let posts = [];

  fetch(`http://localhost:3005/users/${user_id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    return response.json();
  })
  .then(profile => {
    posts = profile.posts;
  });

  return (
    <div className='profile container'>
      <UserDetails user={user_id} />
      <Feed posts={posts} />
    </div>
  );
};

Profile.propTypes = {
  user_id: React.PropTypes.string.isRequired
};

export default Profile;
