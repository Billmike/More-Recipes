import React from 'react';

const RecipeDetail = props => (
  <div>
    This is the details of Recipe with id { props.match.params.id }
  </div>
);

export default RecipeDetail;
