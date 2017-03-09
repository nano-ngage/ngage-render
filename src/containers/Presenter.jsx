import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import { setPresentation } from '../actions/session';
import { setQuestion } from '../actions/question';
import { setAskedQuestions, deleteQuestion } from '../actions/questions';
import { setShowAnswer } from '../actions/answer';
import { bindActionCreators } from 'redux';
import { connect } from 'inferno-redux';

import Modal from './Modal.jsx';

class Presenter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="content">
        <div className="center">
          <div className="presenter welcome">
            {this.props.session.presentationTitle}
          </div>
          <Modal />
          {
            this.props.questions === null  ?
            (
              <div className="presenter">
                <button className='button'
                        onClick={() => {this.props.setPresentation(1)}}>
                  Start Presentation
                </button>
              </div>
            ) :
            (
              <div className="questions">
                <div className="normal black">
                  Current Question:
                </div>
                <div className="q-title">
                  {this.props.question === null ?
                    'Please Select Question' :
                    <div className="current-question">
                      {this.props.question.question}{this.props.question.type === 1 ?
                        <button
                          className="button show-answer"
                          onClick={() => {
                            this.props.setShowAnswer(this.props.question.questionID)
                          }}>
                          Show Answer
                        </button> : ''}
                    </div>}
                  </div>
                <div className="questions-container">
                  <div className="to-ask">
                    <h3 className="normal black">Queue</h3>
                    {this.props.questions.map(question => {
                      return <button
                                dclassName='questionButtons buttonColors'
                                onClick={() => {
                                  this.props.setQuestion(question);
                                  this.props.setAskedQuestions(question);
                                  this.props.deleteQuestion(question)}}
                                key={question.questionID}>
                                {question.question}
                              </button>
                            })}
                  </div>
                  <div className="to-ask">
                    <h3 className="normal black">Asked</h3>
                    {this.props.askedQuestions.length > 0 ? this.props.askedQuestions.map(question => <button className='askedColors' onClick={() => {this.props.setQuestion(question);}} key={question.questionID}>{question.question}</button>) : ''}
                  </div>
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
    questions: state.questions,
    question: state.question,
    askedQuestions: state.askedQuestions
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators( { setPresentation, setQuestion, setAskedQuestions, deleteQuestion, setShowAnswer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Presenter);

//<button key={question.id}>{question.question}</button>

// Single column questions
// <div className="question-container">
//                   {this.props.questions.map(question => {
//                     if (i < 4) {
//                       i++;
//                     } else {
//                       i = 1;
//                     }
//                     return <button className='questionButtons' style={"background-color: "+ colors[i - 1]} onClick={() => {this.props.setQuestion(question)}} key={question.questionID}>{question.question}</button>})}
//                 </div>
