import Inferno from 'inferno';
import Component from 'inferno-component';

import { upvoteAudQuestion } from '../actions/audquestions';
import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';

class Question extends Component {
  constructor(props) {
    super(props);

    this.handleUpvote = this.handleUpvote.bind(this);
  }

  handleUpvote(e) {
    e.preventDefault();
    this.props.upvoteAudQuestion(this.props.data);
  }

  render() {
    console.log('question props', this.props)
    return (
      <div>
        <h3 >{this.props.data.content}</h3>
        <small>Votes: {this.props.data.upvotes}</small>
        <button onClick={this.handleUpvote}>+1</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    session: state.session
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators( { upvoteAudQuestion }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
