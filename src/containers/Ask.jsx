import Inferno from 'inferno';
import Component from 'inferno-component';

import { submitAudQuestion } from '../actions/audquestions';
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
    console.log('newAudQ', newAudQ)
    this.props.submitAudQuestion(newAudQ)
  }

  render() {
    return (
      <form className="center" onSubmit={this.handleSubmit}>
        <h3>Have a question for the presenter?</h3>
        <input type="text"
               className="ainput"
               placeholder="Ask a question..."
               value={this.state.value}
               onInput={this.handleInput} />
        <button type="submit" className="button" >Submit</button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    session: state.session
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators( { submitAudQuestion }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Ask);
