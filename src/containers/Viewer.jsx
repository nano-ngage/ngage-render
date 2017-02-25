import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import { setPresenter, setViewer } from '../actions/type';
import { setUser } from '../actions/user';
import { setSession } from '../actions/session';
import { setAnswer, submitAnswer } from '../actions/answer';
import { bindActionCreators } from 'redux';
import { connect } from 'inferno-redux';


class Viewer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var i = 0;
    var colors = ["#ffd380", "#71b2fb", "#b195c6", "#ffb1b1"];
    return (
      <div className="content">
        {this.props.answers ? (
          <div>
            <div className="center"><p className="normal"><h1>{this.props.answers.question.question}</h1> <br /><br/></p>
            </div>
            <div className="center">
            {this.props.answers.answers.map(answer => {
              i++;
              return <button className="answerButtons" style={"background-color: "+ colors[i]} onClick={() => {this.props.submitAnswer({question: this.props.answers.question, answer:answer})}} key={answer.answerID}>{answer.answer}</button>})}
            </div>
          </div>
          ) :  <div className="center-waiting"><p className="normal">Waiting for question...</p><div className="center"><img src="styles/ripple.gif" className="loading"/></div></div>
        }
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
  return bindActionCreators( {setPresenter, setViewer, setUser, setAnswer, submitAnswer}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);