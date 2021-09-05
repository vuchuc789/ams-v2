import type { AsyncAction } from 'interfaces';
import { checkUser, FacebookService } from 'services';
import {
  LOGGING_IN,
  LOGGED_IN,
  LOGIN_TYPE,
  LOGOUT,
  SET_USER_INFO,
  CLEAR_USER_INFO,
} from '@constants';
import { notifyError, notifySuccess } from './notification';

const popupFacebookLoginWindow =
  (callback = () => {}): AsyncAction =>
  async (dispatch, getState) => {
    try {
      const facebookService = FacebookService.getInstance();
      if (!facebookService) {
        dispatch(notifyError('Fail to login with Facebook'));
      } else {
        const {
          auth: { isLoggingIn },
        } = getState();

        if (!isLoggingIn) {
          dispatch({ type: LOGGING_IN });
        }

        const { status, authResponse } = await facebookService.login();

        if (status === 'connected') {
          dispatch({ type: LOGGED_IN, payload: authResponse });

          await checkUser(authResponse.accessToken, LOGIN_TYPE.FACEBOOK);

          dispatch(notifySuccess('Login with facebook successfully'));

          const userInfo = await facebookService.getUserInfo();

          dispatch({ type: SET_USER_INFO, payload: userInfo });
        } else {
          dispatch(notifyError('Fail to login with Facebook'));
          dispatch({ type: LOGGED_IN });
        }
      }
    } catch (e) {
      dispatch(notifyError((e as Error).message));
    } finally {
      callback();
    }
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
    try {
      const facebookService = FacebookService.getInstance();
      if (!facebookService) {
        dispatch(
          notifyError('Logging in with Facebook is currently unavailable'),
        );
      } else {
        dispatch({ type: LOGGING_IN });

        const { status, authResponse } = await facebookService.getLoginStatus();

        if (status === 'connected') {
          dispatch({ type: LOGGED_IN, payload: authResponse });

          await checkUser(authResponse.accessToken, LOGIN_TYPE.FACEBOOK);

          const userInfo = await facebookService.getUserInfo();

          dispatch({ type: SET_USER_INFO, payload: userInfo });
        } else {
          if (loginIfNotDone) {
            // this case does not directly call callback function
            dispatch(popupFacebookLoginWindow(callback));
            return;
          }

          dispatch({ type: LOGGED_IN });
        }
      }
    } catch (e) {
      dispatch(notifyError((e as Error).message));
    } finally {
      callback();
    }
  };

export const logout = (): AsyncAction => async (dispatch) => {
  try {
    const facebookService = FacebookService.getInstance();
    if (!facebookService) {
      dispatch(
        notifyError('Logging out with Facebook is currently unavailable'),
      );
    } else {
      await facebookService.logout();
      dispatch({ type: LOGOUT });
      dispatch({ type: CLEAR_USER_INFO });
      dispatch(notifySuccess('You are logged out'));
    }
  } catch (e) {
    dispatch(notifyError((e as Error).message));
  }
};
