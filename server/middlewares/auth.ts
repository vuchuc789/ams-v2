import { FACEBOOK_URL, LOGIN_TYPE } from '@constants';
import { NextApiResponse } from 'next';
import { CustomRequest, ResponseData } from 'server/interfaces';

const authorizationFieldPrefix = 'Bearer ';

export const getAuthInfos = async <T = undefined>(
  req: CustomRequest,
  res: NextApiResponse<ResponseData<T>>,
): Promise<boolean> => {
  const token = req.headers.authorization;
  const loginType = req.headers['x-auth-type'];

  if (!token) {
    return true;
  }

  if (!token.startsWith(authorizationFieldPrefix)) {
    res.json({ status: 'error', message: 'invalid token' });

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

      if (!data.id) {
        res.json({ status: 'error', message: 'fail to authenticate' });

        return false;
      }

      req.auth = {
        id: data.id as string,
        type: LOGIN_TYPE.FACEBOOK,
        name: data.name as string,
        email: data.email as string,
      };
      break;

    default:
      res.json({ status: 'error', message: 'login type not found' });

      return false;
  }

  return true;
};
