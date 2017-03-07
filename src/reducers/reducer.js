import { combineReducers } from 'redux';
import type from './type';
import user from './user';
import question from './question';
import {answer, submitAnswer, showAnswer} from './answer';
import {questions, askedQuestions} from './questions';
import {response} from './response';
import {session, invalidRoom, presentation, pressession} from './session';

export default combineReducers({
  user,
  type,
  question,
  questions,
  askedQuestions,
  answer,
  submitAnswer,
  showAnswer,
  session,
  invalidRoom,
  pressession,
  presentation,
  response
});
