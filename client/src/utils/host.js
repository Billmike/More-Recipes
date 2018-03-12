const host = window.location.hostname === 'more-recipes-app1' ?
  'https://more-recipes-app1.herokuapp.com' : 'http://localhost:8000/api/v1';

export default host;
