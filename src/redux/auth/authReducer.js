import { createSlice } from '@reduxjs/toolkit';

const state = {
  userId: null,
  nickName: null,
  userEmail: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: {
    updateUserProfile(state, { payload }) {
      console.log('updateUserProfile payload: ', payload);

      return {
        ...state,
        userId: payload.userId,
        nickName: payload.nickName,
        userEmail: payload.email,
      };
    },
    authStateChange: (state, { payload }) => {
      console.log('authStateChange payload: ', payload);
      console.log('State:', { ...state });
      return {
        ...state,
        stateChange: payload.stateChange,
      };
    },
    authSignOut: () => state,
  },
});
