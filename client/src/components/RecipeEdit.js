import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import pizza from '../assets/img/pizzza.jpg';

const RecipeEdit = ({ id, name, description, category }) => {
	return (
		<div className="card-group">
        <div className="card index-card">
            <Link to={`/recipe/${id}`}><img className="card-img-top" src={ pizza } alt="Pizza" /></Link>
            <div className="card-body">
              <Link to={`/recipe/${id}`}><h4 className="card-title">{name}</h4></Link>
              <p className="card-text">{description}</p>
              <Link to={`/recipe/${id}`} className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></Link>
              <Link to={`/recipe/${id}`} className="btn border border-secondary rounded">  89 <i className="fa fa-heart" aria-hidden="true" /></Link>
              <Link to={`/recipe/${id}`} className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></Link>
            </div>
            <div className="container" style={{ textAlign : 'justify' }}>
            <Link to={`/edit/${id}`} className="btn btn-outline-success" role="button">Edit <i className="fa fa-pencil-square-o"></i></Link>
            <Link to={`/edit/${id}`} class="btn btn-danger" role="button">Delete <i class="fa fa-pencil-square-o"></i></Link>
            </div>
            <div className="card-footer">
              <small className="text-muted">Recipe Category - {category}</small>
            </div>
          </div>
          <div className="card index-card">
            <Link to={`/recipe/${id}`}><img className="card-img-top" src={ pizza } alt="Pizza" /></Link>
            <div className="card-body">
              <Link to={`/recipe/${id}`}><h4 className="card-title">{name}</h4></Link>
              <p className="card-text">{description}</p>
              <Link to={`/recipe/${id}`} className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></Link>
              <Link to={`/recipe/${id}`} className="btn border border-secondary rounded">  89 <i className="fa fa-heart" aria-hidden="true" /></Link>
              <Link to={`/recipe/${id}`} className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></Link>
            </div>
            <div className="container" style={{ textAlign : 'justify' }}>
            <Link to={`/edit/${id}`} class="btn btn-outline-success" role="button">Edit <i class="fa fa-pencil-square-o"></i></Link>
            <Link to={`/edit/${id}`} class="btn btn-danger" role="button">Delete <i class="fa fa-pencil-square-o"></i></Link>
            </div>
            <div className="card-footer">
              <small className="text-muted">Recipe Category - {category}</small>
            </div>
          </div>
          <div className="card index-card">
            <Link to={`/recipe/${id}`}><img className="card-img-top" src={ pizza } alt="Pizza" /></Link>
            <div className="card-body">
              <Link to={`/recipe/${id}`}><h4 className="card-title">{name}</h4></Link>
              <p className="card-text">{description}</p>
              <Link to={`/recipe/${id}`} className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></Link>
              <Link to={`/recipe/${id}`} className="btn border border-secondary rounded">  89 <i className="fa fa-heart" aria-hidden="true" /></Link>
              <Link to={`/recipe/${id}`} className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></Link>
            </div>
            <div className="container" style={{ textAlign : 'justify' }}>
            <Link to={`/edit/${id}`} class="btn btn-outline-success" role="button">Edit <i class="fa fa-pencil-square-o"></i></Link>
            <Link to={`/edit/${id}`} class="btn btn-danger" role="button">Delete <i class="fa fa-pencil-square-o"></i></Link>
            </div>
            <div className="card-footer">
              <small className="text-muted">Recipe Category - {category}</small>
            </div>
          </div>
      </div>
		)
};

export default connect()(RecipeEdit);
