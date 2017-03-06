import Inferno from 'inferno';
import Component from 'inferno-component';

import List from '../components/List.jsx';
import Question from './Question.jsx';
import Ask from './Ask.jsx';

import { audQuestions } from '../actions/audquestions';
import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';


class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      modal: ''
    }

    this.handleToggle = this.handleToggle.bind(this);
  }


  handleToggle(e) {
    var modal = e.target.className === 'modal-button' ? '' : e.target.className
    e.preventDefault();
    this.setState({
      active: !this.state.active,
      modal: modal
    });
  }

  render() {
    return (
      <div className="modal-container">
        <div className="modal-list">
          <ul className="dots">
            <li>
              <a className="question" href="#" onClick={this.handleToggle}>
                <span className="question"></span>
              </a>
            </li>
            <li>
              <a className="aud" href="#" onClick={this.handleToggle}>
                <span className="aud">
                  {mark}
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className={modalClasses} id="modal">
            <div className="modal-button" onClick={this.handleToggle}>
              <span >&#10006;</span>
            </div>
          <div className={gutsClasses}>
            {modalGuts}
          </div>
        </div>

        <div className={overlayClasses} id="modal-overlay"></div>
      </div>



    );
  }
}

const mapStateToProps = state => {
  return {
    audQuestions: state.audQuestions
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators( { audQuestions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
