import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {
  AuthForm,
  Home,
  Dashboard,
  CloudGame,
  CalendarPage,
  Meditate,
  Journal,
  MoodForm,
  DailyWord,
} from './components';
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

  if (user) {
    return (
      <Routes>
        <Route exact path='/login' element={<AuthForm mode='login' />} />
        <Route exact path='/signup' element={<AuthForm mode='signup' />} />
        <Route path='/wotd' element={<DailyWord />} />
        <Route path='/mood-form/:date' element={<MoodForm />} />
        <Route path='/journal' element={<Journal />} />
        <Route path='/meditate' element={<Meditate />} />
        <Route path='/calendar' element={<CalendarPage />} />
        <Route path='/cloud' element={<CloudGame />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Home />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route exact path='/login' element={<AuthForm mode='login' />} />
        <Route exact path='/signup' element={<AuthForm mode='signup' />} />
        <Route path='/meditate' element={<Meditate />} />
        <Route path='/cloud' element={<CloudGame />} />
        <Route path='*' element={<Home />} />
      </Routes>
    );
  }
};

export default Router;
