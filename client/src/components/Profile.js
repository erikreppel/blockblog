import React from 'react';
import Feed from './Feed'

const Profile = ({ profile }) => {
  const posts = [
    {
      user: 'Michael',
      user_id: '1',
      body: 'Hello, world!',
      timestamp: Date.now(),
      url: '',
      tags: []
    },
    {
      user: 'Erik',
      user_id: '2',
      body: 'Hello, world!',
      timestamp: Date.now(),
      url: '',
      tags: []
    },
    {
      user: 'Spence',
      user_id: '3',
      body: 'Hello, world!',
      timestamp: Date.now(),
      url: '',
      tags: []
    }
  ];

  return (
    <div className='profile'>
      <Feed posts={posts} />
    </div>
  );
};

Profile.propTypes = {
};

export default Profile;
