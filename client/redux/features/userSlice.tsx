import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface types {
  username: string;
  toUsername: string;
  users: any;
}

const initialState: types = {
  username: '',
  toUsername: '',
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUserName: (state, action) => {
      state.username = action.payload;
    },
    setToUserName: (state, action) => {
      state.toUsername = action.payload;
    },
  },
});

export const { setUserName, setToUserName, setUsers } = userSlice.actions;

export default userSlice.reducer;
