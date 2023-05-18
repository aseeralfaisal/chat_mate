import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, Persistor } from 'redux-persist';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { chatRoomSlice } from './slices/chatRoom';
import { userSlice } from './slices/userSlice';

type StoreType = {
  __persistor: Persistor;
};

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [chatRoomSlice.name]: chatRoomSlice.reducer,
});

const makeStore = () => {
  const isServer = typeof window === 'undefined';
  const middleware = [thunk];
  const devTools = true;

  if (!isServer) {
    const persistConfig = {
      key: 'root',
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = configureStore({
      reducer: persistedReducer,
      devTools,
    });

    (store as unknown as StoreType).__persistor = persistStore(store);
    return store;
  }

  return configureStore({
    reducer: rootReducer,
    middleware,
    devTools,
  });
};

const wrapper = createWrapper(makeStore);

export { wrapper };
