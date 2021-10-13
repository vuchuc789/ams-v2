import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from 'server/interfaces';
import { Database } from './index';

export const handler = <T = undefined>(
  callback: NextApiHandler<ResponseData<T>>,
) => {
  return async (req: NextApiRequest, res: NextApiResponse<ResponseData<T>>) => {
    // Initializations and middleware will go here
    await Database.connect();

    await callback(req, res);
  };
};
