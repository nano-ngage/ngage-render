import { SETRESPONSES } from '../actions/response';

export function response(state = null, action) {
  switch (action.type) {
    case SETRESPONSES:
      return state = action.response;
    default:
      return state;
  }
}