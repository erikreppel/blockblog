import React from 'react';
import Auth0 from 'auth0-js';
import { DOMAIN } from '../helpers';

const Landing = () => {
  let auth0 = new Auth0({
    domain:         'erikreppel.auth0.com',
    clientID:       '35xtzL9xQ3onulOU5JhFrLgrKni1Lrya',
    callbackURL:    `${DOMAIN}callback`
  });
  
  return (
    <div className='landing row'>
      <h1>// block_blog</h1>
      <button id='Google' className="button button-primary" onClick={() => {
        auth0.login({
          connection: 'google-oauth2'
        });
      }}>Sign in with Google</button>
    </div>
  );
};

export default Landing;
