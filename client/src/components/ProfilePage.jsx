import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from './Footer';
import { getUserInformation } from '../actions/signinRequest';
import cool from '../assets/img/cooll.jpg';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    getUserInformation(this.props.userInformation.id)
  }
  render() {
    return (
    <div>
    <main className="container">
      <h1 className="profile-h1">My Profile</h1>
      <div className="profile-card">
        <img src={cool} alt="John" className="profile-image" />
        <p className="profile-email">Username</p>
        <p className="prop-username"> {this.props.userInformation.username} </p>
        <p className="profile-email">Email Address</p>
        <p className="prop-email"> {this.props.userInformation.emailAddress} </p>
      </div>
    </main>
    <Footer />
  </div>
    )
  }
};

const mapStateToProps = (state, props) => {
  return {
    userInformation: state.auth.user
  };
};


export default connect(mapStateToProps, { getUserInformation })(ProfilePage);
