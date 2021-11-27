import { handler } from 'server/utils';
import { User } from 'server/models';

interface UserResponse {
  adpiaId: string;
  adpiaUsername: string;
  adpiaAccessToken: string;
}

export default handler<Partial<UserResponse>>(async (req, res) => {
  try {
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
    }

    switch (req.method) {
      case 'GET': {
        let { adpiaId, adpiaUsername, adpiaAccessToken } = user;
        res.json({
          status: 'success',
          message: 'user is valid',
          data:
            !!adpiaId || !!adpiaUsername || !!adpiaAccessToken
              ? { adpiaId, adpiaUsername, adpiaAccessToken }
              : undefined,
        });
        break;
      }
      case 'PUT':
      case 'PATCH': {
        const { adpiaId, adpiaUsername, adpiaAccessToken } = req.body;
        if (!adpiaId && !adpiaUsername && !adpiaAccessToken) {
          res.json({
            status: 'error',
            message: 'no change is found',
          });
          break;
        }

        if (!!adpiaId) {
          user.adpiaId = adpiaId;
        }

        if (!!adpiaUsername) {
          user.adpiaUsername = adpiaUsername;
        }

        if (!!adpiaAccessToken) {
          user.adpiaAccessToken = adpiaAccessToken;
        }

        const {
          adpiaId: savedId,
          adpiaUsername: savedUsername,
          adpiaAccessToken: savedAccessToken,
        } = await user.save();

        res.json({
          status: 'success',
          message: 'updated successfully',
          data:
            !!savedId || !!savedUsername || !!savedAccessToken
              ? {
                  adpiaId: savedId,
                  adpiaUsername: savedUsername,
                  adpiaAccessToken: savedAccessToken,
                }
              : undefined,
        });
        break;
      }

      default:
        res.json({ status: 'error', message: 'wrong http method' });
    }
  } catch (error) {
    res.json({ status: 'error', message: 'something went wrong' });
  }
});
