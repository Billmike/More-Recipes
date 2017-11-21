import React, { Component } from 'react';
import Navbar from './Navbar';
import Carousel from './Carousel';
import Cards from './Cards';
import SignupModal from './SignupModal';

class MoreRecipes extends Component {

	// Keep track of signup modal
	state = {
		options: ['Open', 'Close'],
		openModal: undefined
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

	// Close the modal
	handleCloseModal = () => {
		this.setState(() => {
			return {
				openModal: undefined
			}
		})
	}

	render () {
		return (
			<div>
			  <Navbar handleOpenModal={this.handleOpenModal}/>
			  <Carousel />
			  <Cards />
			  <SignupModal openModal={this.state.openModal} handleCloseModal={this.handleCloseModal}/>
			</div>
		);
	}
}

export default MoreRecipes;
