import React from 'react';

const EditRecipe = () => {
	return (
		<div>
			<main className="container">
                <h1>Modify Recipe</h1>
                <form>
                    <div className="form-group">
                      <label htmlFor="recipename">Recipe Title</label>
                      <input type="text" className="form-control" id="recipename" aria-describedby="recipeNameHelp" />
                      <small id="recipeNameHelp" className="form-text text-muted">Enter a short, catchy title for your Recipe.</small>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-8">
                          <label htmlFor="inputDescription">Description</label>
                          <textarea className="form-control" id="descriptionTextArea" rows="3"></textarea>
                          <small id="descriptionHelp" className="form-text text-muted">Try to keep your description short and interesting.</small>
                        </div>
                        <div className="form-group col-4 upload-btn-wrapper">
                            <button className="btns">Upload an Image</button>
                            <input type="file" name="myfile" />
                        </div>
                      </div>
                    <div className="form-group">
                        <select className="form-control">
                            <option>Category</option>
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                            <option>Dessert</option>
                        </select>
                        <small id="recipeNameHelp" className="form-text text-muted">Pick a Category your recipe fits into.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipename">Ingredients</label>
                        <input type="text" className="form-control" id="recipename" aria-describedby="recipeNameHelp" />
                        <small id="recipeNameHelp" className="form-text text-muted">Enter your recipe ingredients, separated by Commas.</small>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="inputDescription">Instructions</label>
                            <textarea className="form-control" id="descriptionTextArea" rows="3"></textarea>
                            <small id="descriptionHelp" className="form-text text-muted">Enter your step-by-step Instructions.</small>
                        </div>
                        <div className="form-group col-md-auto">
                            <a href="dashboard.html" className="btn btn-outline-success btn-edit">Confirm</a>
                        </div>
                        <div className="form-group col-lg-2">
                                <a href="dashboard.html" className="btn btn-outline-secondary btn-edit">Cancel</a>
                            </div>
                    </div>
                  </form>
            </main>
		</div>
		)
}

export default EditRecipe;
