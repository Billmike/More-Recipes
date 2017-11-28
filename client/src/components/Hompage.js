import React, { Component } from 'react';
import '../assets/fonts/css/font-awesome.min.css';
import pancakes from '../assets/img/pancakes.jpeg';
import cookies from '../assets/img/cookies.jpeg';
import dessert from '../assets/img/dessert.jpeg';
import pizza from '../assets/img/pizzza.jpg';

const Homepage = () => (
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

    <div className="card-group">
        <div className="card index-card">
            <a href="./template/recipe_detail.html"><img className="card-img-top" src={ pizza } alt="Card image cap" /></a>
            <div className="card-body">
              <a href="./template/recipe_detail.html"><h4 className="card-title">Pizza Pepperoni with mushroom toppings.</h4></a>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
              <a href="./template/recipe_detail.html" className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></a>
              <a href="#" className="btn border border-secondary rounded" data-toggle="modal" data-target="#exampleModal">  89 <i className="fa fa-heart" aria-hidden="true" /></a>
              <a href="./template/recipe_detail.html#comment" className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></a>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        <div className="card index-card">
            <a href="./template/recipe_detail.html"><img className="card-img-top" src={ pizza } alt="Card image cap" /></a>
            <div className="card-body">
              <a href="./template/recipe_detail.html"><h4 className="card-title">Pizza Pepperoni with mushroom toppings.</h4></a>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
              <a href="./template/recipe_detail.html" className="btn border border-secondary rounded">180 <i className="fa fa-eye" aria-hidden="true" /></a>
              <a href="#" className="border border-secondary rounded btn" data-toggle="modal" data-target="#exampleModal">  150 <i className="fa fa-heart" aria-hidden="true" /></a>
              <a href="./template/recipe_detail.html#comment" className="btn border border-secondary rounded"> 70 <i className="fa fa-comments" aria-hidden="true" /></a>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        <div className="card index-card">
            <a href="./template/recipe_detail.html"><img className="card-img-top" src={ pizza } alt="Card image cap" /></a>
            <div className="card-body">
              <a href="./template/recipe_detail.html"><h4 className="card-title">Pizza Pepperoni with mushroom toppings.</h4></a>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. </p>
              <a href="./template/recipe_detail.html" className="border btn border-secondary rounded">67 <i className="fa fa-eye" aria-hidden="true" /></a>
              <a href="#" className="border btn border-secondary rounded" data-toggle="modal" data-target="#exampleModal">  49 <i className="fa fa-heart" aria-hidden="true" /></a>
              <a href="./template/recipe_detail.html#comment" className="btn border border-secondary rounded"> 90 <i className="fa fa-comments" aria-hidden="true" /></a>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
      </div>
  </div>
);

export default Homepage;
