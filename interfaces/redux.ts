import { store } from 'pages/_app';
import type { Action, AnyAction, Dispatch } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;

export interface SyncAction<T = { [key: string]: unknown }> extends AnyAction {
  type: string;
  payload?: Partial<T>;
}

export type SyncDispatch = Dispatch<SyncAction>;

export type AsyncDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export type AsyncAction = (
  dispatch: AsyncDispatch,
  getState: () => RootState,
  extraArgument: unknown,
) => void | Promise<void>;
