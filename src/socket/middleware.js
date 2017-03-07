import {setSession, setPresSession, setInvalidRoom, SESSION, STARTPRES, PRESSESSION} from '../actions/session';
import {SETQUESTION} from '../actions/question';
import {setQuestions, setAskedQuestions} from '../actions/questions';
import {setResponse} from '../actions/response';
import {setAnswers, SUBMITANSWER, SHOWANSWER, setShowAnswer} from '../actions/answer';
import io from 'socket.io-client';
import 'whatwg-fetch';

var socket = null;
var url = `http://${DBIP}:${DBPORT}`

export function chatMiddleware(store) {

  return next => action => {
    const result = next(action);
    if (socket && action.type === SESSION) {
      //replace with check for valid room
      fetch(url + '/sByS/' + action.session.socket).then(data => data.json()).then(data =>{
        if (data !== -1) {
          socket.emit('subscribe', {room: action.session.socket});
          action.session.sessionID = data.sessionID;
          action.session.presentationTitle = data.title;
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
    } else if (socket && action.type === PRESSESSION) {
      fetch(url + '/sByS/' + action.session.socket).then(data => data.json()).then(data =>{
        if (data !== -1) {
          socket.emit('subscribe', {room: action.session.socket});
          action.session.sessionID = data.sessionID;
          action.session.presentationTitle = data.title;
          store.dispatch(setPresSession(action.session));
        } else {
          store.dispatch(setPresSession(null));
        }
      })
    } else if (socket && action.type === SETQUESTION) {
      let room = store.getState().session.socket;
      socket.emit('askQ', {room: room, question: action.question});
    } else if (socket && action.type === SHOWANSWER) {
      console.log('#########', action.answer)
      let room = store.getState().session.socket;
      socket.emit('showA', {room: room, questionID: action.answer});
    } else if (socket && action.type === SUBMITANSWER) {
      console.log('middleware', action.answer);
      let state = store.getState();
      let answerID = action.answer.answer.answerID;
      let content = null;
      if (action.answer.question.type === 2) {
        content = action.answer.answer;
        answerID = -1;
      }
      socket.emit('submitResponse', {room: state.session.socket, questionID: action.answer.question.questionID, content: content, answerID: answerID, userID: state.user ? state.user.userID : -1, sessionID: state.session.sessionID });
      store.dispatch(setAnswers(null));
    }
    // if (socket && action.type === SESSION) {
    //   socket.emit('session', action.session);
    // }

    return result;
  };
}

export default function (store) {
  //104.131.147.199

  socket = io.connect(`http://${SOCKETIP}:${SOCKETPORT}/ngage`, { path: '/sockets'});
  socket.on('connect', con => {
    socket.on('questions', data => {
      store.dispatch(setQuestions(data));
    });

    socket.on('answers', data => {
      store.dispatch(setAnswers(data));
      data.answers.forEach(function(answer) { answer.count = 0; });
      store.dispatch(setResponse(data));
    });

    socket.on('correct', data => {
      var response = Object.assign({}, store.getState().response);
      response.correct = data;
      store.dispatch(setResponse(response));
    });

    socket.on('resp', data => {
      var answerID = data.answerID;
      // var response = store.getState().response;
      var response = Object.assign({}, store.getState().response);
      response.correct = null;
      response.response = response.response || [];
      if (data.content !== null) {

        response.response.push({content: data.content, rand: 'anon' + Math.round(Math.random() * 100)});
      } else {
        response.answers.forEach(answer => {if (answer.answerID === answerID) {answer.count++;}})
      }

      // console.log('before', store.getState().response.answers[0].count);
      store.dispatch(setResponse(response));
      // console.log('after', store.getState().response.answers[0].count);
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