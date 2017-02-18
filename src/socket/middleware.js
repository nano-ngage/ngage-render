import {setAnswer} from '../actions/answer';
import {setRoom, ROOM} from '../actions/room';
import io from 'socket.io-client';

var socket = null;

export function chatMiddleware(store) {
  return next => action => {
    const result = next(action);
    
    if (socket && action.type === ROOM) {
      let roomcode = action.room;
      socket.emit('roomcode', roomcode);
    }
 
    return result;
  };
}

export default function (store) {
  socket = io.connect(`http://localhost:5500`);
 
  socket.on('setAnswer', answer => {
    store.dispatch(setAnswer(answer));
  });
}