import SInfo from 'react-native-sensitive-info';
import {
  ACCESS_TOKEN_KEY,
  USER_KEY,
  USER_ID
} from '@/helpers/constants/storageKeys';

const setUser = async user => {
  await SInfo.setItem(USER_KEY, JSON.stringify(user), {});
};

const getUser = async () => {
  const user = await SInfo.getItem(USER_KEY, {});
  return user ? JSON.parse(user) : undefined;
};

const setAccessToken = async token => {
  await SInfo.setItem(ACCESS_TOKEN_KEY, token, {});
};

const getAccessToken = () => {
  return SInfo.getItem(ACCESS_TOKEN_KEY, {});
};

const clear = async () => {
  await SInfo.deleteItem(ACCESS_TOKEN_KEY, {});

  const user = await getUser();
  await SInfo.deleteItem(USER_KEY, {});
  if (user) await setUser({ userName: user.userName });
};

const setUserId = async userId => {
  await SInfo.setItem(USER_ID, JSON.stringify(userId), {});
};

const getUserId = () => {
  return SInfo.getItem(USER_ID, {});
};

export default {
  setAccessToken,
  getAccessToken,
  setUser,
  getUser,
  clear,
  setUserId,
  getUserId
};
