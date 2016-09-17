import React from 'react';

const Landing = () => {
  return (
    <div className='landing'>
      <label>Email</label>
      <input type="text" id="email" />
      <label>Password</label>
      <input type="password" id="password" />
      <button className="signin-db">Sign in</button>
    </div>
  );
}

export default Landing;
