import { combineReducers } from '@reduxjs/toolkit';

import user, { userState } from './userSlice';

export const globalState = {
  user: userState
};

export default combineReducers({ user });
