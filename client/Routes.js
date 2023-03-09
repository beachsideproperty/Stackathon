import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AuthForm, Home, Main, CloudGame } from './components';
import { getUserByToken } from './store';
import { isLoggedIn } from './utils';

const Router = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(getUserByToken());
    }
  }, []);

  if (user && user.role === 'admin') {
    return (
      <Routes>
        <Route path='/cloud' element={<CloudGame />} />
        <Route path='/main' element={<Main />} />
        <Route path='*' element={<Home />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route exact path='/login' element={<AuthForm mode='login' />} />
        <Route exact path='/signup' element={<AuthForm mode='signup' />} />
        <Route path='/cloud' element={<CloudGame />} />
        <Route path='/main' element={<Main />} />
        <Route path='*' element={<Home />} />
      </Routes>
    );
  }
};

export default Router;
