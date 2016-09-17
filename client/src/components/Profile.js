import React from 'react';
import UserDetails from './UserDetails';
import Feed from './Feed';

const Profile = ({ user_id }) => {
  // change url to         window.location.href + 'users/user'          for prod
  fetch(`http://localhost:3005/user/${user_id}`)
  .then(response => {
    return response.json();
  })
  .then(profile => {
    const result = JSON.parse(profile.posts);
    return result;
  });

  return (
    <div className='profile container'>
      <UserDetails user={'Michael'} />
      <Feed posts={[]} />
    </div>
  );
};

// Profile.propTypes = {

// };

export default Profile;
