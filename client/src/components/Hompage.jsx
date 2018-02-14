import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/css/style.css';
import RecipesList from './RecipesList';
import Footer from './Footer';
import { startGetAllRecipes } from '../actions/recipes';
import pancakes from '../assets/img/pancakes.jpeg';
import cookies from '../assets/img/cookies.jpeg';
import dessert from '../assets/img/dessert.jpeg';

class Homepage extends Component {
  componentDidMount() {
    this.props.startGetAllRecipes();
  }

  render() {
    let allRecipes;
    if (this.props.recipes) {
      allRecipes = this.props.recipes.map((recipe, i) => {
        return <RecipesList key={i} {...recipe} />;
      });
    }
    return (
      <div className="under-carousel-div">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              className="active"
            />
            <li data-target="#carouselExampleIndicators" data-slide-to="1" />
            <li data-target="#carouselExampleIndicators" data-slide-to="2" />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100 sizing"
                src={pancakes}
                alt="First slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="carousel-h3">
                  Handcrafted recipes made by local chefs
                </h3>
                <p className="carousel-p">... the little things matter</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100 sizing"
                src={cookies}
                alt="Second slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="carousel-h3-light">
                  Tasty recipes to spice up your dinner table.
                </h3>
                <p className="carousel-p-light">
                  ... you really cannot resist these delights.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100 sizing"
                src={dessert}
                alt="Third slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="carousel-h3">Make every meal memorable.</h3>
                <p className="carousel-p">... no more boring nights at home.</p>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
        <div className="container">
          <h2 className="homepage-h2"> Top Recipes</h2>
          <div class="input-group">
            <span class="input-group-btn">
              <button class="btn btn-secondary" type="button">
                Go!
              </button>
            </span>
            <input class="form-control" placeholder="Search for....." />
          </div>
          <div className="row">{allRecipes}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes.recipes
  };
};

export default connect(mapStateToProps, { startGetAllRecipes })(Homepage);
