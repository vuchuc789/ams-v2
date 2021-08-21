import type { AsyncAction } from 'interfaces';
import { checkUser, FacebookService } from 'services';
import { LOGGING_IN, LOGGED_IN, LOGIN_TYPE } from '@constants';
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

      await checkUser(authResponse.accessToken, LOGIN_TYPE.FACEBOOK);

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

      await checkUser(authResponse.accessToken, LOGIN_TYPE.FACEBOOK);
    } else {
      if (loginIfNotDone) {
        // this case does not directly call callback function
        dispatch(popupFacebookLoginWindow(callback));
        return;
      }

      dispatch({ type: LOGGED_IN });
    }

    callback();
  };
