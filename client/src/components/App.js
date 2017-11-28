import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './Hompage';
import Dashboard from './Dashboard';
import Favorite from './Favorite';
import AddRecipe from './AddRecipe';
import EditRecipe from './EditRecipe';
import ProfilePage from './ProfilePage';
import NotFoundPage from './NotFoundPage';

class App extends Component {
    render() {
        return(
            <div>
                <BrowserRouter>
                    <div>
                        <Navbar />
                        <Switch>
                        <Route exact path="/" component={Homepage} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/favorite" component={Favorite} />
                        <Route path="/add" component={AddRecipe} />
                        <Route path="/edit" component={EditRecipe} />
                        <Route path="/profile" component={ProfilePage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
