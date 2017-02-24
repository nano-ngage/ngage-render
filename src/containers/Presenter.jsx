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
        <div className="center"><p className="normal">Presentation Title</p>
          {this.props.questions === null  ? (<button className='button' onClick={() => {this.props.setPresentation(1)}}>Start Presentation</button>) : 
            (
              <div>
                {this.props.questions.map(question => <button className='button' onClick={() => {this.props.setQuestion(question)}} key={question.questionID}>{question.question}</button>)}
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