import React from 'react';
import { Link } from 'react-router-dom';
import Emoji from 'react-emoji-render';
import Footer from './Footer';

const NotFoundPage = () => (
  <div>
    <div className="section-bck">
      <p className="p-section">
        You've gone too far in search of a dessert, init? <Emoji text=":'(" />{' '}
        <Link to="/"> Go back</Link>
      </p>
    </div>
    <Footer />
  </div>
);

export default NotFoundPage;
