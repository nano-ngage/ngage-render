export const SETQUESTION = 'SETQUESTION';

export function setQuestion(question) {
  return {
    type: SETQUESTION,
    question: question
  };
}