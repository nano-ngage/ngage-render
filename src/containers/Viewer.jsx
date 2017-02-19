import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import { setPresenter, setViewer } from '../actions/type';
import { setUser } from '../actions/user';
import { setSession } from '../actions/session';
import { bindActionCreators } from 'redux';
import { connect } from 'inferno-redux';

class Viewer extends Component {
  constructor(props) {
    super(props)
  }
  render() {    
    return (
      <div>
        Waiting for presentation to start...
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    type: state.type,
    user: state.user
  };
} 

const mapDispatchToProps = dispatch => {
  return bindActionCreators( {setPresenter, setViewer, setUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);