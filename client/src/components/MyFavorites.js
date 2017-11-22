import React from 'react';

const MyFavorites = () => {
	return (
		<div className="container">
		  <h1>My Favorites</h1>
        <div className="card-group">
          <div class="card">
            <a href="./recipe_detail.html"><img className="card-img-top" src="./src/assets/img/pizzza.jpg" alt="Card image cap" /></a>
            <div className="card-body">
              <a href="./recipe_detail.html"><h4 className="card-title">Pizza Pepperoni with mushroom toppings.</h4></a>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
              <a href="recipe_detail.html" className="btn border border-secondary rounded" role="button">View <i className="fa fa-eye" aria-hidden="true"></i></a> 
              <button type="button" className="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal">
                Remove <i className="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <a href="./recipe_detail.html"><img className="card-img-top" src="./src/assets/img/pizzza.jpg" alt="Card image cap" /></a>
            <div className="card-body">
              <a href="./recipe_detail.html"><h4 className="card-title">Pizza Pepperoni with mushroom toppings.</h4></a>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
              <a href="recipe_detail.html" className="btn border border-secondary rounded" role="button">View <i className="fa fa-eye" aria-hidden="true"></i> </a> 
              <button type="button" className="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal">
                Remove <i className="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <a href="./recipe_detail.html"><img className="card-img-top" src="./src/assets/img/pizzza.jpg" alt="Card image cap" /></a>
            <div className="card-body">
              <a href="./recipe_detail.html"><h4 className="card-title">Pizza Pepperoni with mushroom toppings.</h4></a>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
              <a href="recipe_detail.html" className="btn border border-secondary rounded" role="button">View <i className="fa fa-eye" aria-hidden="true"></i></a> 
              <button type="button" className="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal">
                Remove <i className="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
		</div>
	)
}

export default MyFavorites;
