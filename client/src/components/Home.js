import React from 'react';
import Feed from './Feed';

const Home = () => {
  const posts = [
    {
      user: 'Michael',
      user_id: '1',
      body: 'Hello, world!',
      timestamp: Date.now() - 1,
      url: '',
      tags: []
    },
    {
      user: 'Erik',
      user_id: '2',
      body: 'Hello, world!',
      timestamp: Date.now() - 2,
      url: '',
      tags: []
    },
    {
      user: 'Spence',
      user_id: '3',
      body: 'Hello, world!',
      timestamp: Date.now() - 3,
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
  //user?
};

export default Home;
