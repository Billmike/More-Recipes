import React from 'react';
import { Link } from 'react-router-dom';
import Emoji from 'react-emoji-render';

const NotFoundPage = () => (
  <div className="section-bck">
    <p className="p-section"> You've gone to far in search of a dessert, init? <Emoji text=":'(" /> <Link to="/"> Go back</Link></p>
  </div>
);

export default NotFoundPage;
