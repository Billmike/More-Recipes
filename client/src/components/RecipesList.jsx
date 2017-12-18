import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const RecipeList = ({ id, name, description, category }) => (
  <div className="card-group">
      <div className="card index-card">
        <Link to={`/recipe/${id}`}><img className="card-img-top" alt="Pizza" /></Link>
        <div className="card-body">
          <Link to={`/recipe/${id}`}><h4 className="card-title">{name}</h4></Link>
          <p className="card-text">{description}</p>
          <Link to={`/recipe/${id}`} className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></Link>
          <Link to={`/recipe/${id}`} className="btn border border-secondary rounded">  89 <i className="fa fa-heart" aria-hidden="true" /></Link>
          <Link to={`/recipe/${id}`} className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></Link>
        </div>
        <div className="card-footer">
          <small className="text-muted">Recipe Category - {category}</small>
        </div>
      </div>
      <div className="card index-card">
        <Link to={`/recipe/${id}`}><img className="card-img-top" alt="Pizza" /></Link>
        <div className="card-body">
          <Link to={`/recipe/${id}`}><h4 className="card-title">{name}</h4></Link>
          <p className="card-text">{description}</p>
          <Link to={`/recipe/${id}`} className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></Link>
          <Link to={`/recipe/${id}`} className="btn border border-secondary rounded">  89 <i className="fa fa-heart" aria-hidden="true" /></Link>
          <Link to={`/recipe/${id}`} className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></Link>
        </div>
        <div className="card-footer">
          <small className="text-muted">Recipe Category - {category}</small>
        </div>
      </div>
      <div className="card index-card">
        <Link to={`/recipe/${id}`}><img className="card-img-top" alt="Pizza" /></Link>
        <div className="card-body">
          <Link to={`/recipe/${id}`}><h4 className="card-title">{name}</h4></Link>
          <p className="card-text">{description}</p>
          <Link to={`/recipe/${id}`} className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></Link>
          <Link to={`/recipe/${id}`} className="btn border border-secondary rounded">  89 <i className="fa fa-heart" aria-hidden="true" /></Link>
          <Link to={`/recipe/${id}`} className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></Link>
        </div>
        <div className="card-footer">
          <small className="text-muted">Recipe Category - {category}</small>
        </div>
      </div>
  </div>
);

export default connect()(RecipeList);
