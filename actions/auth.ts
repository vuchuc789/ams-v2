import { notification } from 'antd';
import { AppDispatch } from 'interfaces';
import { ActionType } from '@constants';

const { LOGIN } = ActionType;

export const loginWithFacebook = (dispatch: AppDispatch) => {
  if (!FB) {
    notification.error({
      message: 'Error',
      description: 'Facebook is not available',
    });

    return;
  }

  FB.getLoginStatus((response) => {
    console.log(response);
    dispatch({ type: LOGIN, payload: {} });
  });
};
