import { EventEmitter } from 'events';
import { isTokenExpired } from './jwtHelper';
import { getLogin } from './authHelper';
import Auth0Lock from 'auth0-lock';
import Auth0 from 'auth0-js';


export default class AuthService extends EventEmitter {
  constructor(clientId, domain, props) {
    super();
    this.props = props;
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: `${window.location.origin}/`,
        responseType: 'token',
      }
    })
    // this.auth0 = this.lock.getClient();
    this.auth0 = new Auth0({
      domain: domain,
      clientID: clientId,
      responseType: 'token',
      redirectUrl: window.location.origin
    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult){
    // Saves the user token
    this.setToken(authResult.idToken)
    //console.log('authResult', authResult.state.slice(7 + authResult.state.substring(7).indexOf('/')))
    // Async loads the user profile data
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        this.loginUser(profile);
        if (authResult.state) {
          browserHistory.push(authResult.state.slice(7 + authResult.state.substring(7).indexOf('/')));
        }
        //browserHistory.push('/');

 
        this.setProfile(profile)
      }
    })
  }

  _authorizationError(error){
    // Unexpected authentication error
    console.log('Authentication Error', error)
  }

  login() {
    // Call the show method to display the widget.
      var that = this;

     this.auth0.getSSOData(function (err, data) {
      if (!err && data.sso) {
        // there is! redirect to Auth0 for SSO
        that.auth0.signin({
          connection: data.lastUsedConnection.name,
          scope: 'openid user_id name',
          responseType: 'token',
          callbackURL: window.location.origin,
          state: window.location.origin + window.location.pathname,
          //callbackOnLocationHash: true
        });
      } else {
        // regular login
        //document.body.style.display = 'inline';
        console.log(err);
        that.lock.show();
        
      }
    });
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token;
  }

  setProfile(profile){
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile(){
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  loginUser(prof) {
    const profile = prof || this.getProfile();
    profile.auth_id = profile.user_id;
    getLogin(profile).then(res => {
      if (this.props.setViewer || this.props.setPresenter) {
        res.type ? this.props.setViewer() : this.props.setPresenter();
      }
      this.props.setUser(res);
    })
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout(){
    // Clear user token and profile data from localStorage
    this.props.setUser(null);
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
}
