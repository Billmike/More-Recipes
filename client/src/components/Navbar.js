import React, { Component } from 'react';

class Navbar extends Component {
	render () {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#startupNavbar" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#"><img src="./src/assets/img/more-recipes-logo.png" alt="More Recipes" height='60'/> More Recipes</a>
        <div className="collapse navbar-collapse navbar-expand" id="startupNavbar">
        <div className="search-bar">
        <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2 search-bar" type="search" placeholder="Search" aria-label="Search" />
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
    </form>
    </div>
            <ul className="nav navbar-nav ml-auto">
            <li className="nav-item active">
                <a className="nav-link" href="#">Top Recipes <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Sign Up</a>
            </li>
            <li className="nav-item">
                    <a className="btn btn-primary" href="#">Sign In</a>
            </li>
            </ul>
        </div>
</nav>
		)
	}
}

export default Navbar;
