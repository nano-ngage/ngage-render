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
    this.sortQByUpvote = this.sortQByUpvote.bind(this);
  }


  handleToggle(e) {
    const modal;
    if (e) {
      e.preventDefault();
      modal = e.target.className === 'modal-button' ? '' : e.target.className
    } else {
      modal = ''
    }
    this.setState({
      active: !this.state.active,
      modal: modal
    });
  }

  sortQByUpvote(a, b) {
    return b.children.props.data.upvotes - a.children.props.data.upvotes;
  }

  render() {
    let modalClasses = 'modal' + (this.state.active ? ' modal-' + this.state.modal : ' modal-closed')
    let overlayClasses = 'modal-overlay' + (this.state.active ? '' : ' modal-closed')
    let gutsClasses = 'modal-guts' + (this.state.modal === '' ? '' : ' modal-' + this.state.modal)

    let modalGuts;
    if (this.state.modal === 'question') {
      modalGuts = (<Ask handleToggle={this.handleToggle} />)
    } else if (this.state.modal === 'aud') {
      modalGuts = (<List ulClass="modal-ul"
                         items={this.props.audQuestions}
                         itemType={Question}
                         sortBy={this.sortQByUpvote} />)
    } else {
      modalGuts = null;
    }

    let mark;

    if (this.props.audQuestions && this.props.audQuestions.length !== 0) {
      mark = (<mark className="aud">{this.props.audQuestions.length}</mark>)
    } else {
      mark = null;
    }

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

        <div className={overlayClasses}
             id="modal-overlay"
             onClick={this.handleToggle}></div>
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
