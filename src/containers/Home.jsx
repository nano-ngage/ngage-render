import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import AuthService from '../auth/AuthService';
import { setPresenter, setViewer } from '../actions/type';
import { setUser } from '../actions/user';
import { setRoom } from '../actions/room';
import { bindActionCreators } from 'redux';
import { connect } from 'inferno-redux';

function roomVal(instance, e) {
  instance.setState({room: e.target.value});  
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: ''
    }
  }


  render() {
    const auth = new AuthService('qjGwtKBFdcc0chj52rGul3p3nEa0LW3J', 'saivickna.auth0.com', this.props);
    
    return (
      <div>
        {this.props.user ? ('Hello' + this.props.user.firstName) : 'Not Hello'}
        <button onClick={auth.login.bind(this)}>Login</button>
        <label>Enter Room Code:</label>
        {this.props.answer ? (JSON.stringify(this.props.answer)) : 'No answers'}
        <input value={this.state.room} onInput={linkEvent(this, roomVal)} type="text"></input>
        <button onClick={() => {this.props.setRoom(this.state.room)}}>Submit</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    type: state.type,
    user: state.user,
    answer: state.answer
  };
} 

const mapDispatchToProps = dispatch => {
  return bindActionCreators( {setPresenter, setViewer, setUser, setRoom}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);