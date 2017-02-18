import Inferno from 'inferno';
import Component from 'inferno-component';
import AuthService from '../auth/AuthService';
import { setPresenter, setViewer } from '../actions/type';
import { setUser } from '../actions/user';
import { bindActionCreators } from 'redux';
import { connect } from 'inferno-redux';
class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const auth = new AuthService('qjGwtKBFdcc0chj52rGul3p3nEa0LW3J', 'saivickna.auth0.com', this.props);
    
    return (
      <div>
        {this.props.user ? ('Hello' + this.props.user.firstName) : 'Not Hello'}
        <button onClick={auth.login.bind(this)}>Login</button>
        <label>Enter Room Code:</label>
        <input type="text"></input>
        <button>Submit</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    type: state.type,
    user: state.user
  };
} 

const mapDispatchToProps = dispatch => {
  return bindActionCreators( {setPresenter, setViewer, setUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);