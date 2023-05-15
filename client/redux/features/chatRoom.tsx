import { createSlice } from '@reduxjs/toolkit';

interface types {
  chatRoom: string;
}

const initialState: types = {
  chatRoom: '',
};

export const chatRoomSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatRoom: (state, action) => {
      state.chatRoom = action.payload;
    },
  },
});

export const { setChatRoom } = chatRoomSlice.actions;

export default chatRoomSlice.reducer;
