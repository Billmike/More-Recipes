import React from 'react';
import { connect } from 'react-redux';
import { startGetUserInfo } from '../actions/signinRequest';

const ProfilePage = (props) => (
  <div>
    <main className="container">
      <h1>User Account</h1>
      <form>
        <fieldset disabled>
          <div className="form-group">
            <label htmlFor="disabledTextInput">Username</label>
            <input
              type="text"
              id="usernameInput"
              className="form-control"
              placeholder="Billmike"
            />
          </div>
          <div className="form-group">
            <label htmlFor="disabledTextInput">Email Address</label>
            <input
              type="text"
              id="emailaddressInnput"
              className="form-control"
              placeholder="billmike1994@gmail.com"
            />
          </div>
        </fieldset>
      </form>
    </main>
  </div>
);

const mapStateToProps = (state, props) => {
  console.log(state);
  console.log('PROPS', props)
  return {
    userInformation: state.auth.user
  }
}

export default connect(mapStateToProps, { startGetUserInfo })(ProfilePage);
