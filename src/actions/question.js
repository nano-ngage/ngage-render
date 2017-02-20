export const SETQUESTION = 'SETQUESTION';

export function setQuestion(id) {
  return {
    type: SETQUESTION,
    qID: id
  };
}