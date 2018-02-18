import React from 'react';
import { connect } from 'react-redux';
import Footer from './Footer';
import { startGetUserInfo } from '../actions/signinRequest';
import cool from '../assets/img/cooll.jpg';

const ProfilePage = props => (
  <div>
    <main className="container">
      <h1 className="profile-h1">My Profile</h1>
      <div className="profile-card">
        <img src={cool} alt="John" className="profile-image" />
        <p className="profile-email">Username</p>
        <p className="prop-username"> {props.userInformation.username} </p>
        <p className="profile-email">Email Address</p>
        <p className="prop-email"> {props.userInformation.emailAddress} </p>
      </div>
    </main>
    <Footer />
  </div>
);

const mapStateToProps = (state, props) => {
  return {
    userInformation: state.auth.user
  };
};

export default connect(mapStateToProps, { startGetUserInfo })(ProfilePage);
