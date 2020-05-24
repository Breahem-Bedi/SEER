import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../../Auth/Login";
import Register from "../../Auth/Register";
import Dashboard from "../../Dashboard";
import Landing from "../../Landing";
import Moderation from "../../Moderation";
import Search from "../../Search";
import Suggestion from "../../Suggestion";
import { Role } from "../Authentication";
import ProtectedRoute from "../Authentication/ProtectedRoute";
import ErrorRoute from "./ErrorRoute";

const Router = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/suggest" component={Suggestion} />
    <Route exact path="/moderate" component={Moderation} />
    <ProtectedRoute
      exact
      roles={[Role.ADMIN]}
      path="/dashboard"
      component={Dashboard}
    />
    <Route exact path="/browse" component={Search} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route component={ErrorRoute} />
  </Switch>
);

export default Router;
