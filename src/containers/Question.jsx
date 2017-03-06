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
    let likes;
    if (this.props.data.upvotes !== 0) {
      likes = (<div className="audq-likes">{this.props.data.upvotes}</div>);
    } else {
      likes = null;
    }
    return (
      <div className="audq">
        <h3 className="audq-title">{this.props.data.content}</h3>
        {likes}
        <div className="audq-social">
          <span className="like" onClick={this.handleUpvote}></span>
        </div>
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
