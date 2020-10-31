import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Footer } from './components';
import { Home, RecipeBook, CreateRecipe, Search } from './pages';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path ='/' component={Home} />
          <Route exact path ='/recipe-book' component={RecipeBook} />
          <Route exact path ='/create-recipe' component={CreateRecipe} />
          <Route exact path ='/search' component={Search} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
