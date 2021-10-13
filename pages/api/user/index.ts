import { handler } from 'server/utils';
import { FACEBOOK_URL } from '@constants';
import { LOGIN_TYPE } from '@constants';
import { User } from 'server/models';

export default handler(async (req, res) => {
  if (req.method !== 'GET') {
    res.json({ status: 'error', message: 'wrong http method' });
    return;
  }

  switch (req.query.login_type) {
    case LOGIN_TYPE.FACEBOOK.toString():
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
});
