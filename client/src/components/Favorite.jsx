import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import pizza from '../assets/img/pizzza.jpg';

const Favorite = ({ id }) => {
  return (
    <div>
      <main className="container">
        <h1>My Favorites</h1>
        <div className="card-group">
          <div className="card">
            <Link
              to={`/recipe/${id}`}
            ><img className="card-img-top" src={pizza} alt="Pizza" />
            </Link>
            <div className="card-body">
              <Link
                to={`recipe/${id}`}
              >
                <h4 className="card-title">Pizza Pepperoni with mushroom toppings.</h4>
              </Link>
              <p
                className="card-text"
              >This is a wider card with supporting text below as a natural lead-in.
              This card has even longer content than the first to show that equal height action.
              </p>
              <Link
                to={`recipe/${id}`}
                className="btn border border-secondary rounded"
                role="button"
              >View <i className="fa fa-eye" aria-hidden="true" />
              </Link> 
              <button
                type="button"
                className="btn btn-outline-danger"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Remove <i className="fa fa-trash-o" aria-hidden="true" />
              </button>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <Link
              to={`recipe/${id}`}
            ><img className="card-img-top" src={pizza} alt="Pizza" />
            </Link>
            <div className="card-body">
              <Link
                to={`recipe/${id}`}
              ><h4 className="card-title">Pizza Pepperoni with mushroom toppings.</h4>
              </Link>
              <p
                className="card-text"
              >This is a wider card with supporting text below as a natural lead-in.
              This card has even longer content than the first to show that equal height action.
              </p>
              <Link
                to={`recipe/${id}`}
                className="btn border border-secondary rounded"
                role="button"
              >View <i className="fa fa-eye" aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="btn btn-outline-danger"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Remove <i className="fa fa-trash-o" aria-hidden="true" />
              </button>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <Link
              to={`recipe/${id}`}
            ><img className="card-img-top" src={pizza} alt="Pizza" />
            </Link>
            <div className="card-body">
              <Link
                to={`recipe/${id}`}
              ><h4 className="card-title">Pizza Pepperoni with mushroom toppings.</h4>
              </Link>
              <p
                className="card-text"
              > This is a wider card with supporting text below as a natural lead-in.
              This card has even longer content than the first to show that equal height action.
              </p>
              <Link
                to={`recipe/${id}`}
                className="btn border border-secondary rounded"
                role="button"
              >View <i className="fa fa-eye" aria-hidden="true" />
              </Link>
              <button
                type="button"
                className="btn btn-outline-danger"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Remove <i className="fa fa-trash-o" aria-hidden="true" />
              </button>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default connect()(Favorite);
