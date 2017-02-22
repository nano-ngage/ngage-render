import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';
import Component from 'inferno-component';
import { Provider } from 'inferno-redux';
import { createBrowserHistory } from 'history';
import App from './App';
import Home from '../containers/Home';
import Presenter from '../containers/Presenter';
import Viewer from '../containers/Viewer';
import Presentation from '../containers/Presentation';
import NoMatch from './NoMatch';
import store from '../store/index';

const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory;
// browserHistory.push = function({ pathname }) {
//   location.hash = '#!' + pathname
// }
// var socket = io.connect('http://localhost:5500');
// window.socket = socket;

function sessionOnly(store) {
  if (!store.getState().session) {
    browserHistory.replace('/');
  }
}

export default () => (
    <Provider store={store}>
      <Router history={ browserHistory }>
        <Route component={ App }>
          <IndexRoute component={ Home }/>
          <Route path="/presenter" component={ Presenter } onEnter = {() => {sessionOnly(store)}}/>
          <Route path="/viewer" component={ Viewer } onEnter = {() => {sessionOnly(store)}}/>
          <Route path="/presentation/:socket" component={ Presentation }/>
          <Route path="*" component={ NoMatch }/>
        </Route>
      </Router>
    </Provider>
  )
  