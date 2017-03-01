import { SETAUDQUESTIONS, SUBMITAUDQUESTION, UPVOTEAUDQUESTION } from '../actions/audquestions';

export function setAudQuestions(state = null, action) {
  switch (action.type) {
    case SETAUDQUESTIONS:
      return state = action.audquestions;
    default:
      return state;
  }
}

export function submitAudQuestion(state = null, action) {
  switch (action.type) {
    case SUBMITAUDQUESTION:
      return state = action.audquestion;
    default:
      return state;
  }
}

export function upvoteAudQuestion(state = null, action) {
  switch (action.type) {
    case UPVOTEAUDQUESTION:
      return state = action.audquestion;
    default:
      return state;
  }
}
