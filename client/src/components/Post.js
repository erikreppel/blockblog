import React from 'react';
const moment = require('moment');

const Post = ({ post }) => {
  return (
    <div className='post'>
      <img
        className='avatar'
        alt='avatar'
        src='https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'>
      </img>
      <h1 className='username'>
        <a href={`http://localhost:3000/${post.user}`}>{post.user}</a>
      </h1>
      <p className='timestamp'>{moment(post.timestamp).fromNow()}</p>
      <p className='body'>{post.body}</p>
    </div>
  );
};

Post.propTypes = {
  // {
  //   user: '',
  //   user_id: '',
  //   body: '',
  //   timestamp: Date,
  //   url: '',
  //   tags: []
  // }
  post: React.PropTypes.object.isRequired
};

export default Post;