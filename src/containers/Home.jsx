import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import AuthService from '../auth/AuthService';
import { setPresenter, setViewer } from '../actions/type';
import { setUser } from '../actions/user';
import { setSession } from '../actions/session';
import { bindActionCreators } from 'redux';
import { connect } from 'inferno-redux';

function roomVal(instance, e) {
  instance.setState({room: e.target.value});  
}

class Home extends Component {
  constructor(props) {
    super(props)
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
    //const auth = new AuthService('qjGwtKBFdcc0chj52rGul3p3nEa0LW3J', 'saivickna.auth0.com', this.props);
    
    return (
      <div>
        <div className='login'>
          {this.props.user ? (<div><div>{this.props.user.firstName + ' ' + this.props.user.lastName}</div><button onClick={this.state.auth.logout.bind(this)}>Logout</button></div>) : (<button onClick={this.state.auth.login.bind(this)}>Login</button>)}
        </div>
        <div className='room'>
          <label>Room Code: </label>
          <input value={this.state.room} onInput={linkEvent(this, roomVal)} type="text"></input>
          <button onClick={() => {this.props.setSession({socket: this.state.room, userID: this.props.user ? this.props.user.userID : -1})}}>Submit</button>
          <label>{this.props.invalidRoom === 'invalid' ? ('Invalid Room') : ('')}</label>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    type: state.type,
    user: state.user,
    room: state.room,
    invalidRoom: state.invalidRoom
  };
} 

const mapDispatchToProps = dispatch => {
  return bindActionCreators( {setPresenter, setViewer, setUser, setSession}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);