import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import AuthService from '../auth/AuthService';
import { setPresenter, setViewer } from '../actions/type';
import { setUser } from '../actions/user';
import { setSession } from '../actions/session';
import { bindActionCreators } from 'redux';
import { connect } from 'inferno-redux';

function roomVal(instance, e) {
  var roomCode = e.target.value.toLowerCase();
  instance.setState({room: roomCode});
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN, props)
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
        <div>
          {this.props.user ? (<div className='login'><h1 className="welcome">Welcome to nGage, {this.props.user.firstName + ' ' + this.props.user.lastName}</h1></div>)
          : (<div className='login'><h1 className="welcome">Welcome to nGage</h1></div>)}
        </div>
          {this.props.invalidRoom === 'invalid' ? (<div className='login'>
          <p className="normal animated fadeInDown invalid">Invalid Room</p></div>) : ('')}
        <div className='room'>
          <input className='codeInput' value={this.state.room} onInput={linkEvent(this, roomVal)} type="text" placeholder="Code"
            onKeyPress={(e) => {if (e.which === 13) {this.props.setSession({socket: this.state.room, userID: this.props.user ? this.props.user.userID : -1})};}}></input>
          <button className='button' onClick={() => {this.props.setSession({socket: this.state.room, userID: this.props.user ? this.props.user.userID : -1})}} onTouchStart={() => {this.props.setSession({socket: this.state.room, userID: this.props.user ? this.props.user.userID : -1})}}>Enter</button>
        </div>
        <div>
          {this.props.user ? (<div className='login'><button onClick={this.state.auth.logout.bind(this)}  className='button'>Logout</button></div>)
          : (<div className='login'><button onClick={this.state.auth.login.bind(this)}  className='button'>Login</button></div>)}
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