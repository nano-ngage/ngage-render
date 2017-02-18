import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers/reducer';
import {chatMiddleware} from '../socket/middleware';

export default function configureStore() {
  const createStoreWithMiddleware = applyMiddleware(chatMiddleware)(createStore);
  return createStoreWithMiddleware(reducer);
}
