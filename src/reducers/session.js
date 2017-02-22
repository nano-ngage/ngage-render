import { SESSION, INVALIDROOM, STARTPRES, PRESSESSION, SETPRESSESSION } from '../actions/session';

export function session(state = null, action) {
  switch (action.type) {
    case SESSION:
      return state = action.session;
    default:
      return state;
  }
}

export function invalidRoom(state = 'valid', action) {
  switch (action.type) {
    case INVALIDROOM:
      return state = action.invalid ? 'invalid' : 'valid';
    default:
      return state;
  }
}

export function presentation(state = 0, action) {
  switch (action.type) {
    case STARTPRES:
      return state = action.start;
    default:
      return state;
  }
}

export function pressession(state = null, action) {
  switch (action.type) {
    case PRESSESSION:
      return state = action.session;
    case SETPRESSESSION:
      return state = action.session;
    default:
      return state;
  }
}