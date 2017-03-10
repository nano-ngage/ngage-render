import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import AuthService from '../auth/AuthService';
import { setPresenter, setViewer } from '../actions/type';
import { setUser } from '../actions/user';
import { startPresSession } from '../actions/session';
import { setResponse } from '../actions/response';
import { bindActionCreators } from 'redux';
import { connect } from 'inferno-redux';
import isProfanity from '../helpers/isProfanity';

class Presentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN, props)
    }
  }

  componentDidMount() {
    // setTimeout(this.checkLogin, 1000);
     if (!this.state.auth.loggedIn()) {
      this.state.auth.login();
    } else {
      this.state.auth.loginUser();
      this.props.startPresSession({socket: this.props.params.socket});
    }
  }

  render() {
    var total = 0;
    return (
      <div>
      <div className="content">
        {this.props.user ? (this.props.pressession ? (this.props.response ? (
          <div>
            <div>
                <div className="center"><p className="normal">Room Code: {this.props.params.socket}</p></div>
                <div className="center"><div className="participants">
                {(this.props.participant && (this.props.participant > 0)) ? this.props.participant : 0}
                </div></div>
                <div className="center"><p className="normal">Participants</p></div>
            </div>

          {this.props.response.correct ?
            <div className="correct animated fadeInUp">Correct Answer: {this.props.response.correct.correct[0].answer}</div> : ''}

          {this.props.response.question.type !== 2 ? (
            <div>
            <div className="chart-display">
              <div className="zoom answerbox">
              <div className="white">{this.props.response.question.question}</div>
                <svg class="chart" width="520" height={this.props.response.answers.length*20}>
                  {this.props.response.answers.map((answer, index) => {
                    total += answer.count;
                    return <g class={answer.answerID + " answersColors"}  transform={"translate(0," + 20*index + ")"}>
                    <rect width={(10 + answer.count * 10).toString()} height="19"></rect>
                    <text x={(15 + answer.count * 10).toString()} y="9.5" dy=".35em">{answer.answer}&nbsp;:&nbsp;{answer.count} </text></g>})}
                </svg>
                <div className="white">Total Responses: {total}</div>
              </div>
          </div>

          </div>
          )
          : <div className="response-container">
            <div className="normal"><br/> Question: {this.props.response.question.question}</div>
            {this.props.response.response ? (
            <div className="response-body">
              {this.props.response.response.filter(resp => !isProfanity(resp.content)).map(resp => {
                return <div className="viewPpt buttonColors animated slideIn"><span className="title">{'"' + resp.content + '"'}</span><span className="action">{'- ' + resp.rand}</span></div>
              })}
            </div>) : <div></div>}
            </div>}
            </div>
          ) : <div>
                <div className="center"><p className="normal">Room Code: {this.props.params.socket}</p></div>
                <div className="center"><div className="participants">
                {(this.props.participant && (this.props.participant > 0)) ? this.props.participant : 0}
                </div></div>
                <div className="center"><p className="normal">Participants</p></div>
              </div>
        ) : <div className="center"><p className="normal">Not a valid session</p></div>
        ) : <div className="center"><p className="normal">Please login</p></div>}
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
    pressession: state.pressession,
    participant: state.participant
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators( {setUser, startPresSession, setResponse}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);
