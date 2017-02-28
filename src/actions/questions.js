export const SETQUESTIONS = 'SETQUESTIONS';
export const SETASKEDQUESTIONS = 'SETASKEDQUESTIONS';
export const REMOVEQUESTION = 'REMOVEQUESTION';

export function setQuestions(questions) {
  return {
    type: SETQUESTIONS,
    questions: questions
  };
}

export function setAskedQuestions(question) {
  return {
    type: SETASKEDQUESTIONS,
    askedQuestions: question
  };
}

export function deleteQuestion(question) {
  return {
    type: REMOVEQUESTION,
    question: question
  };
}