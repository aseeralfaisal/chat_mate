import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

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
