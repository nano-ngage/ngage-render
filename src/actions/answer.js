export const SETANSWERS = 'SETANSWERS';
export const SUBMITANSWER = 'SUBMITANSWER';

export function setAnswers(answer) {
  return {
    type: SETANSWERS,
    answer: answer
  };
}

export function submitAnswer(answer) {
  return {
    type: SUBMITANSWER,
    answer: answer
  };
}
