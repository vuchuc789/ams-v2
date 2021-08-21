import type { NextApiRequest, NextApiResponse } from 'next';
import { Database } from './index';

export const handler = (
  callback: (
    req: NextApiRequest,
    res: NextApiResponse<unknown>,
  ) => void | Promise<void>,
) => {
  return async (req: NextApiRequest, res: NextApiResponse<unknown>) => {
    // Initializations and middleware will go here
    await Database.connect();

    await callback(req, res);
  };
};
