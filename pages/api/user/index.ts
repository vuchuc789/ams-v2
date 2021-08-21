import type { ResponseData } from 'server/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next';
import { handler } from 'server/utils';
import { FACEBOOK_URL } from '@constants';
import { LOGIN_TYPE } from '@constants';
import { User } from 'server/models';

const authorizationFieldPrefix = 'Bearer ';

export default handler(
  async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
  ): Promise<void> => {
    const token = req.headers.authorization;
    if (!token) {
      res.json({ status: 'error', message: 'token not found' });
      return;
    }

    if (!token.startsWith(authorizationFieldPrefix)) {
      res.json({ status: 'error', message: 'token invalid' });
      return;
    }

    switch (req.query.login_type) {
      case LOGIN_TYPE.FACEBOOK.toString():
        const response = await fetch(
          `${FACEBOOK_URL}/me?access_token=${token.substring(
            authorizationFieldPrefix.length,
          )}&fields=id,name,email`,
        );
        const data: { [key: string]: unknown } = await response.json();

        if (!data.id) {
          res.json({ status: 'error', message: 'failure to authenticate' });
          break;
        }

        let user = await User.findOne({
          authType: LOGIN_TYPE.FACEBOOK,
          authId: data.id as string,
        });

        if (!user) {
          user = new User({
            authType: LOGIN_TYPE.FACEBOOK,
            authId: data.id,
            name: data.name,
            email: data.email,
          });

          await user.save();

          res.json({
            status: 'success',
            message: 'user is created',
          });
          break;
        }

        res.json({
          status: 'success',
          message: 'user found',
        });
        break;

      default:
        res.json({ status: 'error', message: 'login type not found' });
    }
  },
);
