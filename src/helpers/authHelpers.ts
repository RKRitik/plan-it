import { resetAuth, setLoading, updateUserInfo } from '../reducers/auth';
import { store } from '../reducers/store';
import { updateTask } from '../reducers/tasks';
import { GOOGLE_CLIENT_ID } from '@env';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const AUTH_CONSTANTS = {
  USER_INFO: 'user_info',
};

export async function getUserInfo() {
  store.dispatch(setLoading(true));
  // get data from secure storage
  // let userData = (await getLocalStorage(AUTH_CONSTANTS.USER_INFO)) || {};
  const currentUser = await GoogleSignin.getCurrentUser();
  store.dispatch(updateUserInfo(currentUser));
  store.dispatch(setLoading(false));
}

export async function configureSignIn() {
  let clientId = GOOGLE_CLIENT_ID;
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // google services are available
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: clientId, // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  } catch (err) {
    console.error('play services are not available');
  }
}

export async function handleSignIn() {
  try {
    const userInfo = await GoogleSignin.signIn();
    store.dispatch(updateUserInfo(userInfo));
  } catch (error: any) {
    console.error('error', error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
}

export async function handleSignOut() {
  try {
    await GoogleSignin.signOut();
    resetUserData();
  } catch (error) {
    console.error(error);
  }
}

export function resetUserData() {
  store.dispatch(resetAuth());
  store.dispatch(updateTask([]));
}
