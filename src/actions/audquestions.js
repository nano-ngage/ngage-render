export const SUBMITAUDQUESTION = 'SUBMITAUDQUESTION';
export const SETAUDQUESTIONS = 'SETAUDQUESTIONS';
export const UPVOTEAUDQUESTION = 'UPVOTEAUDQUESTION';

export function setAudQuestions(audQuestions) {
  return {
    type: SETAUDQUESTIONS,
    audquestions: audQuestions
  };
}

export function submitAudQuestion(audQuestion) {
  return {
    type: SUBMITAUDQUESTION,
    audquestion: audQuestion
  };
}

export function upvoteAudQuestion(audQuestion) {
  return {
    type: UPVOTEAUDQUESTION,
    audquestion: audQuestion
  };
}
