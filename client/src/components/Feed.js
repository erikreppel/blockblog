import React from 'react';
import Post from './Post';

const Feed = () => {
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
    <div className='feed'>
      {
        posts.map(post => {
          return <Post post={post} key={post.user_id} />
        })
      }
    </div>
  );
};

export default Feed;
