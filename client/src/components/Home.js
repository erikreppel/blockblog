import React from 'react';
import Create from './Create';
import Feed from './Feed';

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
    <div className='home container'>
      <div className='newsfeed'>
        <Create />
        <Feed posts={posts} />
      </div>
    </div>
  );
};

Home.propTypes = {
  //user?
};

export default Home;
