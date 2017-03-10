import { SETAUDQUESTIONS, SUBMITAUDQUESTION, UPVOTEAUDQUESTION, AUDQUESTIONUPVOTED } from '../actions/audquestions';

export function audQuestions(state = null, action) {
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

export function upvotedAudQuestions(state = [], action) {
  switch (action.type) {
    case AUDQUESTIONUPVOTED:
      state.push(action.audQuestionID)
      return state;
    default:
      return state;
  }
}
