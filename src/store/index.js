import configureStore from '../store/configureStore';
import socketMiddleware from '../socket/middleware';
const store = configureStore();
socketMiddleware(store);

export default store;