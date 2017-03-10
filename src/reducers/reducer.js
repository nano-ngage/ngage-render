import { combineReducers } from 'redux';
import type from './type';
import user from './user';
import question from './question';
import response from './response';
import { askEnabled, audQEnabled } from './qa';
import { setAnswers, submitAnswer, showAnswer } from './answer';
import { questions, askedQuestions } from './questions';
import { audQuestions, submitAudQuestion, upvoteAudQuestion, upvotedAudQuestions } from './audquestions';
import { session, invalidRoom, presentation, pressession } from './session';
import { participant } from './participant';


export default combineReducers({
  user,
  type,
  question,
  questions,
  askedQuestions,
  audQuestions,
  submitAudQuestion,
  upvoteAudQuestion,
  upvotedAudQuestions,
  setAnswers,
  submitAnswer,
  showAnswer,
  session,
  invalidRoom,
  pressession,
  presentation,
  participant,
  response,
  askEnabled,
  audQEnabled
});
