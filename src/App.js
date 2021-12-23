import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from "react-router";
import NavBar from './components/NavBar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // O estilo do Toastify

import Home from './pages/home/Home';
import People from './pages/home/People';

function App() {


  console.log(NavBar);
  return (


    <BrowserRouter>     
      <NavBar />
      <ToastContainer autoClose={3000} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/people" component={People} />
      </Switch>
    </BrowserRouter>



  );
}

export default App;
