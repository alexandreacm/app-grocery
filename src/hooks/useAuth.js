import { useSelector, useDispatch } from 'react-redux';

import { LOGIN, RESET_ERROR } from '@/store/slices/userSlice';
import { useCallback } from 'react';

const useAuth = () => {
  const dispatch = useDispatch();
  const {
    userData,
    signed,
    isLoading,
    errors,
    errorMessage,
    hasError,
    expiresIn
  } = useSelector(({ user }) => user);

  const signIn = useCallback(payload => dispatch(LOGIN(payload)), [dispatch]);
  const resetError = useCallback(() => dispatch(RESET_ERROR()), [dispatch]);

  return {
    userData,
    signed,
    isLoading,
    errors,
    errorMessage,
    hasError,
    expiresIn,
    signIn,
    resetError
  };
};

export default useAuth;
