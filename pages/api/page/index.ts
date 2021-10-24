import { genSlug } from 'server/helpers';
import { Page, User } from 'server/models';
import { handler } from 'server/utils';
import { v4 as uuid } from 'uuid';

interface PageResponse {
  name: string;
  slug: string;
}

export default handler<PageResponse>(async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.json({ status: 'error', message: 'wrong http method' });
      return;
    }

    if (!req.auth) {
      res.json({ status: 'error', message: 'fail to auth' });
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

    const { name } = req.body as { name?: string };

    if (!name) {
      res.json({ status: 'error', message: 'missing page name' });
      return;
    }

    const slug = genSlug(name);

    let uniqueSlug = slug;

    while (await Page.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}--${uuid()}`;
    }

    const page = new Page({
      userId: user._id,
      name,
      slug: uniqueSlug,
    });

    const result = await page.save();

    res.json({
      status: 'success',
      message: 'page is created',
      data: { name: result.name, slug: result.slug },
    });
  } catch (error) {
    res.json({ status: 'error', message: 'something went wrong' });
  }
});
