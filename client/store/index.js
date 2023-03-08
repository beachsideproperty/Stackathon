import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import auth from './slices/auth';
import usersReducer from './slices/users';

const store = configureStore({
  reducer: {
    auth: auth,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger()),
});

export default store;
export * from './slices/auth';
