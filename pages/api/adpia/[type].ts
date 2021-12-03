import { User } from 'server/models';
import { handler } from 'server/utils';
import { getPromotions } from 'services';

interface AdpiaResponse {
  merchants: { [key: string]: unknown }[];
  promotions: { [key: string]: unknown }[];
  orders: { [key: string]: unknown }[];
}

export default handler<Partial<AdpiaResponse>>(async (req, res) => {
  try {
    if (req.method !== 'GET') {
      res.json({ status: 'error', message: 'wrong http method' });
      return;
    }

    const type = req.query.type as string;

    if (!type || typeof type !== 'string') {
      res.json({ status: 'error', message: 'type not found' });
      return;
    }

    if (type === 'merchant') {
      const merchantId = req.query.mid as string;

      if (!merchantId) {
        res.json({
          status: 'success',
          message: 'missing search query or adpia access token not found',
          data: { promotions: [] },
        });
        return;
      }
    }

    if (!req.auth) {
      res.json({ status: 'error', message: 'fail to authenticate' });
      return;
    }

    const user = await User.findOne({
      authId: req.auth.id,
      authType: req.auth.type,
    });

    if (!user) {
      res.json({ status: 'error', message: 'user not found' });
      return;
    }

    switch (type) {
      case 'promotion':
        const merchantId = req.query.mid as string;

        if (!merchantId || !user.adpiaAccessToken) {
          res.json({
            status: 'success',
            message: 'missing search query or adpia access token not found',
            data: { promotions: [] },
          });
          break;
        }

        const promotions = await getPromotions(
          merchantId,
          user.adpiaAccessToken,
        );

        res.json({
          status: 'success',
          message: 'got promotions successfully',
          data: {
            promotions,
          },
        });

        break;

      default:
        res.json({ status: 'error', message: 'wrong query' });
    }
  } catch (e) {
    res.json({ status: 'error', message: 'something went wrong' });
  }
});
