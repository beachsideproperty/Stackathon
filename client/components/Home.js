import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className='main'>
      <div className='item-list'>
        <Link to='/signup'>Signup</Link>
      </div>
      <div className='welcome-page'>
        <div className='welcome'>
          <p>Hi, welcome to the site!</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
