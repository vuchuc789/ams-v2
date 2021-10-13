import { FACEBOOK_URL, LOGIN_TYPE } from '@constants';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from 'server/interfaces';

const authorizationFieldPrefix = 'Bearer ';

export const getAuthInfos = async <T = undefined>(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<T>>,
): Promise<boolean> => {
  const token = req.headers.authorization;
  const loginType = req.headers['x-auth-type'];

  if (!token) {
    return true;
  }

  if (!token.startsWith(authorizationFieldPrefix)) {
    res.json({ status: 'error', message: 'token invalid' });
    return false;
  }

  switch (loginType) {
    case LOGIN_TYPE.FACEBOOK.toString():
      const response = await fetch(
        `${FACEBOOK_URL}/me?access_token=${token.substring(
          authorizationFieldPrefix.length,
        )}&fields=id,name,email`,
      );
      const data: { [key: string]: unknown } = await response.json();

      if (data.id) {
        req.auth = { id: data.id, type: LOGIN_TYPE.FACEBOOK };
      }
  }

  return true;
};
