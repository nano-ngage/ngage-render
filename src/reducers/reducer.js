import { combineReducers } from 'redux';
import type from './type';
import user from './user';
import question from './question';


export default combineReducers({
  user,
  type,
  question
});
