import { CLEAR_USER_INFO, SET_USER_INFO } from '@constants';
import { SyncAction } from 'interfaces';

interface UserInfoState {
  [key: string]: unknown;
}

const initialState: UserInfoState = {};

const userInfoReducer = (
  state = initialState,
  { type, payload }: SyncAction<UserInfoState>,
): UserInfoState => {
  switch (type) {
    case SET_USER_INFO:
      return { ...state, ...payload };
    case CLEAR_USER_INFO:
      return initialState;
    default:
      return state;
  }
};

export default userInfoReducer;
