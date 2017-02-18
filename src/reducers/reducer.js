import { combineReducers } from 'redux';
import type from './type';
import user from './user';
import question from './question';
import answer from './answer';
import room from './room';


export default combineReducers({
  user,
  type,
  question,
  answer
});
