import React from 'react';
import { connect } from 'react-redux';
import RecipeEdit from './RecipeEdit';
import '../assets/css/style.css';

const Dashboard = (props) => {
    return(
        <div className="container-fluid">
          {props.recipes.map((recipe) => {
          console.log(recipe)
          return (
            <div className="container">
              <h2> Welcom to your Dashboard</h2>
              <h4 style={{ textAlign: 'center' }}> My Recipes </h4>
              <RecipeEdit key={recipe.id} {...recipe} />
            </div>
            )
        })}
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
  }
}


export default connect(mapStateToProps)(Dashboard);
