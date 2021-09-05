import { combineReducers } from 'redux';
import authReducer from './auth';
import mainLayoutReducer from './mainLayout';
import userInfoReducer from './userInfo';

const rootReducer = combineReducers({
  auth: authReducer,
  mainLayout: mainLayoutReducer,
  userInfo: userInfoReducer,
});

export default rootReducer;
