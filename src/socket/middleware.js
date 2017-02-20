import {setSession, setInvalidRoom, SESSION, STARTPRES} from '../actions/session';
import {SETQUESTION} from '../actions/question';
import {setQuestions} from '../actions/questions';
import {setAnswers} from '../actions/answer';
import io from 'socket.io-client';

var socket = null;

export function chatMiddleware(store) {
  
  return next => action => {
    const result = next(action);
    if (socket && action.type === SESSION) {
      //replace with check for valid room
      if ('a' === 'a') {
        socket.emit('subscribe', {room: action.session.socket});  
        var userType = store.getState().type; 
        if (userType === 0) {
          browserHistory.push('/presenter');  
        } else {
          browserHistory.push('/viewer');
        }
        store.dispatch(setInvalidRoom(0));
      } else {
        store.dispatch(setInvalidRoom(1));
      } 
    } else if (socket && action.type === STARTPRES) {
      var room = store.getState().session.socket;
      socket.emit('start', {room:room});
    } else if (socket && action.type === SETQUESTION) {
      var room = store.getState().session.socket;
      socket.emit('askq', {room: room, qID: action.qID});
    }
    // if (socket && action.type === SESSION) {
    //   socket.emit('session', action.session);
    // }
 
    return result;
  };
}

export default function (store) {
  socket = io.connect(`http://localhost:5500/ngage`, { path: '/sockets'});
  socket.on('connect', con => {
    socket.on('questions', data => {
      store.dispatch(setQuestions(data));
    })  
    socket.on('answers', data => {
      store.dispatch(setAnswers(data));
    })  
  })

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