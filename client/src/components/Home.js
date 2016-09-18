import React from 'react';
import Feed from './Feed';

const Home = () => {
  return (
    <div className='home container'>
      <Feed posts={posts} />
    </div>
  );
};

// Home.propTypes = {
//   //user?
// };

export default Home;
