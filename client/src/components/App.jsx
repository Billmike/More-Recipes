import React from 'react';
import { BrowserRouter, browserHistory, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './Hompage';
import Dashboard from './Dashboard';
import RecipeDetails from './RecipeDetails';
import Favorite from './Favorites';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import RequireAuth from '../utils/RequireAuth';
import NotFoundPage from './NotFoundPage';

const App = () => (
  <div>
    <BrowserRouter history={browserHistory}>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/dashboard" component={RequireAuth(Dashboard)} />
          <Route path="/favorites" component={RequireAuth(Favorite)} />
          <Route path="/add" component={RequireAuth(AddRecipe)} />
          <Route path="/edit/:id" component={RequireAuth(EditRecipe)} />
          <Route path="/recipe/:id" component={RecipeDetails} />
          <Route path="/profile" component={RequireAuth(ProfilePage)} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegistrationPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>
);

export default App;
