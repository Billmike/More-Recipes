import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/css/addRecipe.css';

class RecipesForm extends Component {
	constructor(props) {
		super(props);
    console.log('recipesformprops', props)
		this.state = {
			name: this.props.recipe ? this.props.recipe.name : '',
			description: this.props.recipe ? this.props.recipe.description : '',
			img_url: 'no-img-here',
			category: this.props.recipe ? this.props.recipe.category : '',
			ingredients: this.props.recipe ? this.props.recipe.ingredients : [],
			instructions: this.props.recipe ? this.props.recipe.instructions : [],
			error: ''
		}
	}

	onDescriptionChange = (e) => {
		const description = e.target.value;
		this.setState(() => ({ description }))
	}

	onNameChange = (e) => {
		const name = e.target.value;
		this.setState(() => ({ name }));
	}

	onImgSet = (e) => {
		const img_url = e.target.value;
		this.setState(() => ({ img_url }))
	}

	onCategorySet = (e) => {
		const category = e.target.value;
    console.log(category);
		this.setState(() => ({ category }));
	}

	onIngredientsSet = (e) => {
		const ingredients = e.target.value;
		this.setState(() => ({ ingredients }));
	}

	onInstructionsSet = (e) => {
		const instructions = e.target.value;
		this.setState(() => ({ instructions }));
	}

	onSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit({
			name: this.state.name,
			description: this.state.description,
			img_url: this.state.img_url,
			category:this.state.category,
			ingredients: this.state.ingredients,
			instructions: this.state.instructions,
		})
	}

	render () {
		return(
			<div>
				<main className="container">
				{this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
								<label className="recipe-name" htmlFor="recipename">Recipe Name</label>
                  <input
                  	className="form-control recipe-name"
                  	id="recipename"
                  	aria-describedby="recipeNameHelp"
                  	value = {this.state.name}
                  	onChange = { this.onNameChange }
                  />
                  <small id="recipeNameHelp" class="form-text text-muted">Enter a name for your recipe</small>
                </div>
                <div className="form-row">
                    <div className="form-group col-8">
                      <label className="recipe-desc" htmlFor="inputDescription">Description</label>
                      <input
                      	className="form-control"
                      	id="descriptionTextArea"
                      	rows="3"
                      	value={ this.state.description }
                      	onChange={ this.onDescriptionChange }
                      />
                      <small id="descriptionHelp" class="form-text text-muted">Enter a short description for your recipe.</small>
                    </div>
                    <div className="form-group col-4 upload-btn-wrapper">
                        <button className="btns">Upload an Image</button>
                        <input
                        	type="file"
                        	name="myfile"
                        />
                    </div>
                  </div>
                <div className="form-group">
                  <label className="recipe-cat" htmlFor="recipename">Category</label>
                  <input
                    className="form-control"
                    id="recipename"
                    aria-describedby="recipeNameHelp"
                    value = {this.state.category}
                    onChange = { this.onCategorySet }
                  />
                  <small id="categoryHelp" class="form-text text-muted">Category could be Breakfast, Lunch, Dessert or any other fun one of your choice.</small>
                </div>
								<div className="form-row">
									<div className="form-group col-md-6">
											<label className="recipe-ingredients" htmlFor="recipename">Ingredients</label>
											<textarea
												className="form-control large-text"
												id="recipename"
												aria-describedby="recipeNameHelp"
												value={this.state.ingredients}
												onChange={this.onIngredientsSet}
											/>
											<small id="recipeNameHelp" className="form-text text-muted">Enter your recipe ingredients, separated by Commas.</small>
									</div>
									<div className="form-group col-md-6">
                        <label className="recipe-instructions" htmlFor="inputDescription">Instructions</label>
                        <textarea
                        	className="form-control large-text"
                        	id="recipeDesc"
                        	rows="3"
                        	value={this.state.instructions}
                        	onChange={this.onInstructionsSet}
                        >
                        </textarea>
                        <small id="descriptionHelp" className="form-text text-muted">Enter your step-by-step Instructions.</small>
                    </div>
								</div>
                    <div className="form-group">
                        <button className="btn btn-primary button-font btn-lg btn-block">Submit Recipe</button>
                    </div>
              </form>
            </main>
			</div>
			)
	}
}

export default RecipesForm;
