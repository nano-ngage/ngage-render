import {setSession, setInvalidRoom, SESSION} from '../actions/session';
import io from 'socket.io-client';

var socket = null;

export function chatMiddleware(store) {
  
  return next => action => {
    const result = next(action);
    if (action.type === SESSION) {
      socket = io.connect(`http://localhost:5500/` + action.session.socket, { path: '/sockets'});
      socket.on('connect', () => {
          var userType = store.getState().type; 
          if (userType === 0) {
            browserHistory.push('/presenter');  
          } else {
            browserHistory.push('/viewer');
          }
          store.dispatch(setInvalidRoom(0));
      });
      socket.on('error', () => {
        socket = null;
        store.dispatch(setInvalidRoom(1));
      })    
    }
    // if (socket && action.type === SESSION) {
    //   socket.emit('session', action.session);
    // }
 
    return result;
  };
}

export default function (store) {
  // socket = io.connect(`http://localhost:5500/ABC`, { path: '/sockets'});
  // //http://localhost:5500
  // socket.emit("subscribe", { room: "global" });
  // socket.on('setRoom', room => {
  //   if (room) {
  //     store.dispatch(setRoom(room)); 
  //     var userType = store.getState().type; 
  //     if (userType === 0) {
  //       browserHistory.push('/presenter');  
  //     } else {
  //       browserHistory.push('/viewer');
  //     }
      
  //   }
    
  // });
}