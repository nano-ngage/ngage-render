import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import AuthService from '../auth/AuthService';
import { setPresenter, setViewer } from '../actions/type';
import { setUser } from '../actions/user';
import { setSession } from '../actions/session';
import { bindActionCreators } from 'redux';
import { connect } from 'inferno-redux';


class Presentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new AuthService('qjGwtKBFdcc0chj52rGul3p3nEa0LW3J', 'saivickna.auth0.com', props)
    }
  }
  componentDidMount() {
    if (this.state.auth.loggedIn()) {
      this.state.auth.loginUser();
    }
  }

  render() {    
    return (
      <div>
        {this.props.user ? 'Presentation' : 'Please login'}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    type: state.type,
    user: state.user,
    answers: state.answer
  };
} 

const mapDispatchToProps = dispatch => {
  return bindActionCreators( {setPresenter, setViewer, setUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);