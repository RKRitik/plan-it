import { User } from '@react-native-google-signin/google-signin/lib/typescript/src/types';
import { createSlice } from '@reduxjs/toolkit';

type authData = {
  isLoading: boolean;
  userInfo?: User; // TODO: remove any type
};

const initialState: authData = {
  isLoading: true,
  userInfo: undefined,
};

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    updateUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    resetAuth(state) {
      state.isLoading = false;
      state.userInfo = undefined;
    },
  },
});

export const { setLoading, updateUserInfo, resetAuth } = AuthSlice.actions;
export default AuthSlice.reducer;
