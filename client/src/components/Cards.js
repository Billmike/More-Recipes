import React, { Component } from 'react';

class Cards extends Component {
	render () {
		return (
			<div>
			  <div className="card-group">
          <div className="card index-card">
            <a href="./template/recipe_detail.html"><img className="card-img-top" src="../src/assets/img/pizzza.jpg" alt="Card image cap" /></a>
            <div className="card-body">
              <a href="./template/recipe_detail.html"><h4 className="card-title">Pizza Pepperoni with mushroom toppings.</h4></a>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
              <a href="./template/recipe_detail.html" className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true"></i></a>
              <a href="#" className="btn border border-secondary rounded" data-toggle="modal" data-target="#exampleModal">  89 <i className="fa fa-heart" aria-hidden="true"></i></a> 
              <a href="./template/recipe_detail.html#comment" className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true"></i></a>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card index-card">
            <a href="./template/recipe_detail.html"><img className="card-img-top" src="../src/assets/img/pizzza.jpg" alt="Card image cap" /></a>
            <div className="card-body">
              <a href="./template/recipe_detail.html"><h4 className="card-title">Pizza Pepperoni with mushroom toppings.</h4></a>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
              <a href="./template/recipe_detail.html" className="btn border border-secondary rounded">180 <i className="fa fa-eye" aria-hidden="true"></i></a>
              <a href="#" className="border border-secondary rounded btn" data-toggle="modal" data-target="#exampleModal">  150 <i className="fa fa-heart" aria-hidden="true"></i></a> 
              <a href="./template/recipe_detail.html#comment" className="btn border border-secondary rounded"> 70 <i className="fa fa-comments" aria-hidden="true"></i></a>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card index-card">
            <a href="./template/recipe_detail.html"><img className="card-img-top" src="../src/assets/img/pizzza.jpg" alt="Card image cap" /></a>
            <div className="card-body">
              <a href="./template/recipe_detail.html"><h4 className="card-title">Pizza Pepperoni with mushroom toppings.</h4></a>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. </p>
              <a href="./template/recipe_detail.html" className="border btn border-secondary rounded">67 <i className="fa fa-eye" aria-hidden="true"></i></a>
              <a href="#" className="border btn border-secondary rounded" data-toggle="modal" data-target="#exampleModal">  49 <i className="fa fa-heart" aria-hidden="true"></i></a> 
              <a href="./template/recipe_detail.html#comment" className="btn border border-secondary rounded"> 90 <i className="fa fa-comments" aria-hidden="true"></i></a>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
		</div>
		)
	}
}

export default Cards;
