import { handler } from 'server/utils';
import { User } from 'server/models';

export default handler(async (req, res) => {
  if (req.method !== 'GET') {
    res.json({ status: 'error', message: 'wrong http method' });
    return;
  }

  if (!req.auth) {
    res.json({ status: 'error', message: 'fail to authenticate' });
    return;
  }

  let user = await User.findOne({
    authType: req.auth.type,
    authId: req.auth.id,
  });

  if (!user) {
    user = new User({
      authType: req.auth.type,
      authId: req.auth.id,
      name: req.auth.name,
      email: req.auth.email,
    });

    await user.save();

    res.json({
      status: 'success',
      message: 'user is created',
    });
  } else {
    res.json({
      status: 'success',
      message: 'user found',
    });
  }
});
