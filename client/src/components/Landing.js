import React from 'react';
import Auth0 from 'auth0-js';

const Landing = () => {
  let auth0 = new Auth0({
    domain:         'erikreppel.auth0.com',
    clientID:       'M3Iy4EYCRTD7uaGpBCE5nfAXMsCukFAV',
    callbackURL:    `${window.location.href}callback`
  });

  let userRef;
  let passwordRef;

  return (
    <div className='landing row'>
      <h1>// block_blog</h1>
      <input type="text" placeholder="Email" ref={node => {
        userRef = node;
      }}/>
      <br />
      <input type="password" placeholder="Password" ref={node => {
        passwordRef = node;
      }}/>
      <br />
      <button id='login' className="button button-primary" onClick={() => {
        const username = userRef.value.trim();
        const password = passwordRef.value.trim();
        auth0.login({
          connection: 'db-conn',
          username: userRef,
          password: passwordRef
        });
      }}>Log in</button>
      <button id='signup' className="button button-primary" onClick={() => {
        const username = userRef.value.trim();
        const password = passwordRef.value.trim();
        auth0.signup({
          connection: 'db-conn',
          username: userRef,
          password: passwordRef
        });
      }}>Sign up</button>
      <button id='Google' className="button button-primary" onClick={() => {
        const username = userRef.value.trim();
        const password = passwordRef.value.trim();
        // console.log(username, password);
        auth0.login({
          connection: 'google-oauth2'
        });
      }}>Sign in with Google</button>
    </div>
  );
};

export default Landing;
