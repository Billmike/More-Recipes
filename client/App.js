import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import MoreRecipes from './src/components/MoreRecipes';
import Navbar from './src/components/Navbar';
import MyRecipes from './src/components/MyRecipes';
import MyFavorites from './src/components/MyFavorites';
import UserProfile from './src/components/UserProfile';
import './src/styles/styles.scss';

class App extends Component {
	render () {
		return (
			<div>
			  <BrowserRouter>
			  <div>
			  <Navbar />
			    <Route exact path="/" component={MoreRecipes} />
			    <Route exact path="/dashboard" component={MyRecipes} />
			    <Route exact path="/favorites" component={MyFavorites} />
			    <Route exact path="/profile" component={UserProfile} />
			  </div>
			  </BrowserRouter>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
