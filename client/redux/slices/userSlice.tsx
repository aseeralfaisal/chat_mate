import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
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
      state.userName = action.payload;
    },
    setRecieverName: (state, action) => {
      state.recieverName = action.payload;
    },
  },
});

export const { setUserName, setRecieverName, setUsers } = userSlice.actions;

export default userSlice.reducer;
