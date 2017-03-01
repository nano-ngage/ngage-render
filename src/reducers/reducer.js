import { combineReducers } from 'redux';
import type from './type';
import user from './user';
import question from './question';
import { setAnswers, submitAnswer, showAnswer } from './answer';
import { questions, askedQuestions } from './questions';
import { setAudQuestions, submitAudQuestion } from './audquestions';
import { response } from './response';
import { session, invalidRoom, presentation, pressession } from './session';

export default combineReducers({
  user,
  type,
  question,
  questions,
  askedQuestions,
  setAudQuestions,
  submitAudQuestion,
  setAnswers,
  submitAnswer,
  showAnswer,
  session,
  invalidRoom,
  pressession,
  presentation,
  response
});
