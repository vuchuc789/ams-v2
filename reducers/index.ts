import { combineReducers } from 'redux';
import authReducer from './auth';
import mainLayoutReducer from './mainLayout';
import userInfoReducer from './userInfo';
import editorIndicatorReducer from './editorIndicator';
import pageReducer from './page';

const rootReducer = combineReducers({
  auth: authReducer,
  mainLayout: mainLayoutReducer,
  userInfo: userInfoReducer,
  editorIndicator: editorIndicatorReducer,
  page: pageReducer,
});

export default rootReducer;
