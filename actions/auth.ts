import type { AsyncAction } from 'interfaces';
import { FacebookService } from 'services';
import { LOGGING_IN, LOGGED_IN } from '@constants';
import { notifyError, notifySuccess } from './notification';

const popupFacebookLoginWindow =
  (callback = () => {}): AsyncAction =>
  async (dispatch, getState) => {
    const facebookService = FacebookService.getInstance();
    if (!facebookService) {
      dispatch(notifyError('Fail to login with Facebook'));
      return;
    }

    const {
      authReducer: { isLoggingIn },
    } = getState();

    if (!isLoggingIn) {
      dispatch({ type: LOGGING_IN });
    }

    const { status, authResponse } = await facebookService.login();

    if (status === 'connected') {
      dispatch({ type: LOGGED_IN, payload: authResponse });
      dispatch(notifySuccess('Login with facebook successfully'));

      callback();
      return;
    }

    dispatch(notifyError('Fail to login with Facebook'));
    dispatch({ type: LOGGED_IN });

    callback();
  };

export const loginWithFacebook =
  (
    {
      loginIfNotDone,
    }: {
      loginIfNotDone: boolean;
    },
    callback = () => {},
  ): AsyncAction =>
  async (dispatch) => {
    const facebookService = FacebookService.getInstance();
    if (!facebookService) {
      dispatch(
        notifyError('Logging in with Facebook is currently unavailable'),
      );
      return;
    }

    dispatch({ type: LOGGING_IN });

    const { status, authResponse } = await facebookService.getLoginStatus();

    if (status === 'connected') {
      dispatch({ type: LOGGED_IN, payload: authResponse });

      callback();
      return;
    }

    if (loginIfNotDone) {
      dispatch(popupFacebookLoginWindow(callback));
      return;
    }

    dispatch({ type: LOGGED_IN });

    callback();
  };
