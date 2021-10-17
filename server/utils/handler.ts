import { NextApiResponse } from 'next';
import { CustomRequest, ResponseData } from 'server/interfaces';
import { getAuthInfos } from './auth';
import { Database } from './index';

export const handler = <T = undefined>(
  callback: (
    req: CustomRequest,
    res: NextApiResponse<ResponseData<T>>,
  ) => void | Promise<void>,
) => {
  return async (req: CustomRequest, res: NextApiResponse<ResponseData<T>>) => {
    // Initializations and middleware will go here
    await Database.connect();

    if (!(await getAuthInfos(req, res))) {
      return;
    }

    await callback(req, res);
  };
};
