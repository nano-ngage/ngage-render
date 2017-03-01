import Inferno from 'inferno';
import Component from 'inferno-component';
import RModal from 'rmodal';
import List from '../components/List.jsx';
import Question from './Question'

import { submitAudQuestion, upvoteAudQuestion, setAudQuestions } from '../actions/audquestions'
import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';


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
    const modal = new RModal(this.refs.modal)
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
      <div>
        <div id="modal" className="modal" ref="modal">
          <div className="modal-dialog animated">
            <div className="modal-content">
              <div className="modal-body">
                <List items={this.props.audquestions} itemType={Question} />
              </div>
              <div className="modal-footer">
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
    audquestions: state.audqestions,
    session: state.session,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators( { submitAudQuestion, upvoteAudQuestion, setAudQuestions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
