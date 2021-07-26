import type { AppProps } from 'next/app';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { notification } from 'antd';
import { NOTIFICATION_DURATION, NOTIFICATION_PLACEMENT } from '@constants';

import 'antd/dist/antd.css';
import '../styles/globals.scss';

import rootReducer from 'reducers';

const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    notification.config({
      placement: NOTIFICATION_PLACEMENT,
      duration: NOTIFICATION_DURATION,
    });
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
