import React from 'react';
import { getCookie, DOMAIN } from '../helpers';

const sendPost = body => {
  const post = {
    user: getCookie('username'),
    user_id: getCookie('logged_in_user_id'),
    body: body,
    timestamp: Date.now(),
    url: ''
  };

  return fetch(`${DOMAIN}post`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
  .then(response => {
    return response.json();
  })
  .then(json => {
    return post;
  });
}

const Create = ({ onCreate }) => {
  let inputRef;

  return (
    <div className='create'>
      <form onSubmit={e => {
        e.preventDefault();
        const body = inputRef.value.trim();
        if (!body) {
          return;
        }
        sendPost(body)
        .then(post => {
          onCreate(post);
        })
        inputRef.value = '';
      }}>
        <img
          className='avatar'
          alt='avatar'
          src='https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300&fm=png'>
        </img>
        <input type='text' placeholder='Speak your mind.' ref={node => {
          inputRef = node;
        }}/>
        <button
          className='button button-primary'
          type='submit'
          >Post</button>
      </form>
    </div>
  );
};

export default Create;
