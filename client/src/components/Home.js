import React from 'react';
import Feed from './Feed'

const Home = () => {
  const posts = [
    {
      user: 'Michael',
      user_id: '1',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      timestamp: Date.now(),
      url: '',
      tags: []
    },
    {
      user: 'Erik',
      user_id: '2',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      timestamp: Date.now(),
      url: '',
      tags: []
    },
    {
      user: 'Spence',
      user_id: '3',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      timestamp: Date.now(),
      url: '',
      tags: []
    }
  ];

  return (
    <div className='home container'>
      <Feed posts={posts} />
    </div>
  );
};

Home.propTypes = {
};

export default Home;
