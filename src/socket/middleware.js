import {setSession, setInvalidRoom, SESSION, STARTPRES} from '../actions/session';
import {SETQUESTION} from '../actions/question';
import {setQuestions} from '../actions/questions';
import {setAnswers, SUBMITANSWER} from '../actions/answer';
import io from 'socket.io-client';

var socket = null;

export function chatMiddleware(store) {
  
  return next => action => {
    const result = next(action);
    if (socket && action.type === SESSION) {
      //replace with check for valid room
      fetch('http://10.6.22.194:5000/sByS/' + action.session.socket).then(data => data.json()).then(data =>{
        if (data !== -1) {
          socket.emit('subscribe', {room: action.session.socket});  
          action.session.sessionID = data.sessionID;
          var user = store.getState().user; 
          if (user && user.userID && (user.userID === data.userID)) {
            browserHistory.push('/presenter');  
          } else {
            browserHistory.push('/viewer');
          }
          store.dispatch(setInvalidRoom(0));          
        } else {
          store.dispatch(setInvalidRoom(1));
        }
      })
    } else if (socket && action.type === STARTPRES) {
      let room = store.getState().session.socket;
      socket.emit('start', {room:room});
    } else if (socket && action.type === SETQUESTION) {
      let room = store.getState().session.socket;
      socket.emit('askQ', {room: room, question: action.question});
    } else if (socket && action.type === SUBMITANSWER) {
      let state = store.getState();
      socket.emit('submitResponse', JSON.stringify({room: state.session.socket, questionID: action.answer.question.questionID, content: null, answerID:action.answer.answer.answerID, userID: state.user ? state.user.userID : -1, sessionID: state.session.sessionID }));
      store.dispatch(setAnswers(null));
    }
    // if (socket && action.type === SESSION) {
    //   socket.emit('session', action.session);
    // }
 
    return result;
  };
}

export default function (store) {
  socket = io.connect(`http://10.6.22.194:5500/ngage`, { path: '/sockets'});
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