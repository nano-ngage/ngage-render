import Inferno, {linkEvent} from 'inferno';
import Component from 'inferno-component';
import AuthService from '../auth/AuthService';
import { setPresenter, setViewer } from '../actions/type';
import { setUser } from '../actions/user';
import { startPresSession } from '../actions/session';
import { setResponse } from '../actions/response';
import { bindActionCreators } from 'redux';
import { connect } from 'inferno-redux';


class Presentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN, props)
      // total: 0
    }
    // this.updateTotal = this.updateTotal.bind(this);
  }

  componentDidMount() {
    // setTimeout(this.checkLogin, 1000);
     if (!this.state.auth.loggedIn()) {
      this.state.auth.login();
    } else {
      this.state.auth.loginUser();
      this.props.startPresSession({socket: this.props.params.socket});
    }
  }

  // updateTotal(count) {
  //   this.setState({total: count});
  // }

  render() {
    var total = 0;
    return (
      <div>
      <div className="content">
        {this.props.user ? (this.props.pressession ? (this.props.response ? (
          <div>
            <div className="center"><p className="normal">Room Code: {this.props.params.socket}</p></div>
            <div>
              <p className="welcome">{this.props.response.question.question}</p>
            </div>

          {this.props.response.question.type !== 2 ? (
            <div>
              <div className="zoom">
                <svg class="chart" width="420" height="120">
                  {this.props.response.answers.map((answer, index) => {
                    total += answer.count;
                    // var total = this.state.total + answer.count;
                    // updateTotal(total);
                    return <g transform={"translate(0," + 20*index + ")"}>
                    <rect width={(20 + answer.count * 30).toString()} height="19"></rect>
                    <text x={(25 + answer.count * 30).toString()} y="9.5" dy=".35em">{answer.answer}&nbsp;-&nbsp;{answer.count} </text></g>})}
                </svg>
              </div>
            <div className="normal">Total Responses: {total}</div>
          </div>
          )
          : <div className="response-body">
            {this.props.response.response ? (
            <div >
              {this.props.response.response.map(resp => {
                return <div className="viewPpt buttonColors animated slideIn"><span className="title">{'"' + resp.content + '"'}</span><span className="action">{'- ' + resp.rand}</span></div>
              })}
            </div>) : <div></div>}
            </div>}
            </div>
          ) : <div className="center"><p className="normal">Room Code: {this.props.params.socket}</p></div>
        ) : <div className="center"><p className="normal">Not a valid session</p></div>
        ) : <div className="center"><p className="normal">Please login</p></div>}
        </div>
      </div>
    )
    // return (
    //   this.props.response && this.props.user && this.props.pressession ? (
    //   <div>
    //     {console.log(this.props.response)}
    //   </div>
    //   ) :
    //   <div>No response yet</div>
    // )
  }
}

const mapStateToProps = state => {
  return {
    type: state.type,
    user: state.user,
    response: state.response,
    pressession: state.pressession
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators( {setUser, startPresSession, setResponse}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Presentation);


            // <g transform="translate(0,20)">
            //   <rect width="80" height="19"></rect>
            //   <text x="77" y="9.5" dy=".35em">8</text>
            // </g>
            // <g transform="translate(0,40)">
            //   <rect width="150" height="19"></rect>
            //   <text x="147" y="9.5" dy=".35em">15</text>
            // </g>
            // <g transform="translate(0,60)">
            //   <rect width="160" height="19"></rect>
            //   <text x="157" y="9.5" dy=".35em">16</text>
            // </g>
            // <g transform="translate(0,80)">
            //   <rect width="230" height="19"></rect>
            //   <text x="227" y="9.5" dy=".35em">23</text>
            // </g>
            // <g transform="translate(0,100)">
            //   <rect width="420" height="19"></rect>
            //   <text x="417" y="9.5" dy=".35em">42</text>
            // </g>