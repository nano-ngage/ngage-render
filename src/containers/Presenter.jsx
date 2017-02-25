import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import { setPresentation } from '../actions/session';
import { setQuestion } from '../actions/question';
import { bindActionCreators } from 'redux';
import { connect } from 'inferno-redux';



class Presenter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="content">
        <div className="center">
          <div className="presenter welcome">{this.props.session.presentationTitle}</div>
          {this.props.questions === null  ?
            (
              <div className="presenter"><button className='button' onClick={() => {this.props.setPresentation(1)}}>Start Presentation</button></div>
            ) :
            (
              <div className="questions">
                <h1 className="normal q-header">Questions:</h1>
                <div className="question-container">
                  {this.props.questions.map(question => <button className='questionButtons' onClick={() => {this.props.setQuestion(question)}} key={question.questionID}>{question.question}</button>)}
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    session: state.session,
    user: state.user,
    questions: state.questions
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators( {setPresentation, setQuestion}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Presenter);

//<button key={question.id}>{question.question}</button>

//
// DOUBLE COLUMN QUESTIONS - goes under className="questions"
// <div className="questions-container">
//   <div className="to-ask">
//     <h3 className="normal">Queue</h3>
//     {this.props.questions.map(question => <button className='questionButtons' onClick={() => {this.props.setQuestion(question)}} key={question.questionID}>{question.question}</button>)}
//   </div>
//   <div className="to-ask">
//     <h3 className="normal">Asked Qs</h3>
//     {this.props.questions.map(question => <button className='questionButtons' onClick={() => {this.props.setQuestion(question)}} key={question.questionID}>{question.question}</button>)}
//   </div>
// </div>