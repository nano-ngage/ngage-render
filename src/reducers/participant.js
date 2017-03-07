import { ADDPARTICIPANT } from '../actions/participants';

export function participant(state = -1, action) {
  switch (action.type) {
    case ADDPARTICIPANT:
      return state = state + 1;
    default:
      return state;
  }
}