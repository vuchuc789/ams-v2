import { notification } from 'antd';
import type { AsyncAction } from 'interfaces';

export const notifyError =
  (message: string): AsyncAction =>
  () => {
    notification.error({ message: 'Error', description: message });
  };

export const notifySuccess =
  (message: string): AsyncAction =>
  () => {
    notification.success({ message: 'Success', description: message });
  };
