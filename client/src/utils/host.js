const host = window.location.hostname === 'localhost' ?
  'http://localhost:8000/api/v1' : 'https://more-recipes-app1.herokuapp.com/api/v1';

export default host;
