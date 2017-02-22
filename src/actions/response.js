export const SETRESPONSES = 'SETRESPONSES';

export function setResponse(response) {
  return {
    type: SETRESPONSES,
    response: response
  };
}