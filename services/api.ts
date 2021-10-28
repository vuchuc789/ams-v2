import { LOGIN_TYPE } from '@constants';
import { ResponseData } from 'server/interfaces';

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

export const getPages = async (
  token: string,
  loginType?: LOGIN_TYPE,
): Promise<{ name: string; slug: string }[]> => {
  if (typeof loginType === 'undefined') {
    throw new Error('login type is undefined');
  }

  const res = await fetch('/api/page', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'x-auth-type': loginType.toString(),
    },
  });

  const jsonRes: ResponseData = await res.json();

  return await res.json();
};
