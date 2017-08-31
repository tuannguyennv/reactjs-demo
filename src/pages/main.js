import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import asyncComponent from "../components/commons/asyncComponent";
import Home from "./home";
import List from "./users/list";
import AddNew from "./users/addNew";

class Main extends Component {
  render() {
    const AsyncDetailUser = asyncComponent(() => import("./users/detail"));

    return (
      <div style={{ marginTop: 80 }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users/add" component={AddNew} />
          <Route path="/users/:id" component={AsyncDetailUser} />
          <Route path="/users" component={List} />
        </Switch>
      </div>
    );
  }
}

export default Main;
