import type { store } from 'pages/_app';
import type { ActionType } from '@constants';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface AppAction<T> {
  type: ActionType;
  payload: Partial<T>;
}
