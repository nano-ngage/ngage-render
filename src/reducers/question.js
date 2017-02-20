import { SETQUESTION } from '../actions/question';

export default function question(state = null, action) {
  switch (action.type) {
    case SETQUESTION:
      return state = action.qID;
    default:
      return state;
  }
}