export interface ResponseData<T = undefined> {
  status: 'success' | 'error';
  message: string;
  data?: T;
}
