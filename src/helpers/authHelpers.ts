import { setLoading, updateUserInfo } from '../reducers/auth';
import { store } from '../reducers/store';
import { getLocalStorage } from './storageHelpers';

export const AUTH_CONSTANTS = {
  USER_INFO: 'user_info',
};

export async function getUserInfo() {
  store.dispatch(setLoading(true));
  // get data from secure storage
  let userData = (await getLocalStorage(AUTH_CONSTANTS.USER_INFO)) || {};
  store.dispatch(updateUserInfo(userData));
  store.dispatch(setLoading(false));
}
