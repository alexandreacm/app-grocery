import { all, call, put, takeEvery } from 'redux-saga/effects';

// eslint-disable-next-line import/no-unresolved
import { API_KEY } from '@env';

import {
  LOADING_MOVIES,
  LOADING_MOVIES_SUCCESS,
  LOADING_MOVIES_FAILURE
} from '@/store/slices/movieSlice';

import api from '../../services/api';

export function* loadingMovies({ payload: { title } }) {
  try {
    const response = yield call(api.get, `/?apikey=${API_KEY}&s=${title}`);
    let moviesData = [];

    const {
      data: { Error }
    } = response;

    if (!Error) {
      const {
        data: { Search }
      } = response;

      moviesData = Search;
    }

    yield put(
      LOADING_MOVIES_SUCCESS({
        moviesData
      })
    );
  } catch (error) {
    yield put(
      LOADING_MOVIES_FAILURE({
        hasError: true,
        errorMessage: error.response
          ? error.response.data.message
          : 'Não conseguimos carregar os dados dos filmes',
        status: error.response ? error.response.status : 400
      })
    );
  }
}

export default function* watcher() {
  yield all([takeEvery(LOADING_MOVIES, loadingMovies)]);
}
