import { SETANSWERS, SUBMITANSWER } from '../actions/answer';

export function answer(state = null, action) {
  switch (action.type) {
    case SETANSWERS:
      return state = action.answer;
    default:
      return state;
  }
}

export function submitAnswer(state = null, action) {
  switch (action.type) {
    case SUBMITANSWER:
      return state = action.answer;
    default:
      return state;
  }
}