import React from 'react';
import '../assets/fonts/css/font-awesome.min.css';
import '../assets/css/style.css';
import RecipesList from './RecipesList';
import { connect } from 'react-redux';
import pancakes from '../assets/img/pancakes.jpeg';
import cookies from '../assets/img/cookies.jpeg';
import dessert from '../assets/img/dessert.jpeg';

const Homepage = (props) => (
  <div>
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active" />
          <li data-target="#carouselExampleIndicators" data-slide-to="1" />
          <li data-target="#carouselExampleIndicators" data-slide-to="2" />
        </ol>
            <div className="carousel-inner">
          <div className="carousel-item active">
              <img className="d-block w-100 sizing" src={pancakes} alt="First slide" />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="carousel-h3">Handcrafted recipes made by local chefs</h3>
                <p className="carousel-p">... the little things matter</p>
              </div>
            </div>
          <div className="carousel-item">
              <img className="d-block w-100 sizing" src={cookies} alt="Second slide" />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="carousel-h3-light">Tasty recipes to spice up your dinner table.</h3>
                <p className="carousel-p-light">... you really can't resist these delights.</p>
              </div>
            </div>
          <div className="carousel-item">
              <img className="d-block w-100 sizing" src={dessert} alt="Third slide" />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="carousel-h3">Make every meal memorable.</h3>
                <p className="carousel-p">... no more boring nights at home.</p>
              </div>
            </div>
        </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
          </div>
        {props.recipes.map((recipe = []) => {
          console.log(recipe)
          return (
            <div className="container">
              <h2> Top Recipes</h2>
              <RecipesList key={recipe.id} {...recipe} />
            </div>
            )
        })}
  </div>
);

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
  }
}

export default connect(mapStateToProps)(Homepage);
