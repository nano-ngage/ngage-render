export const SESSION = 'SESSION';
export const INVALIDROOM = 'INVALIDROOM';
export const STARTPRES = 'STARTPRES';
export const PRESSESSION = 'PRESSESSION';
export const SETPRESSESSION = 'SETPRESSESSION';

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
export function startPresSession(session) {
  return {
    type: PRESSESSION,
    session: session
  };
}
export function setPresSession(session) {
  return {
    type: SETPRESSESSION,
    session: session
  };
}