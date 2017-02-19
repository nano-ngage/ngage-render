import { ANSWER } from '../actions/answer';

export default function answer(state = null, action) {
  switch (action.type) {
    case ANSWER:
      return state = action.answer;
    default:
      return state;
  }
}