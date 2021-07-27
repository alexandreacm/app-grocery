/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

const reactotron = Reactotron.configure()
  .useReactNative()
  .use(reactotronRedux())
  .use(reactotronSaga());

if (__DEV__) {
  reactotron.connect();
}

export default reactotron;
