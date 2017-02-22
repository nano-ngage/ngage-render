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
    return (
      <div>
        {this.props.answers ? (
          <div>
            <div>
              {this.props.answers.question.question}
            </div>
            <div>
            {this.props.answers.answers.map(answer => <button onClick={() => {this.props.submitAnswer({question: this.props.answers.question, answer:answer})}} key={answer.answerID}>{answer.answer}</button>)}
            </div>
          </div>
          ) : 'Waiting for presenter to ask next question...'
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