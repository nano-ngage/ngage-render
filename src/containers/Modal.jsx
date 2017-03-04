import Inferno from 'inferno';
import Component from 'inferno-component';
import RModal from 'rmodal';
import List from '../components/List.jsx';
import Question from './Question.jsx';

import { audQuestions } from '../actions/audquestions';
import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';

import css from 'rmodal/src/rmodal.css';
import css from '/animate.css';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: null
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  componentDidMount() {
    const modal = new RModal(this.modal)

    this.setState({
      modal: modal
    });
  }

  handleClose(e) {
    e.preventDefault();
    if (this.state.modal) {
      this.state.modal.close();
    }
  }

  handleOpen(e) {
    e.preventDefault();
    if (this.state.modal) {
      this.state.modal.open();
    }
  }

  render() {
    return (
      <div className="center">
        <div id="modal" className="modal-background modal" ref={div => { this.modal = div; }} >
          <div className="modal-dialog animated">
            <div className="modal-content">
              <div className="modal-body">
                <List items={this.props.audQuestions} itemType={Question} />
              </div>
              <div className="modal-footer center">
                <button className="button" onClick={this.handleClose} >Close</button>
              </div>
            </div>
          </div>
        </div>
        <button className="button" onClick={this.handleOpen} >Audience Questions</button>
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
