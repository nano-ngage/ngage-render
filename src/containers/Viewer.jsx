import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';

import { setPresenter, setViewer } from '../actions/type';
import { setUser } from '../actions/user';
import { setSession } from '../actions/session';
import { submitAnswer } from '../actions/answer';
import { bindActionCreators } from 'redux';
import { connect } from 'inferno-redux';

import Modal from './Modal.jsx';

function response(instance, e) {
  instance.setState({content: e.target.value})
}

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }

  render() {
    return (
      <div className="viewer">
        <div className="content">
          {this.props.answers ? (
            <div>
              <div className="normal center">
                <h1>{this.props.answers.question.question}</h1>
              </div>
              <div className="answer-container">
                {
                  this.props.answers.question.type !== 2 ?
                  this.props.answers.answers.map(answer => {
                    return  <button className="answerButtons buttonColors"
                                    key={answer.answerID}
                                    onKeyPress={(e) => {
                                      if (e.which === 13) {
                                        this.props.submitAnswer({
                                          question: this.props.answers.question,
                                          answer: this.state.content
                                        });
                                      };
                                    }}
                                    onClick={() => {
                                      this.props.submitAnswer({
                                        question: this.props.answers.question,
                                        answer: answer
                                      });
                                    }} >
                              {answer.answer}
                            </button>
                          })
                        : (<div className="center">
                            <input
                              className="free-response"
                              type="text"
                              placeholder="Enter Response"
                              onInput={linkEvent(this, response)}
                            />
                            <button
                              className='button'
                              onClick={() => this.props.submitAnswer({
                                question: this.props.answers.question,
                                answer: this.state.content
                              })}>
                              Submit
                            </button>
                          </div>)
                }
              </div>
            </div>
              ) :
            <div className="center-waiting">
              <p className="normal">Waiting for question...</p>
              <div className="center">
                <img src="dist/ripple.gif" className="loading"/>
              </div>
            </div>
          }
        </div>
        <Modal />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    type: state.type,
    user: state.user,
    answers: state.setAnswers
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators( { setPresenter, setViewer, setUser, submitAnswer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
