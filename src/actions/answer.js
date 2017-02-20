export const SETANSWERS = 'SETANSWERS';

export function setAnswers(answer) {
  return {
    type: SETANSWERS,
    answer: answer
  };
}
