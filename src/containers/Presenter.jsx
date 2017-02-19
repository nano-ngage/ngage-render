import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import { presentation } from '../actions/session';
import { bindActionCreators } from 'redux';
import { connect } from 'inferno-redux';



class Presenter extends Component {
  constructor(props) {
    super(props)

  }


  render() {    
    return (
      <div>
        {this.props.presentation ? (<button onClick={() => {presentation(1)}}>Start Presentation</button>) : (
            Presentation Started!
          )
        
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    session: state.session,
    user: state.user,
    presentation: state.presentation
  };
} 

const mapDispatchToProps = dispatch => {
  return bindActionCreators( {presentation}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Presenter);