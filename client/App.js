import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import MoreRecipes from './src/components/MoreRecipes';
import './src/styles/styles.scss';

class App extends Component {
	render () {
		return (
			<div>
			  <BrowserRouter>
			  <div>
			    <Route exact path="/" component={MoreRecipes} />
			  </div>
			  </BrowserRouter>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
