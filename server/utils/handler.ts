import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Database } from './index';

export const handler = <T>(callback: NextApiHandler<T>) => {
  return async (req: NextApiRequest, res: NextApiResponse<T>) => {
    // Initializations and middleware will go here
    await Database.connect();

    await callback(req, res);
  };
};
