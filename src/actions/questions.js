export const SETQUESTIONS = 'SETQUESTIONS';

export function setQuestions(questions) {
  return {
    type: SETQUESTIONS,
    questions: questions
  };
}