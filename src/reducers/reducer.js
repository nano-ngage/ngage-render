import { combineReducers } from 'redux';
import type from './type';
import user from './user';
import question from './question';
import answer from './answer';
import {session, invalidRoom} from './session';

export default combineReducers({
  user,
  type,
  question,
  answer,
  invalidRoom,
  session
});
