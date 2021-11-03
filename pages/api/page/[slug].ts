import { genSlug } from 'server/helpers';
import { Page, User } from 'server/models';
import { handler } from 'server/utils';
import { v4 as uuid } from 'uuid';

interface PageResponse {
  name: string;
  slug: string;
  content: string;
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

    const slug = req.query.slug as string;

    if (!slug || typeof slug !== 'string') {
      res.json({ status: 'error', message: 'slug not found' });
      return;
    }

    const page = await Page.findOne({ slug });

    if (!page) {
      res.json({ status: 'error', message: 'page not found' });
      return;
    }

    if (user._id.toString() !== page.userId.toString()) {
      res.json({ status: 'error', message: 'fail to auth' });
      return;
    }

    switch (req.method) {
      case 'GET':
        res.json({
          status: 'success',
          message: 'page found',
          data: { content: page.hashedContent || '' },
        });
        break;

      case 'PUT':
      case 'PATCH':
        const { name, content } = req.body;
        if (!name && !content) {
          res.json({ status: 'error', message: 'no change found' });
          break;
        }

        if (!!name) {
          page.name = name;

          const slug = genSlug(name);

          let uniqueSlug = slug;

          while (await Page.findOne({ slug: uniqueSlug })) {
            uniqueSlug = `${slug}--${uuid()}`;
          }

          page.slug = uniqueSlug;
        }

        if (!!content) {
          page.hashedContent = content;
        }

        const result = await page.save();

        res.json({
          status: 'success',
          message: 'saved successfully',
          data: {
            name: result.name,
            slug: result.slug,
            content: result.hashedContent,
          },
        });
        break;

      case 'DELETE':
        await Page.deleteOne({ _id: page._id });

        res.json({ status: 'success', message: 'page was deleted' });
        break;

      default:
        res.json({ status: 'error', message: 'wrong http method' });
    }
  } catch (error) {
    res.json({ status: 'error', message: 'something went wrong' });
  }
});