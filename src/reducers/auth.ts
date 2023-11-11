import { createSlice } from '@reduxjs/toolkit';

type authData = {
  isLoading: boolean;
  userToken: string;
  userInfo: any; // TODO: remove any type
};

const initialState: authData = {
  isLoading: true,
  userToken: '',
  userInfo: {},
};

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    updateToken(state, action) {
      state.userToken = action.payload;
    },
  },
});

export const { setLoading, updateToken } = AuthSlice.actions;
export default AuthSlice.reducer;
