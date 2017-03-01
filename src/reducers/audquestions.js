import { SETAUDQUESTIONS, SUBMITAUDQUESTION, UPVOTEAUDQUESTION } from '../actions/audquestions';

export function setAudQuestions(state = null, action) {
  switch (action.type) {
    case SETAUDQUESTIONS:
      return state = action.audQuestions;
    default:
      return state;
  }
}

export function submitAudQuestion(state = null, action) {
  switch (action.type) {
    case SUBMITAUDQUESTION:
      return state = action.audQuestion;
    default:
      return state;
  }
}

export function upvoteAudQuestion(state = null, action) {
  switch (action.type) {
    case UPVOTEAUDQUESTION:
      return state = action.audQuestion;
    default:
      return state;
  }
}
