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

const SignupModal = (props) => {
	return (
		<Modal
		isOpen={!!props.openModal}
		contentLabel='Sign up'
		onRequestClose={props.handleCloseModal}
		style={customStyles}
		>
                <h3>Fill out this form to get started.</h3>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control form-control-lg" placeholder="Username" />
                        <i className="glyphicon glyphicon-user form-control-feedback"></i>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control form-control-lg" placeholder="Email Address" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control form-control-lg" placeholder="Password" />
                    </div>
                    <input type="submit" value="Submit" className="btn btn-outline-success size-bt btn-block" />
                </form>
                <p> Have an account? <a href="signin.html"> Sign in </a> </p>
		</Modal>
	)
}

export default SignupModal;
