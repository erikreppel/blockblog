import React from 'react';

const sendPost = (body) => {
  // change url to         window.location.href + 'post'      for prod
  fetch('http://localhost:3005/post', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: 'Michael',
      user_id: '123',
      body: body,
      timestamp: Date.now(),
      url: '',
      tags: []
    })
  })
  .then(response => {
    return response.json();
  })
  .then(json => {
    console.log(json);
  });
}

const Create = () => {
  let inputRef;

  return (
    <div className='create'>
      <form onSubmit={e => {
        e.preventDefault();
        const body = inputRef.value.trim();
        if (!body) {
          return;
        }
        sendPost(body);
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
