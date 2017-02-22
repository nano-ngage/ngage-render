import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import AuthService from '../auth/AuthService';
import { setPresenter, setViewer } from '../actions/type';
import { setUser } from '../actions/user';
import { startPresSession } from '../actions/session';
import { setResponse } from '../actions/response';
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
      this.props.startPresSession({socket: this.props.params.socket});
    }
  }

  render() {    
    return (
      <div>
        <div>
        {this.props.user ? (this.props.pressession ? (this.props.response ? (
          <div>
            <div>Room Code:{this.props.params.socket}</div>
            <div>
              {this.props.response.question.question}
            </div>
            <svg class="chart" width="420" height="120">
              {this.props.response.answers.map((answer, index) => <g transform={"translate(0," + 20*index + ")"}><rect width={(20 + answer.count * 30).toString()} height="19"></rect><text x={(15 + answer.count * 30).toString()} y="9.5" dy=".35em">{answer.answer}</text></g>)}
            </svg>
          </div>
          ) : <div>Room Code: {this.props.params.socket}</div>) : 'Not a valid session') : 'Please login'}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    type: state.type,
    user: state.user,
    response: state.response,
    pressession: state.pressession
  };
} 

const mapDispatchToProps = dispatch => {
  return bindActionCreators( {setPresenter, setViewer, setUser, startPresSession, setResponse}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);


            // <g transform="translate(0,20)">
            //   <rect width="80" height="19"></rect>
            //   <text x="77" y="9.5" dy=".35em">8</text>
            // </g>
            // <g transform="translate(0,40)">
            //   <rect width="150" height="19"></rect>
            //   <text x="147" y="9.5" dy=".35em">15</text>
            // </g>
            // <g transform="translate(0,60)">
            //   <rect width="160" height="19"></rect>
            //   <text x="157" y="9.5" dy=".35em">16</text>
            // </g>
            // <g transform="translate(0,80)">
            //   <rect width="230" height="19"></rect>
            //   <text x="227" y="9.5" dy=".35em">23</text>
            // </g>
            // <g transform="translate(0,100)">
            //   <rect width="420" height="19"></rect>
            //   <text x="417" y="9.5" dy=".35em">42</text>
            // </g>