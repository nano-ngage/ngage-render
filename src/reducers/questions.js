import { SETQUESTIONS } from '../actions/questions';

export function questions(state = null, action) {
  switch (action.type) {
    case SETQUESTIONS:
      return state = action.questions;
    default:
      return state;
  }
}