import { PRESENTER, VIEWER } from '../actions/type';

export default function type(state = 1, action) {
  switch (action.type) {
    case PRESENTER:
      return state = 0;
    case VIEWER:
      return state = 1;
    default:
      return state;
  }
}