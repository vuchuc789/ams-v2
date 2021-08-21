import { LOGIN_TYPE } from '@constants';

export const checkUser = async (
  token: string,
  loginType: LOGIN_TYPE,
): Promise<void> => {
  await fetch(`/api/user?login_type=${loginType}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
