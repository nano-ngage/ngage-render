import { ADDPARTICIPANT } from '../actions/participant';

export function participant(state = 0, action) {
  switch (action.type) {
    case ADDPARTICIPANT:
      return state = state + 1;
    default:
      return state;
  }
}