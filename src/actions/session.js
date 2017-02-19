export const SESSION = 'SESSION';
export const INVALIDROOM = 'INVALIDROOM';

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