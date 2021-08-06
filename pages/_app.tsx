import '../styles/globals.scss';
import 'antd/dist/antd.css';
import rootReducer from 'reducers';
import thunk from 'redux-thunk';
import type { AppProps } from 'next/app';
import { NOTIFICATION_DURATION, NOTIFICATION_PLACEMENT } from '@constants';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { notification } from 'antd';
import { useEffect } from 'react';
import { Initialization } from 'components';

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
      <Initialization>
        <Component {...pageProps} />
      </Initialization>
    </Provider>
  );
};

export default App;
