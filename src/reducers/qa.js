import { SETQAMODAL } from '../actions/qa';

export default function qaModal(state = null, action) {
  switch (action.type) {
    case SETQAMODAL:
      return state = action.qaModal;
    default:
      return state;
  }
}
