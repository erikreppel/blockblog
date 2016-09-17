import React from 'react';
import UserDetails from './UserDetails';
import Feed from './Feed';

const Profile = React.createClass({
  propTypes: {
    user_id: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {

    };
  },

  render: function() {
    // change url to         window.location.href + 'users/user'          for prod
    let posts = [];
    const user_id = this.props.user_id;

    fetch(`http://localhost:3005/users/${user_id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(profile => {
      return profile.posts;
    })
    .then(result => {
      return Promise.all(
        result.map(post => {
          return fetch(`http://localhost:3005/post?post_id=${post}&user_id=${user_id}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            return response.json();
          })
        })
      );
    })
    .then(result => {
      posts = result;
      console.log(posts);
    });

    return (
      <div className='profile container'>
        <UserDetails user={user_id} />
        <Feed posts={posts} />
      </div>
    );
  }
});

export default Profile;
