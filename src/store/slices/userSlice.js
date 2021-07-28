/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {
    customerName: null,
    email: null,
    id: null,
    status: null,
    userName: null
  },
  signed: false,
  isLoading: false,
  errors: [],
  errorMessage: null,
  errorStatus: null,
  hasError: false,
  expiresIn: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LOGIN: state => ({ ...state, isLoading: true }),
    LOGIN_SUCCESS: (state, { payload: { userData, expiresIn } }) => ({
      ...state,
      userData,
      isLoading: false,
      signed: true,
      errors: [],
      hasError: false,
      errorMessage: null,
      errorStatus: null,
      expiresIn
    }),
    LOGIN_FAILURE(state, { payload: { errorMessage, errorStatus } }) {
      state.errorMessage = errorMessage;
      state.hasError = true;
      state.isLoading = false;
      state.errorStatus = errorStatus;
    },
    RESET_ERROR: state => ({
      ...state,
      errors: [],
      hasError: false,
      errorMessage: null,
      errorStatus: null
    })
  }
});

const { actions, reducer } = userSlice;
export const userState = initialState;
export const { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, RESET_ERROR } = actions;
export default reducer;
