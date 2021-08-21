export interface ResponseData<T = unknown> {
  status: 'success' | 'error';
  message: string;
  data?: T;
}
