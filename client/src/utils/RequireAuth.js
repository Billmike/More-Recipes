import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default (ComposedComponent) => {
  class RequireAuth extends Component {
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/register');
      };
    };

    componentWillUpdate(nextProps) {
      if(!nextProps.isAuthenticated) {
        this.props.history.push('/register');
      }
    };

    render() {
      return (
        <ComposedComponent {...this.props}/>
      );
    };
  };

  RequireAuth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  RequireAuth.contextTypes = {
    router: PropTypes.object.isRequired
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated
    }
  }

  return connect(mapStateToProps)(RequireAuth);
};
