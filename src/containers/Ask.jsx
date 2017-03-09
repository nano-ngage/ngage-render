import Inferno from 'inferno';
import Component from 'inferno-component';

import { submitAudQuestion } from '../actions/audquestions';
import { enableAsk, enableAudQ } from '../actions/qa';
import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';

class Ask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleQAModal = this.handleQAModal.bind(this);
  }

  handleInput(e) {
    e.preventDefault();
    this.setState({
      value: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newAudQ = {
      content: this.state.value
    }
    this.setState({
      value: ''
    });
    this.props.handleToggle()
    this.props.submitAudQuestion(newAudQ)
  }

  handleQAModal(e) {
    e.preventDefault();
    var toggle = e.target.value;
    if (toggle === 'enableAsk') {
      this.props.enableAsk(1);
    } else if (toggle === 'disableAsk') {
      this.props.enableAsk(0);
    } else if (toggle === 'enableAudQ') {
      this.props.enableAudQ(1);
    } else if (toggle === 'disableAudQ') {
      this.props.enableAudQ(0);
    }
  }

  render() {
    let ask;
    if (!this.props.user || this.props.user.type === 1) {
      ask = (
        <form className="modal-form" onSubmit={this.handleSubmit}>
          <h3>Have a question for the presenter?</h3>
          <div className="modal-form-group">
            <input type="text"
              placeholder="Ask a question..."
              value={this.state.value}
              onInput={this.handleInput} />
              <button type="submit">Submit</button>
          </div>
        </form>
      )
    } else if (this.props.user.type === 0) {
      ask = (
        <div className="modal-enable">
          <div className="modal-enable-ask">
            <h3>Allow participants to ask questions?</h3>
            <div className="modal-enable-buttons">
              <button value={this.props.askEnabled ? 'disableAsk' : 'enableAsk'}
                      type="text"
                      onClick={this.handleQAModal}>
                {this.props.askEnabled ? 'Disable Asking Questions' : 'Enable Asking Questions'}
              </button>
            </div>
          </div>
          <div className="modal-enable-audq">
            <h3>Allow participants to see other audience questions?</h3>
            <div className="modal-enable-buttons">
              <button value={this.props.audQEnabled ? 'disableAudQ' : 'enableAudQ'}
                      type="text"
                      onClick={this.handleQAModal}>
                {this.props.audQEnabled ? 'Hide Audience Questions' : 'Show Audience Questions'}
              </button>
            </div>
          </div>
        </div>
      )
    }

    return ask;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    session: state.session,
    askEnabled: state.askEnabled,
    audQEnabled: state.audQEnabled
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators( { submitAudQuestion, enableAsk, enableAudQ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Ask);
