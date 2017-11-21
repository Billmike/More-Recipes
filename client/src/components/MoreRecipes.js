import React, { Component } from 'react';
import Navbar from './Navbar';
import Carousel from './Carousel';
import Cards from './Cards';

class MoreRecipes extends Component {
	render () {
		return (
			<div>
			  <Navbar />
			  <Carousel />
			  <Cards />
			</div>
		);
	}
}

export default MoreRecipes;
