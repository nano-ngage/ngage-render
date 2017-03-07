import { combineReducers } from 'redux';
import type from './type';
import user from './user';
import question from './question';
import response from './response';
import { setAnswers, submitAnswer, showAnswer } from './answer';
import { questions, askedQuestions } from './questions';
import { audQuestions, submitAudQuestion, upvoteAudQuestion } from './audquestions';
import { session, invalidRoom, presentation, pressession } from './session';

export default combineReducers({
  user,
  type,
  question,
  questions,
  askedQuestions,
  audQuestions,
  submitAudQuestion,
  upvoteAudQuestion,
  setAnswers,
  submitAnswer,
  showAnswer,
  session,
  invalidRoom,
  pressession,
  presentation,
  response
});
