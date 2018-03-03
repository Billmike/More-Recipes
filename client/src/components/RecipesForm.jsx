import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import classNames from 'classnames';
import LoaderComp from './LoaderComp';
import DropZone from 'react-dropzone';
import validateRecipe from '../../../server/validators/validateRecipe';

class RecipesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.recipe ? this.props.recipe.name : '',
      description: this.props.recipe ? this.props.recipe.description : '',
      imageUrl: this.props.recipe ? this.props.recipe.imageUrl : "https://res.cloudinary.com/andela-nigeria/image/upload/v1519633786/salad.jpg",
      category: this.props.recipe ? this.props.recipe.category : 'Lunch',
      ingredients: this.props.recipe ? this.props.recipe.ingredients : '',
      instructions: this.props.recipe ? this.props.recipe.instructions : '',
      errors: {},
      loaded: true,
    };
    this.onCategorySet = this.onCategorySet.bind(this);
    this.uploadToCloudinary = this.uploadToCloudinary.bind(this);
  }

  onDescriptionChange = (event) => {
    const description = event.target.value;
    this.setState(() => ({ description }));
  };

  onNameChange = (event) => {
    const name = event.target.value;
    this.setState(() => ({ name }));
  };

  uploadToCloudinary() {
    const formData = new FormData();
    formData.append('file', this.state.imageUrl);
    formData.append('upload_preset', 'gw9enn9u');
    formData.append('api_key', '757874753524889');

    return axios.post(
      'https://api.cloudinary.com/v1_1/andela-nigeria/image/upload',
      formData
    );
  }

  onCategorySet(event) {
    this.setState({ category: event.target.value })
  }

  onIngredientsSet = (event) => {
    const ingredients = event.target.value;
    this.setState(() => ({ ingredients }));
  };

  onInstructionsSet = (event) => {
    const instructions = event.target.value;
    this.setState(() => ({ instructions }));
  };

  handleDrop = (file) => {
    this.setState({ imageUrl: file[0] });
  }

  onSubmit = (event) => {
    event.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {} });
      this.setState({ loaded: false });
      this.uploadToCloudinary().then((response) => {
        const secureURL = response.data.secure_url;
        const recipeImage = this.state;
        recipeImage.imageUrl = secureURL;
  
        this.props.onSubmit({
          name: this.state.name,
          description: this.state.description,
          imageUrl: this.state.imageUrl,
          category: this.state.category,
          ingredients: this.state.ingredients,
          instructions: this.state.instructions
        });
      });
    }
  };

  isValid() {
    const { errors, isValid } = validateRecipe(this.state);
    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  render() {
    let dropzoneRef;
    const { errors } = this.state;
    return (
      <div>
        <main className="container">
          <form className="" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="recipe-name" htmlFor="recipename">
                Recipe Name
              </label>
              <input
                className={classNames('form-control', { 'has-errors': errors.name })}
                id="recipename"
                aria-describedby="recipeNameHelp"
                value={this.state.name}
                onChange={this.onNameChange}
              />
              {errors.name && (<span className="help-block has-errors">{errors.name}</span>)}
              <small id="recipeNameHelp" className="form-text">
                Enter a name for your recipe
              </small>
            </div>
            <div className="form-row">
              <div className="form-group col-8">
                <label className="recipe-desc" htmlFor="inputDescription">
                  Description
                </label>
                <textarea
                  className={classNames('form-control', { 'has-errors': errors.description })}
                  id="descriptionTextArea"
                  rows="3"
                  value={this.state.description}
                  onChange={this.onDescriptionChange}
                />
                {errors.description && (<span className="help-block has-errors">{errors.description}</span>)}
                <small id="descriptionHelp" className="form-text">
                  Enter a short description for your recipe.
                </small>
              </div>
              <div className="form-group col-4 upload-btn-wrapper">
                <DropZone
                  ref={(node) => { dropzoneRef = node; }}
                  onDrop={this.handleDrop}
                  accept="image/*"
                  multiple={false}
                  className="dropzone"
                  disablePreview={false}
                >
                {this.state.imageUrl.preview &&
                <div>
                  <img
                    src={this.state.imageUrl.preview}
                    className="img-fluid fluid-image d-block"
                  />
                  <p className="dropzone-tag"> Click to upload an Image </p>
                </div>
                }
                </DropZone>
                <button
                  type="button"
                  onClick={() => { dropzoneRef.open() }}
                  className="drop-button"
                >
                Click to upload image
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select className="form-control custom-select" value={this.state.category} onChange={this.onCategorySet} id="category">
                <option value="lunch">Lunch</option>
                <option value="breakfast">Breakfast</option>
                <option value="dessert">Dessert</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="recipe-ingredients" htmlFor="recipename">
                  Ingredients
                </label>
                <textarea
                  className={classNames('form-control large-text', { 'has-errors': errors.ingredients })}
                  id="recipename"
                  aria-describedby="recipeNameHelp"
                  value={this.state.ingredients}
                  onChange={this.onIngredientsSet}
                  
                />
                {errors.ingredients && (<span className="help-block has-errors">{errors.ingredients}</span>)}
                <small id="recipeNameHelp" className="form-text">
                  Enter your recipe ingredients, separated by Commas.
                </small>
              </div>
              <div className="form-group col-md-6">
                <label
                  className="recipe-instructions"
                  htmlFor="inputDescription"
                >
                  Instructions
                </label>
                <textarea
                  className={classNames('form-control large-text', { 'has-errors': errors.instructions })}
                  id="recipeDesc"
                  rows="3"
                  value={this.state.instructions}
                  onChange={this.onInstructionsSet}
                  
                />
                {errors.instructions && (<span className="help-block has-errors">{errors.instructions}</span>)}
                <small id="descriptionHelp" className="form-text">
                  Enter your step-by-step Instructions.
                </small>
              </div>
              <LoaderComp
                loaded={this.state.loaded}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary my-btn button-font btn-lg btn-block">
                Submit Recipe
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }
}

export default RecipesForm;
