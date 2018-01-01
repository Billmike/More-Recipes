import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './Hompage';
import Dashboard from './Dashboard';
import RecipeDetails from './RecipeDetails';
import Favorite from './Favorite';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';
import ProfilePage from './ProfilePage';
import RegistrationPage from './RegistrationPage';
import NotFoundPage from './NotFoundPage';

const App = () => (
  <div>
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/favorite" component={Favorite} />
          <Route path="/add" component={AddRecipe} />
          <Route path="/edit/:id" component={EditRecipe} />
          <Route path="/recipe/:id" component={RecipeDetails} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/register" component={RegistrationPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>
);

export default App;
