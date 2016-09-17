import React from 'react';
import Post from './Post';
import Create from './Create';

const Feed = React.createClass({
  getInitialState:function() {
    return {
      posts: this.props.posts
    };
  },

  onCreate: function(post) {
    this.setState({
      posts: [post, ...this.state.posts]
    });
  },

  render: function() {
    return (
      <div className='feed'>
        <Create onCreate={this.onCreate}/>
        {
          this.state.posts.map(post => {
            return <Post post={post} key={post.timestamp} />
          })
        }
      </div>
    );
  }
});

export default Feed;
