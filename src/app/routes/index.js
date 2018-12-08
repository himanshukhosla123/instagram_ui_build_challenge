import React from 'react';
import { BrowserRouter as Router, Switch, Redirect,Route } from 'react-router-dom';
import ProfileView  from './../scenes/ProfileView/index.js';
import ErrorPage from './../components/ErrorPage';


const Auth = () => (
<Router>
  <Switch>
    <Route exact path={`/`} component={ProfileView} />
    {/* <Route exact path={`${path}/forgot-password`} component={ForgotPassword} /> */}
    <Route component={ErrorPage} />
  </Switch>
</Router>
);

export default Auth;
