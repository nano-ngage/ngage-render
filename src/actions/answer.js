export const ANSWER = 'ANSWER';

export function setAnswer(answer) {
  return {
    type: ANSWER,
    answer: answer
  };
}
