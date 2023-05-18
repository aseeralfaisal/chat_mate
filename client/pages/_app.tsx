import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <PersistGate persistor={store.__persistor}>
      <Component {...pageProps} />
    </PersistGate>
  );
}

export default wrapper.withRedux(App);
