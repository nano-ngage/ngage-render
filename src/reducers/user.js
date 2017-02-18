import { USER } from '../actions/user';

export default function user(state = null, action) {
  console.log(action);
  switch (action.type) {
    case USER:
      return state = action.user;
    default:
      return state;
  }
}