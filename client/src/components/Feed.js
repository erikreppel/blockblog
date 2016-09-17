import React from 'react';
import Block from './Block';

const Feed = () => {
  const blocks = [
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
        blocks.map(block => {
          return <Block block={block} />
        })
      }
    </div>
  );
};

export default Feed;
