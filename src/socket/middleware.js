import { setSession, setPresSession, setInvalidRoom, SESSION, STARTPRES, PRESSESSION } from '../actions/session';
import { SETQUESTION } from '../actions/question';
import { setQuestions , setAskedQuestions } from '../actions/questions';
import { setAudQuestions, SUBMITAUDQUESTION, UPVOTEAUDQUESTION } from '../actions/audquestions';
import { setResponse } from '../actions/response';
import { setAnswers, setShowAnswer, SUBMITANSWER, SHOWANSWER } from '../actions/answer';
import { addParticipant } from '../actions/participants';
import { enableAsk, enableAudQ, ENABLEASK, ENABLEAUDQ } from '../actions/qa';
import io from 'socket.io-client';
import 'whatwg-fetch';

var socket = null;
var url = `http://${DBIP}:${DBPORT}`

export function chatMiddleware(store) {

  return next => action => {
    const result = next(action);
    if (socket && action.type === SESSION) {
      fetch(url + '/sByS/' + action.session.socket)
        .then(data => data.json())
        .then(data => {
          if (data !== -1) {
            const state = store.getState();
            const user = state.user;

            socket.emit('subscribe', {
              room: action.session.socket,
              userID: user ? user.userID : -1,
              sessionID: action.session.sessionID
             });
            action.session.sessionID = data.sessionID;
            action.session.presentationTitle = data.title;

            // update store with current enabled questions/audq
            if (data.askEnabled !== state.askEnabled) {
              store.dispatch(enableAsk(data.askEnabled));
            }
            if (data.audQEnabled !== state.audQEnabled) {
              store.dispatch(enableAudQ(data.audQEnabled))
            }

            // Also grab existing audience questions
            fetch(url + '/aqByS/' + action.session.sessionID)
              .then(data => data.json())
              .then(data => { store.dispatch(setAudQuestions(data)); })
              .catch(err => { console.error('Oops, something went wrong', err); });

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
        .catch(err => { console.error('Oops, something went wrong', err); });

    } else if (socket && action.type === STARTPRES) {

      let room = store.getState().session.socket;
      socket.emit('start', { room: room });

    } else if (socket && action.type === PRESSESSION) {

      fetch(url + '/sByS/' + action.session.socket)
        .then(data => data.json())
        .then(data => {
          if (data !== -1) {
            socket.emit('subscribe', { room: action.session.socket });
            action.session.sessionID = data.sessionID;
            action.session.presentationTitle = data.title;
            store.dispatch(setPresSession(action.session));
          } else {
            store.dispatch(setPresSession(null));
          }
        })
        .catch(err => { console.error('Oops, something went wrong', err); });

    } else if (socket && action.type === SETQUESTION) {

      let room = store.getState().session.socket;
      socket.emit('askQ', {
        room: room,
        question: action.question
      });

    } else if (socket && action.type === SHOWANSWER) {

      let room = store.getState().session.socket;
      socket.emit('showA', {
        room: room,
        questionID: action.answer
      });

    } else if (socket && action.type === SUBMITANSWER) {

      let state = store.getState();
      let answerID = action.answer.answer.answerID;
      let content = null;
      if (action.answer.question.type === 2) {
        content = action.answer.answer;
        answerID = -1;
      }

      socket.emit('submitResponse', {
        room: state.session.socket,
        questionID: action.answer.question.questionID,
        content: content,
        answerID: answerID,
        userID: state.user ? state.user.userID : -1,
        sessionID: state.session.sessionID
      });

      store.dispatch(setAnswers(null));

    } else if (socket && action.type === SUBMITAUDQUESTION) {

      let state = store.getState();
      socket.emit('submitAudQuestion', {
        room: state.session.socket,
        content: action.audQuestion.content,
        userID: state.user ? state.user.userID : -1,
        sessionID: state.session.sessionID
      });

    } else if (socket && action.type === UPVOTEAUDQUESTION) {

      let state = store.getState();
      socket.emit('upvoteAudQuestion', {
        room: state.session.socket,
        audQuestionID: action.audQuestion.audQuestionID
      });

    } else if (socket && action.type === ENABLEASK) {
      let state = store.getState();
      socket.emit('enableAsk', {
        room: state.session.socket,
        askEnabled: action.askEnabled,
        sessionID: state.session.sessionID
      });
    } else if (socket && action.type === ENABLEAUDQ) {
      let state = store.getState();
      socket.emit('enableAudQ', {
        room: state.session.socket,
        audQEnabled: action.audQEnabled,
        sessionID: state.session.sessionID
      });
    }
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
      data.answers.forEach(answer => { answer.count = 0; });
      store.dispatch(setResponse(data));
    });

    socket.on('correct', data => {
      var response = Object.assign({}, store.getState().response);
      response.correct = data;
      store.dispatch(setResponse(response));
    });

    socket.on('resp', data => {
      var answerID = data.answerID;
      var response = Object.assign({}, store.getState().response);
      response.correct = null;
      response.response = response.response || [];

      if (data.content !== null) {
        response.response.push({
          content: data.content,
          rand: 'anon' + Math.round(Math.random() * 100)
        });
      } else {
        response.answers.forEach(answer => {
          if (answer.answerID === answerID) {
            answer.count++;
          }
        });
      }
      store.dispatch(setResponse(response));
    });

    socket.on('audquestions', data => {
      const audQuestions = store.getState().audQuestions;
      const newAudQuestions = audQuestions.slice()
      newAudQuestions.push(data)
      store.dispatch(setAudQuestions(newAudQuestions));

    });

    socket.on('upvote', data => {
      const audQuestions = store.getState().audQuestions.slice();

      audQuestions.forEach(audQ => {
        if (audQ.audQuestionID === data) {
          audQ.upvotes++;
        }
      });

      store.dispatch(setAudQuestions(audQuestions))
    });

    socket.on('askenabled', data => {
      let state = store.getState();
      if (state.askEnabled !== data) {
        store.dispatch(enableAsk(data));
      }
    });

    socket.on('audqenabled', data => {
      let state = store.getState();
      if (state.audQEnabled !== data) {
        store.dispatch(enableAudQ(data));
      }
    });

    socket.on('addparticipant', data => {
      store.dispatch(addParticipant());
    });

  });

}
