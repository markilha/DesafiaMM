import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from "react-router";
import NavBar from './components/NavBar';

import Home from './pages/home/Home';
import People from './pages/home/People';

function App() {


  console.log(NavBar);
  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/people" component={People}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
