import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface types {
  username: string;
  toUsername: string;
}

const initialState: types = {
  username: '',
  toUsername: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload;
    },
    setToUserName: (state, action) => {
      state.toUsername = action.payload;
    },
  },
});

export const { setUserName, setToUserName } = userSlice.actions;

export default userSlice.reducer;
