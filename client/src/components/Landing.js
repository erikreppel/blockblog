import React from 'react';

const Landing = () => {
  // let auth0 = new Auth0({
  //   domain:         'michaelreiter.auth0.com',
  //   clientID:       '98aRn2p8ptAZo7acb4Rb6mQYVIwSRh1m',
  //   callbackURL:    'http://localhost:3000/'
  // });

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
      <button className="button button-primary signin-db" onClick={() => {
        const username = userRef.value.trim();
        const password = passwordRef.value.trim();
        // auth0.signin({
        //   connection: 'foo',
        //   username: userRef,
        //   password: passwordRef
        // },
        // (err, profile, id_token, access_token, state) => {
        //     // store the profile and id_token in a cookie or local storage
        //     $.cookie('profile', profile);
        //     $.cookie('id_token', id_token);
        // });
      }}>Sign in</button>
    </div>
  );
};

export default Landing;
