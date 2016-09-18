import React from 'react';
import Post from './Post';
import Create from './Create';
import { getCookie, sort } from '../helpers';

const Feed = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired,
    onCreate: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      posts: this.props.posts
    };
  },

  render: function() {
    return (
      <div className='feed'>
        {
          getCookie('logged_in_user_id') === getCookie('user_id') ?
            <Create onCreate={this.props.onCreate}/>
            : null
        }
        {
          this.props.posts.length === 0 ?
            'loading posts...' :
            sort(this.props.posts, 'timestamp').map(post => {
              return <Post post={post} key={post.timestamp} />
            })
        }
      </div>
    );
  }
});

export default Feed;
