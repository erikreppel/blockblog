import React from 'react';
import Post from './Post';
import Create from './Create';

const Feed = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired,
    onCreate: React.PropTypes.func
  },

  getInitialState:function() {
    return {
      posts: this.props.posts
    };
  },

  render: function() {
    // console.log(this.props.posts);
    return (
      <div className='feed'>
        <Create onCreate={this.props.onCreate}/>
        {
          this.props.posts.map(post => {
            return <Post post={post} key={post.timestamp} />
          })
        }
      </div>
    );
  }
});

export default Feed;
