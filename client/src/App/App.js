import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Footer } from './components';
import { Home, RecipeBook, CreateRecipe, Search, RecipeListing } from './pages';

import Cookies from 'js-cookie'

import './App.css';

function App() {
    const hasSessionId = Cookies.get('sessionId')
    const username = hasSessionId ? Cookies.get('sessionId').split('|')[0] : ''

    return (
        <div className="App">
            <Router>
                <Header 
                    hasSessionId={hasSessionId}
                    username={username}
                />
                <Switch>
                <Route exact path ='/' component={Home} />
                <Route exact path ='/recipe-book' component={RecipeBook} />
                <Route exact path ='/create-recipe' component={CreateRecipe} />
                <Route exact path ='/search' component={Search} />
                <Route exact path ='/recipe/:recipeId' component={RecipeListing} />
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
