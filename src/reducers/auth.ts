import { createSlice } from '@reduxjs/toolkit';

type authData = {
  isLoading: boolean;
  userInfo: any; // TODO: remove any type
};

const initialState: authData = {
  isLoading: true,
  userInfo: {},
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
  },
});

export const { setLoading, updateUserInfo } = AuthSlice.actions;
export default AuthSlice.reducer;
