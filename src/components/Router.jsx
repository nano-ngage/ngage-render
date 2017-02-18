import Inferno from 'inferno';
import { Router, Route, IndexRoute } from 'inferno-router';
import Component from 'inferno-component';
import { Provider } from 'inferno-redux';
import { createBrowserHistory } from 'history';
import App from './App';
import Home from '../containers/Home';
import NoMatch from './NoMatch';
import store from '../store/index';

const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory;

export default () => (
    <Provider store={store}>
      <Router history={ browserHistory }>
        <Route component={ App }>
          <IndexRoute component={ Home }/>
          <Route path="/home" component={ Home }/>
          <Route path="*" component={ NoMatch }/>
        </Route>
      </Router>
    </Provider>
  )
  