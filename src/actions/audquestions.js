export const SUBMITAUDQUESTION = 'SUBMITAUDQUESTION';
export const SETAUDQUESTIONS = 'SETAUDQUESTIONS';
export const UPVOTEAUDQUESTION = 'UPVOTEAUDQUESTION';

export function setAudQuestions(audquestions) {
  return {
    type: SETAUDQUESTIONS,
    audquestions: audquestions
  };
}

export function submitAudQuestion(audquestion) {
  return {
    type: SUBMITAUDQUESTION,
    audquestion: audquestion
  };
}

export function upvoteAudQuestion(audquestion) {
  return {
    type: UPVOTEAUDQUESTION,
    audquestion: audquestion
  };
}
