import { all, call, put, takeEvery } from 'redux-saga/effects';
import Credentials from '@/store/Credentials';

import api from '@/services/api';

import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from '@/store/slices/userSlice';

export function* login({ payload: { username, password } }) {
  try {
    const {
      data: { name, email }
    } = yield call(api.get, `users`);

    if (
      username === 'alexandreacm.marques@gmail.com' &&
      password === '123456'
    ) {
      const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV';

      const userData = {
        id: '1832',
        customerName: 'loja001',
        status: 1,
        userName: 'loja001',
        email: 'alexandremarques@gmail.com.br'
      };

      const { userName, id } = userData;

      yield call(Credentials.setAccessToken, accessToken);
      yield call(Credentials.setUser, { userName });
      yield call(Credentials.setUserId, { userId: id });

      yield put(
        LOGIN_SUCCESS({
          userData,
          expiresIn: 60
        })
      );
    } else {
      throw new Error('Não foi possivel logar');
    }
  } catch (error) {
    yield put(
      LOGIN_FAILURE({
        hasError: true,
        errorMessage: error.response
          ? error.response.data.message
          : 'Não foi possivel autenticar no app',
        status: error.response ? error.response.status : 400
      })
    );
  }
}

export default function* watcher() {
  yield all([takeEvery(LOGIN, login)]);
}
