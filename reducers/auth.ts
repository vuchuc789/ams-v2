import { LOGGED_IN, LOGGING_IN, LOGIN_TYPE, LOGOUT } from '@constants';
import type { SyncAction } from 'interfaces';

interface AuthState extends fb.AuthResponse {
  isLoggingIn: boolean;
  loginType?: LOGIN_TYPE;
}

const initialState: AuthState = {
  accessToken: '',
  userID: '',
  expiresIn: 0,
  signedRequest: '',
  isLoggingIn: false,
};

const authReducer = (
  state = initialState,
  { type, payload }: SyncAction<AuthState>,
): AuthState => {
  switch (type) {
    case LOGGED_IN:
      return {
        ...state,
        ...payload,
        isLoggingIn: false,
      };
    case LOGGING_IN:
      return {
        ...state,
        isLoggingIn: true,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
