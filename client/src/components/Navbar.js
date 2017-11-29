import React, { Component } from 'react';
import { connect } from 'react-redux';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#startupNavbar" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand" href="#"><img src="img/logo.png" alt="More-Recipes" height="26" /></a>
        <div className="collapse navbar-collapse navbar-expand" id="startupNavbar">
          <ul className="nav navbar-nav ml-auto">
              <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
              <li className="nav-item">
              <a className="nav-link" href="" data-toggle="modal" data-target="#sigininmodal">Sign In</a>
            </li>
              <li className="nav-item">
              <a className="btn btn-primary" href="" data-toggle="modal" data-target="#signupmodal">Sign Up</a>
            </li>
            </ul>
        </div>
            </nav>
        <div className="modal fade" id="sigininmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Sign in</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
                          <div className="form-group">
                              <input type="email" className="form-control form-control-lg" placeholder="Email Address" />
                            </div>
                          <div className="form-group">
                              <input type="password" className="form-control form-control-lg" placeholder="Password" />
                            </div>
                          <div className="form-check">
                              <label className="form-check-label">
                                  <input type="checkbox" className="form-check-input" />
                                    Remember me
                                </label>
                            </div>
                          <input type="submit" value="Submit" className="btn btn-outline-success size-bt btn-block" />
                        </form>
        <p> Forgot your password?</p>
        <p> Not yet registered? <a href="signup.html"> Let's hook you up with an account. </a> </p>
      </div>
    </div>
  </div>
</div>
<div className="modal fade" id="signupmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Sign in</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form action="/users/signup" method="POST">
      <div className="form-group">
          <input type="text" className="form-control form-control-lg" placeholder="Username" />
          <i className="glyphicon glyphicon-user form-control-feedback"></i>
      </div>
      <div className="form-group">
          <input type="email" className="form-control form-control-lg" placeholder="Email Address" />
      </div>
      <div className="form-group">
          <input className="password" className="form-control form-control-lg" placeholder="Password" />
      </div>
      <input type="submit" value="Submit" className="btn btn-outline-success size-bt btn-block" />
  </form>
  <p> Have an account? <a href="signin.html"> Sign in </a> </p>
      </div>
    </div>
  </div>
</div>
            </div>

    );
  }
}

export default Navbar;
