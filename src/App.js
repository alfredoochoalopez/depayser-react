import axios from "axios";
import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.scss';
import Details from "./Details";
import Genders from "./Genders";
import Home from "./Home";
export const http = axios.create({
  baseURL: 'https://mfwkweb-api.clarovideo.net'
})

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/genero/:id" component={Genders} />
      <Route path="/detalles/:id" component={Details} />
      <Route component={Home} />

    </Switch>
  </div>
);
export default App;