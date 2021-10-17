import { LOGIN_TYPE } from '@constants';

export const checkUser = async (
  token: string,
  loginType: LOGIN_TYPE,
): Promise<void> => {
  await fetch(`/api/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-auth-type': loginType.toString(),
    },
  });
};
