import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { startRemoveRecipe } from '../actions/recipes';
import pizza from '../assets/img/pizzza.jpg';

class RecipeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRecipe: undefined
    };
    this.selectRecipe = this.selectRecipe.bind(this);
    this.handleClearSelectedRecipe = this.handleClearSelectedRecipe.bind(this);
    this.onRemoveRecipe = this.onRemoveRecipe.bind(this);
  }

  handleClearSelectedRecipe() {
    this.setState(() => ({
      selectedRecipe: undefined
    }));
  }

  selectRecipe() {
    this.setState(() => ({
      selectedRecipe: this.props.id
    }));
  }

  onRemoveRecipe() {
    this.props.startRemoveRecipe(this.props.id);
  }

  render() {
    return (
      <div className="col-md-4">
        <div className="card">
          <Link to={`/recipe/${this.props.id}`}>
            <img className="card-img-top" alt="Pizza" src={pizza} />
          </Link>
          <div className="card-body">
            <Link to={`/recipe/${this.props.id}`}>
              <h4 className="card-title">{this.props.name}</h4>
            </Link>
            <p className="card-text">{this.props.description}</p>
            <div className="group-btn">
              <div
                className="container action-btn"
                style={{ textAlign: 'justify' }}
              >
                <Link
                  to={`/edit/${this.props.id}`}
                  className="btn user-btn"
                  role="button"
                >
                  {' '}
                  <i className="far fa-edit brown" />{' '}
                </Link>
                <button
                  onClick={this.selectRecipe}
                  className="btn user-btn"
                  role="button"
                >
                  {' '}
                  <i className="fas fa-trash-alt crimson" />{' '}
                </button>
                <button
                  disabled={true}
                  className="btn user-btn user-btn-special"
                  role="button"
                >
                  {this.props.recipe[0].upVote}{' '}
                  <i className="fa fa-thumbs-up fa brown" />{' '}
                </button>
                <button
                  disabled={true}
                  className="btn user-btn user-btn-special"
                  role="button"
                >
                  {this.props.recipe[0].downVote}{' '}
                  <i className="fa fa-thumbs-down fa brown" />
                </button>
                <button
                  disabled={true}
                  className="btn user-btn user-btn-special"
                  role="button"
                >
                  {this.props.recipe[0].favorites}{' '}
                  <i className="fa fa-heart crimson" />
                </button>
              </div>
            </div>
          </div>
          <div className="card-footer pad-footer">
            <small className="text-muted small-text">
              Recipe Category - {this.props.category}
            </small>
          </div>
        </div>
        <Modal
          selectedRecipe={this.state.selectedRecipe}
          handleClearSelectedRecipe={this.handleClearSelectedRecipe}
          onRemoveRecipe={this.onRemoveRecipe}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('state here', state);
  return {
    recipe: state.recipes.userRecipe
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    startRemoveRecipe: recipeData => dispatch(startRemoveRecipe(recipeData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEdit);
