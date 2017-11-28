import React from 'react';
import { Link } from 'react-router-dom';
import pizza from '../assets/img/pizzza.jpg';
import '../assets/css/style.css';

const Dashboard = () => {
    return(
        <div className="container-fluid">
          <div className="row">
            <main className="container">
              <h1>My Recipes</h1>
        <div className="card-group">
          <div className="card">
            <a href="./recipe_detail.html"><img className="card-img-top" src={pizza} alt="Card image cap" /></a>
            <div className="card-body">
              <a href="./recipe_detail.html"><h4 className="card-title">Pizza Pepperoni with mushroom toppings.</h4></a>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <a href="edit.html" className="btn btn-outline-success" role="button">Edit <i className="fa fa-pencil-square-o"></i></a> 
              <button type="button" className="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal">
                  Delete <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <a href="./recipe_detail.html"><img className="card-img-top" src={pizza} alt="Card image cap" /></a>
            <div className="card-body">
              <a href="./recipe_detail.html"><h4 className="card-title">Pizza Pepperoni with mushroom toppings.</h4></a>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <a href="edit.html" className="btn btn-outline-success" role="button">Edit <i className="fa fa-pencil-square-o"></i></a> 
              <button type="button" className="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal">
                  Delete <i className="fa fa-trash-o" aria-hidden="true"></i>
                </button>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <a href="./recipe_detail.html"><img className="card-img-top" src={pizza} alt="Card image cap" /></a>
            <div className="card-body">
              <a href="./recipe_detail.html"><h4 className="card-title">Pizza Pepperoni with mushroom toppings.</h4></a>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <a href="edit.html" className="btn btn-outline-success" role="button">Edit <i className="fa fa-pencil-square-o"></i></a> 
              <button type="button" className="btn btn-outline-danger" data-toggle="modal" data-target="#exampleModal">
                Delete <i className="fa fa-trash-o"></i>
              </button>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
            </main>
          </div>
        </div>
    )
}

export default Dashboard;
