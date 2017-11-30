import React, { Component } from 'react';

class RecipesForm extends Component {
	constructor(props) {
		super(props);
    console.log(props)
		this.state = {
			name: props.recipe ? props.recipe.name : '',
			description: props.recipe ? props.recipe.description : '',
			img_url: 'no-img-here',
			category: props.recipe ? props.recipe.category : '',
			ingredients: props.recipe ? props.recipe.ingredients : [],
			instructions: props.recipe ? props.recipe.instructions : [],
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
                  <label htmlFor="recipename">Recipe Title</label>
                  <input
                  	type="text"
                  	className="form-control"
                  	id="recipename"
                  	aria-describedby="recipeNameHelp"
                  	value = {this.state.name}
                  	onChange = { this.onNameChange }
                  />
                  <small id="recipeNameHelp" className="form-text text-muted">Enter a short, catchy title for your Recipe.</small>
                </div>
                <div className="form-row">
                    <div className="form-group col-8">
                      <label htmlFor="inputDescription">Description</label>
                      <textarea
                      	className="form-control"
                      	id="descriptionTextArea"
                      	rows="3"
                      	value={ this.state.description }
                      	onChange={ this.onDescriptionChange }
                      >
                      </textarea>
                      <small id="descriptionHelp" className="form-text text-muted">Try to keep your description short and interesting.</small>
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
                  <label htmlFor="recipename">Category</label>
                  <input
                    placeholder="Breakfast, Dinner, Dessert, Lunch"
                    type="text"
                    className="form-control"
                    id="recipename"
                    aria-describedby="recipeNameHelp"
                    value = {this.state.category}
                    onChange = { this.onCategorySet }
                  />
                  <small id="recipeNameHelp" className="form-text text-muted">Enter a short, catchy title for your Recipe.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="recipename">Ingredients</label>
                    <input
                    	type="text"
                    	className="form-control"
                    	id="recipename"
                    	aria-describedby="recipeNameHelp"
                    	value={this.state.ingredients}
                    	onChange={this.onIngredientsSet}
                    />
                    <small id="recipeNameHelp" className="form-text text-muted">Enter your recipe ingredients, separated by Commas.</small>
                </div>
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="inputDescription">Instructions</label>
                        <textarea
                        	className="form-control"
                        	id="descriptionTextArea"
                        	rows="3"
                        	value={this.state.instructions}
                        	onChange={this.onInstructionsSet}
                        >
                        </textarea>
                        <small id="descriptionHelp" className="form-text text-muted">Enter your step-by-step Instructions.</small>
                    </div>
                    <div className="form-group col-4">
                        <button className="btn btn-outline-success btn-add">Submit Recipe</button>
                    </div>
                </div>
              </form>
            </main>
			</div>
			)
	}
}

export default RecipesForm;
