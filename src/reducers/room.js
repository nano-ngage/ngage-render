import { ROOM } from '../actions/room';

export default function type(state = null, action) {
  switch (action.type) {
    case ROOM:
      return state = action.room;
    default:
      return state;
  }
}