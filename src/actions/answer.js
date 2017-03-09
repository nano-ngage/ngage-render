export const SETANSWERS = 'SETANSWERS';
export const SUBMITANSWER = 'SUBMITANSWER';
export const SHOWANSWER = 'SHOWANSWER';

export function setAnswers(answers) {
  return {
    type: SETANSWERS,
    answers: answers
  };
}

export function submitAnswer(answer) {
  return {
    type: SUBMITANSWER,
    answer: answer
  };
}

export function setShowAnswer(answer) {
  return {
    type: SHOWANSWER,
    answer: answer
  };
}
