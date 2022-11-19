import { configureStore } from '@reduxjs/toolkit';
import { chatRoomSlice } from './features/chatRoom';
import { userSlice } from './features/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chat: chatRoomSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
