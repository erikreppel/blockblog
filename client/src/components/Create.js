import React from 'react';

const sendPost = (body) => {
  console.log(body);
}

const Create = () => {
  let inputRef;
  let buttonIsEnabled;

  return (
    <div className='create'>
      <form onSubmit={e => {
        e.preventDefault();
        const body = inputRef.value.trim();
        buttonIsEnabled = !!body;
        console.log(buttonIsEnabled);
        if (!buttonIsEnabled) {
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
          disabled={buttonIsEnabled}
          >Post</button>
      </form>
    </div>
  );
};

export default Create;
