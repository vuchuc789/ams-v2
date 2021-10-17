import { LOGIN_TYPE } from '@constants';
import { NextApiRequest } from 'next';

export interface ResponseData<T = undefined> {
  status: 'success' | 'error';
  message: string;
  data?: T;
}

export interface CustomRequest extends NextApiRequest {
  auth?: { id: string; type: LOGIN_TYPE; name: string; email: string };
}
