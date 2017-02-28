import { SETQUESTIONS, SETASKEDQUESTIONS, REMOVEQUESTION} from '../actions/questions';

export function questions(state = null, action) {
  const qs = state;
  switch (action.type) {
    case SETQUESTIONS:
      return state = action.questions;
    case REMOVEQUESTION:
      var index = state.indexOf(action.question);
      state.splice(index, 1);
      return state
    default:
      return state;
  }
}

export function askedQuestions(state = [], action) {
  switch (action.type) {
    case SETASKEDQUESTIONS:
      return state = state.concat([action.askedQuestions]);
      break;
    default:
      return state;
  }
}