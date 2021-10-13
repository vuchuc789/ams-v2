import { ResponseData } from 'server/interfaces';
import { handler } from 'server/utils';

export default handler<ResponseData>((req, res) => {
  if (req.method !== 'POST') {
    res.json({ status: 'error', message: 'wrong http method' });
    return;
  }

  const {} = req.body as { name?: string; hashedContent?: string };

  res.json({ status: 'success', message: 'hello' });
});
