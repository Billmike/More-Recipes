import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background 			  : '#ECE5B6',
  }
};

const SigninModal = (props) => {
	return (
		<div>
		<Modal
		isOpen={!!props.openSigninModal}
		contentLabel='Sign up'
		onRequestClose={props.handleCloseSigninModal}
		style={customStyles}
		>
		<h3 class="sign-up-h3">Sign In</h3>
                <form>
                    <div class="form-group">
                        <input type="email" class="form-control form-control-lg" placeholder="Email Address" />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control form-control-lg" placeholder="Password" />
                    </div>
                    <div class="form-check">
                        <label class="form-check-label">
                            <input type="checkbox" class="form-check-input" />
                            Remember me
                        </label>
                    </div>
                    <input type="submit" value="Submit" class="btn btn-outline-success size-bt btn-block" />
                </form>
                <p> Forgot your password?</p>
                <p> Not yet registered? <a href="signup.html"> Let's hook you up with an account. </a> </p>
			</Modal>
		</div>
	)
}

export default SigninModal;
