import React from 'react';
import Feed from './Feed'

const Home = () => {
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
    <div className='home'>
      <Feed posts={posts} />
    </div>
  );
};

Home.propTypes = {
};

export default Home;
