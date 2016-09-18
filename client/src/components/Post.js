import React from 'react';
const moment = require('moment');
import { DOMAIN } from '../helpers';

const Post = ({ post }) => {
  const postDetails = `${moment(post.timestamp).fromNow()} - uid: ${post.user_id}`;
  return (
    <div className='post'>
      <img
        className='avatar'
        alt='avatar'
        src='https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'>
      </img>
      <h1 className='username'>
        <a href={`${DOMAIN}${post.user_id}`}>{post.user}</a>
      </h1>
      <p className='timestamp'>{postDetails}</p>
      <p className='body'>{post.body}</p>
    </div>
  );
};

Post.propTypes = {
  // {
  //   username: '',
  //   user_id: '',
  //   body: '',
  //   timestamp: Date,
  //   url: ''
  // }
  post: React.PropTypes.object.isRequired
};

export default Post;
