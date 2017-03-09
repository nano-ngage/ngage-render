import { ENABLEASK, ENABLEAUDQ } from '../actions/qa';

export function askEnabled(state = null, action) {
  switch (action.type) {
    case ENABLEASK:
      return state = action.askEnabled;
    default:
      return state;
  }
}

export function audQEnabled(state = null, action) {
  switch (action.type) {
    case ENABLEAUDQ:
      return state = action.audQEnabled;
    default:
      return state;
  }
}
