import React from 'react';
import { useSelector } from 'react-redux';

export const Main = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <div className='banner'>
        <h2>
          {user ? `Welcome back, ${user.firstName}!` : 'Browse all products'}
        </h2>
      </div>
    </div>
  );
};

export default Main;
