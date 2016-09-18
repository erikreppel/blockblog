import React from 'react';
import Feed from './Feed';
import NavBar from './NavBar';
import { getCookie, DOMAIN } from '../helpers';
const ld = require('lodash');

const Home = React.createClass({
  propTypes: {
    user_id: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      posts: []
    };
  },

  getFollowedList: function() {
    return fetch(`${DOMAIN}users/${getCookie('logged_in_user_id')}`, {
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
      return profile.following;
    });
  },

  getAllFollowedPosts: function() {
    this.getFollowedList()
    .then(followed_ids => {
      // Remove duplicates
      const unique_ids = ld.uniq(followed_ids);
      return Promise.all(
        unique_ids.map(unique_id => {
          return this.getPostsForUserId(unique_id)
          .then(result => {
            return result;
          });
        })
      );
    })
    .then(postsForId => {
      const allPosts = [].concat.apply([], postsForId);
      this.setState({
        posts: allPosts
      });
    });
  },

  getPostsForUserId: function(user_id) {
    if (this.state.posts.length === 0) {
      // change url to         window.location.href + 'users/user'          for prod
      return fetch(`${DOMAIN}users/${user_id}`, {
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
            return fetch(`${DOMAIN}post?post_id=${post}&user_id=${user_id}`, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            })
            .then(response => {
              return response.json();
            });
          })
        );
      });
    }
  },

  onCreate: function(post) {
    this.setState({
      posts: [post, ...this.state.posts]
    });
  },

  render: function() {
    this.getAllFollowedPosts();

    return (
      <div className='home container'>
        <NavBar />
        <Feed posts={this.state.posts} onCreate={this.onCreate} />
      </div>
    );
  }
});

export default Home;
