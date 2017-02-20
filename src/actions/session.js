export const SESSION = 'SESSION';
export const INVALIDROOM = 'INVALIDROOM';
export const STARTPRES = 'STARTPRES';

export function setSession(session) {
  return {
    type: SESSION,
    session: session
  };
}
export function setInvalidRoom(invalid) {
  return {
    type: INVALIDROOM,
    invalid: invalid
  };
}
export function setPresentation(start) {
  return {
    type: STARTPRES,
    start: start
  };
}