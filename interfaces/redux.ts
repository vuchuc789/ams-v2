import { store } from 'pages/_app';
import type { Action, AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;

export interface SyncAction<T> extends AnyAction {
  type: string;
  payload?: Partial<T>;
}

export type AsyncAction = (
  dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
  getState: () => RootState,
  extraArgument: unknown,
) => void;
