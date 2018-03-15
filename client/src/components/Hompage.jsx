import React, { Component } from 'react';
import { connect } from 'react-redux';
import Emoji from 'react-emoji-render';
import ReactPaginate from 'react-paginate';
import '../assets/css/style.css';
import LoaderComp from './LoaderComp';
import Loader from './Loader';
import RecipesList from './RecipesList';
import Footer from './Footer';
import Pagination from './Pagination';
import {
  GetAllRecipesAction,
  GetPopularRecipes, SearchRecipesAction
} from '../actions/recipes';
import strawberry from '../assets/img/strawberry.jpg';
import dark from '../assets/img/dark.jpg';
import noodles from '../assets/img/noodles.jpg';


/**
 * Component that renders the Homepage
 *
 * @class Homepage
 *
 * @extends Component
 */

export class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      loaded: true,
      page: 1,
      search: false
    };
    this.onSearch = this.onSearch.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }
  componentDidMount() {
    this.props.GetAllRecipesAction(this.state.page);
    this.props.GetPopularRecipes();
  }

  onSearch(event) {
    this.setState({ [event.target.name]: event.target.value, search: true });
    this.props.SearchRecipesAction(event.target.value, this.state.page);
  }

  handlePaginationChange(data) {
    const currentView = data.selected;
    this.setState({ page: currentView });
    if (this.state.search) {
      this.props.SearchRecipesAction(this.state.searchQuery, currentView);
    } else {
      this.props.GetAllRecipesAction(currentView);
    }
  }

  render() {
    let allRecipes;
    let popularRecipesList;
    if (this.props.isLoading) {
      return (
        <Loader />
      );
    }
    if (this.props.recipes) {
      allRecipes = this.props.recipes.length > 0 ?
        this.props.recipes.map((recipe) => {
          return <RecipesList key={recipe.id} recipe={recipe} />;
        }) : (
          <div>
            <p className="search-text">
              No results found for your search <Emoji text=";(" />
            </p>
          </div>
        );
    }
    if (this.props.popularRecipes) {
      popularRecipesList = this.props.popularRecipes.map((recipe) => {
        return <RecipesList key={recipe.id} recipe={recipe} />;
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
          <h2 className="homepage-h2"> Popular Recipes of the week</h2>
          <div className="row">{popularRecipesList}</div>
          <hr className="frontpage-hr" />
          <div className="input-group search-button">
            <span className="input-group-btn">

            </span>
            <input
              type="search"
              name="searchQuery"
              id="searchParamId"
              value={this.state.searchQuery}
              className="form-control"
              placeholder="Search for....."
              onChange={this.onSearch}
            />
          </div>
          <h2 className="homepage-h2"> Recipe Catalogue</h2>
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

export const mapStateToProps = (state) => {
  console.log('current state', state);
  return {
    popularRecipes: state.recipes.popularRecipes,
    recipes: state.recipes.recipes,
    pages: state.recipes.pages,
    isLoading: state.recipes.isLoading
  };
};

export default connect(
  mapStateToProps,
  {
    GetAllRecipesAction, GetPopularRecipes, SearchRecipesAction
  }
)(Homepage);
