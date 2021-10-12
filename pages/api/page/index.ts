import { ResponseData } from 'server/interfaces';
import { handler } from 'server/utils';

export default handler<ResponseData>((req, res) => {
  res.json({ status: 'success', message: 'hello' });
});
