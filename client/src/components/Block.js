import React from 'react';

const Block = ({ block }) => {
  return (
    <div className='block'>
      <p>{block.user}</p>
    </div>
  );
};

Block.propTypes = {
  // {
  //   user: '',
  //   user_id: '',
  //   body: '',
  //   timestamp: Date,
  //   url: '',
  //   tags: []
  // }
  block: React.PropTypes.object.isRequired
};

export default Block;
