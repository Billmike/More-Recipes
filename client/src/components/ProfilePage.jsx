import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from './Footer';
import { getUserinfo } from '../actions/signinRequest';
import cool from '../assets/img/strawberry.jpg';

export class ProfilePage extends Component {
  componentDidMount() {
    this.props.getUserinfo();
  }
  render() {
    return (
      <div>
        <main className="container">
          <h1 className="profile-h1">My Profile</h1>
          <div className="profile-card">
            <img src={cool} alt="John" className="profile-image" />
            <p className="profile-title">Username</p>
            <p className="prop-username">
              {this.props.currentUserInfo.username}
            </p>
            <p className="profile-email">Email Address</p>
            <p className="prop-email"> {this.props.currentUserInfo.email} </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserInfo: state.auth.userDetails
  };
};

export default connect(mapStateToProps, { getUserinfo })(ProfilePage);
