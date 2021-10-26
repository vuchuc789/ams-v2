import { handler } from 'server/utils';

interface PageResponse {
  content?: string;
}

export default handler<PageResponse>(async (req, res) => {});
