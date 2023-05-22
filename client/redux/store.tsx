import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { chatRoomSlice } from './slices/chatRoom';
import { userSlice } from './slices/userSlice';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  chat: chatRoomSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
