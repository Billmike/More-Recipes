import React, { Component } from 'react';
import axios from 'axios';
import DropZone from 'react-dropzone';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Loader from './Loader';
import validateRecipe from '../../../server/validators/validateRecipe';

class RecipesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.recipe ? this.props.recipe.name : '',
      description: this.props.recipe ? this.props.recipe.description : '',
      imageUrl: this.props.recipe
        ? this.props.recipe.imageUrl
        : 'https://res.cloudinary.com/andela-nigeria/image/upload/v1519633786/salad.jpg',
      category: this.props.recipe ? this.props.recipe.category : 'Lunch',
      ingredients: this.props.recipe ? this.props.recipe.ingredients : '',
      instructions: this.props.recipe ? this.props.recipe.instructions : '',
      errors: {},
      loaded: true
    };
    this.onFormValueChange = this.onFormValueChange.bind(this);
    this.uploadToCloudinary = this.uploadToCloudinary.bind(this);
  }

  uploadToCloudinary() {
    const formData = new FormData();
    formData.append('file', this.state.imageUrl);
    formData.append('upload_preset', process.env.UPLOAD_PRESET);
    formData.append('api_key', process.env.UPLOAD_API_KEY);

    return axios.post(process.env.UPLOAD_URL, formData);
  }

  onFormValueChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleDrop = (file) => {
    this.setState({ imageUrl: file[0] });
  };

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
    if (!this.state.loaded) {
      return <Loader />;
    }
    const { errors } = this.state;
    return (
      <div>
        <main className="container">
          <form
            id="recipe-form-ID"
            className="formsubmit"
            onSubmit={this.onSubmit}
          >
            <div className="form-group">
              <label className="recipe-form-values" htmlFor="recipename">
                Recipe Name
              </label>
              <input
                className={classNames('form-control', {
                  'has-errors': errors.name
                })}
                id="recipename"
                aria-describedby="recipeNameHelp"
                name="name"
                value={this.state.name}
                onChange={this.onFormValueChange}
              />
              {errors.name && (
                <span className="help-block has-errors">{errors.name}</span>
              )}
              <small id="recipeNameHelp" className="form-text">
                Enter a name for your recipe
              </small>
            </div>
            <div className="form-row">
              <div className="form-group col-8">
                <label
                  className="recipe-form-values"
                  htmlFor="inputDescription"
                >
                  Description
                </label>
                <textarea
                  className={classNames('form-control', {
                    'has-errors': errors.description
                  })}
                  id="descriptionTextArea"
                  rows="3"
                  name="description"
                  value={this.state.description}
                  onChange={this.onFormValueChange}
                />
                {errors.description && (
                  <span className="help-block has-errors">
                    {errors.description}
                  </span>
                )}
                <small id="descriptionHelp" className="form-text">
                  Enter a short description for your recipe.
                </small>
              </div>
              <div className="form-group col-4 upload-btn-wrapper">
                <DropZone
                  id="dropZoneID"
                  ref={(node) => {
                    dropzoneRef = node;
                  }}
                  onDrop={this.handleDrop}
                  accept="image/*"
                  multiple={false}
                  className="dropzone"
                  disablePreview={false}
                >
                  {this.state.imageUrl.preview && (
                    <div>
                      <img
                        src={this.state.imageUrl.preview}
                        className="img-fluid fluid-image d-block"
                      />
                      <p className="dropzone-tag"> Click to upload an Image </p>
                    </div>
                  )}
                </DropZone>
                <button
                  id="dropZoneButton"
                  type="button"
                  onClick={() => {
                    dropzoneRef.open();
                  }}
                  className="drop-button"
                >
                  Click to upload image
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                className="form-control custom-select"
                name="category"
                value={this.state.category}
                onChange={this.onFormValueChange}
                id="category"
              >
                <option value="lunch">Lunch</option>
                <option value="breakfast">Breakfast</option>
                <option value="dessert">Dessert</option>
                <option value="dinner">Dinner</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="recipe-form-values" htmlFor="recipename">
                  Ingredients
                </label>
                <textarea
                  className={classNames('form-control large-text', {
                    'has-errors': errors.ingredients
                  })}
                  id="recipeingredients"
                  name="ingredients"
                  aria-describedby="recipeNameHelp"
                  value={this.state.ingredients}
                  onChange={this.onFormValueChange}
                />
                {errors.ingredients && (
                  <span className="help-block has-errors">
                    {errors.ingredients}
                  </span>
                )}
                <small id="recipeNameHelp" className="form-text">
                  Enter your list of recipe ingredients.
                </small>
              </div>
              <div className="form-group col-md-6">
                <label
                  className="recipe-form-values"
                  htmlFor="inputDescription"
                >
                  Instructions
                </label>
                <textarea
                  className={classNames('form-control large-text', {
                    'has-errors': errors.instructions
                  })}
                  id="recipeDesc"
                  rows="3"
                  name="instructions"
                  value={this.state.instructions}
                  onChange={this.onFormValueChange}
                />
                {errors.instructions && (
                  <span className="help-block has-errors">
                    {errors.instructions}
                  </span>
                )}
                <small id="descriptionHelp" className="form-text">
                  Enter your step-by-step Instructions.
                </small>
              </div>
            </div>
            <div className="form-group">
              <button
                id="recipe-submit-button"
                className="btn btn-primary my-btn button-font btn-lg btn-block"
              >
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
