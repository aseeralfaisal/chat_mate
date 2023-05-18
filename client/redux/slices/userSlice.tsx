import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface types {
  username: string;
  recieverName: string;
  users: string[];
}

const initialState: types = {
  username: '',
  recieverName: '',
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
    setRecieverName: (state, action) => {
      state.recieverName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action,
      };
    });
  },
});

export const { setUserName, setRecieverName, setUsers } = userSlice.actions;

export default userSlice.reducer;
