import { ActionType } from '@constants';
import type { AppAction } from 'interfaces';

const { LOGIN } = ActionType;

interface AuthState {
  accessToken: string;
}

const initialState: AuthState = {
  accessToken: '',
};

const authReducer = (
  state = initialState,
  { type, payload }: AppAction<AuthState>,
): AuthState => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        accessToken: payload.accessToken || initialState.accessToken,
      };

    default:
      return state;
  }
};

export default authReducer;
