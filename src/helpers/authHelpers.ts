import { setLoading } from '../reducers/auth';
import { store } from '../reducers/store';

export function getUserInfo() {
  store.dispatch(setLoading(true));
  // get data from secure storage
  let userInfo = { userToken: '' };
}
