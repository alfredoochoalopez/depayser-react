import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.scss';
import Genders from "./Genders";
import Home from "./Home";

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/genero/:id" component={Genders} />
      {/* <Route path="/about" component={About} /> */}
    </Switch>
  </div>
);
export default App;