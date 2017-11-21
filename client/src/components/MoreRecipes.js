import React, { Component } from 'react';
import Navbar from './Navbar';
import Carousel from './Carousel';
import Cards from './Cards';
import SignupModal from './SignupModal';
import SigninModal from './SigninModal';

class MoreRecipes extends Component {

	// Keep track of signup modal
	state = {
		options: ['Open', 'Close'],
		openModal: undefined,
		openSigninModal: undefined
	}

	// Toggle the state of the signup modal
	handleOpenModal = () => {
		const randomOption = Math.floor(Math.random() * this.state.options.length);
		const randomState = this.state.options[randomOption];
		this.setState(() => {
			return {
				openModal: randomState
			}
		})
	}

	handleOpenSigninModal = () => {
		const randomOption = Math.floor(Math.random() * this.state.options.length);
		const randomState = this.state.options[randomOption];
		this.setState(() => {
			return {
				openSigninModal: randomState
			}
		})
	}

	// Close the signup modal
	handleCloseModal = () => {
		this.setState(() => {
			return {
				openModal: undefined
			}
		})
	}

	handleCloseSigninModal = () => {
		this.setState(() => {
			return {
				openSigninModal: undefined
			}
		})
	}

	render () {
		return (
			<div>
			  <Navbar
			  handleOpenModal={this.handleOpenModal}
			  handleOpenSigninModal={this.handleOpenSigninModal}/>
			  <Carousel />
			  <Cards />
			  <SignupModal openModal={this.state.openModal} handleCloseModal={this.handleCloseModal}/>
			  <SigninModal openSigninModal={this.state.openSigninModal} handleCloseSigninModal={this.handleCloseSigninModal}/>
			</div>
		);
	}
}

export default MoreRecipes;
