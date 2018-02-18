import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import '../assets/css/style.css';
import RecipesList from './RecipesList';
import Footer from './Footer';
import Pagination from './Pagination';
import { startGetAllRecipes } from '../actions/recipes';
import strawberry from '../assets/img/strawberry.jpg';
import dark from '../assets/img/dark.jpg';
import noodles from '../assets/img/noodles.jpg';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }
  componentDidMount() {
    this.props.startGetAllRecipes(0);
  }

  handlePaginationChange(data) {
    const currentView = data.selected + 1;
    this.props.startGetAllRecipes(currentView);
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
                className="d-block w-100 sizing carousel-slide-image"
                src={strawberry}
                alt="First slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="carousel-h3">
                  Handcrafted recipes made by local chefs
                </h3>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100 sizing carousel-slide-image"
                src={dark}
                alt="Second slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="carousel-h3">
                  Tasty recipes to spice up your dinner table.
                </h3>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100 sizing carousel-slide-image"
                src={noodles}
                alt="Third slide"
              />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="carousel-h3">Make every meal memorable.</h3>
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
          <div className="input-group">
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button">
                Go!
              </button>
            </span>
            <input className="form-control" placeholder="Search for....." />
          </div>
          <div className="row">{allRecipes}</div>
          <Pagination
            handlePaginationChange={this.handlePaginationChange}
            pageCount={this.props.pages}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('state', state);
  return {
    recipes: state.recipes.recipes,
    pages: state.recipes.pages
  };
};

export default connect(mapStateToProps, { startGetAllRecipes })(Homepage);
