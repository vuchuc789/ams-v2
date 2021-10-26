import { genSlug } from 'server/helpers';
import { Page, User } from 'server/models';
import { handler } from 'server/utils';
import { v4 as uuid } from 'uuid';

interface PageResponse {
  name: string;
  slug: string;
  pages: { name: string; slug: string }[];
}

export default handler<Partial<PageResponse>>(async (req, res) => {
  try {
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

    switch (req.method) {
      case 'POST':
        const { name } = req.body as { name?: string };

        if (!name) {
          res.json({ status: 'error', message: 'missing page name' });
          break;
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
        break;

      case 'GET':
        const pages = await Page.find({ userId: user._id });

        res.json({
          status: 'success',
          message: 'this is your pages',
          data: { pages: pages.map(({ name, slug }) => ({ name, slug })) },
        });
        break;

      default:
        res.json({ status: 'error', message: 'wrong http method' });
    }
  } catch (error) {
    res.json({ status: 'error', message: 'something went wrong' });
  }
});
