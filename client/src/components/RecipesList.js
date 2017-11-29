import React from 'react';
import pizza from '../assets/img/pizzza.jpg';

const RecipeList = ({ name, description, category }) => {
	return (
		<div className="card-group">
        <div className="card index-card">
            <a href="./template/recipe_detail.html"><img className="card-img-top" src={ pizza } alt="Card image cap" /></a>
            <div className="card-body">
              <a href="./template/recipe_detail.html"><h4 className="card-title">{name}</h4></a>
              <p className="card-text">{description}</p>
              <a href="./template/recipe_detail.html" className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></a>
              <a href="#" className="btn border border-secondary rounded" data-toggle="modal" data-target="#exampleModal">  89 <i className="fa fa-heart" aria-hidden="true" /></a>
              <a href="./template/recipe_detail.html#comment" className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></a>
            </div>
            <div className="card-footer">
              <small className="text-muted">Recipe Category - {category}</small>
            </div>
          </div>
          <div className="card index-card">
            <a href="./template/recipe_detail.html"><img className="card-img-top" src={ pizza } alt="Card image cap" /></a>
            <div className="card-body">
              <a href="./template/recipe_detail.html"><h4 className="card-title">{name}</h4></a>
              <p className="card-text">{description}</p>
              <a href="./template/recipe_detail.html" className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></a>
              <a href="#" className="btn border border-secondary rounded" data-toggle="modal" data-target="#exampleModal">  89 <i className="fa fa-heart" aria-hidden="true" /></a>
              <a href="./template/recipe_detail.html#comment" className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></a>
            </div>
            <div className="card-footer">
              <small className="text-muted">Recipe Category - {category}</small>
            </div>
          </div>
          <div className="card index-card">
            <a href="./template/recipe_detail.html"><img className="card-img-top" src={ pizza } alt="Card image cap" /></a>
            <div className="card-body">
              <a href="./template/recipe_detail.html"><h4 className="card-title">{name}</h4></a>
              <p className="card-text">{description}</p>
              <a href="./template/recipe_detail.html" className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></a>
              <a href="#" className="btn border border-secondary rounded" data-toggle="modal" data-target="#exampleModal">  89 <i className="fa fa-heart" aria-hidden="true" /></a>
              <a href="./template/recipe_detail.html#comment" className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></a>
            </div>
            <div className="card-footer">
              <small className="text-muted">Recipe Category - {category}</small>
            </div>
          </div>
      </div>
		)
};

export default RecipeList;
