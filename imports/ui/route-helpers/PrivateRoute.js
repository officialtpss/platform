import { Meteor } from 'meteor/meteor';
import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      Meteor.user() || Meteor.loggingIn() ?
        <Component {...props} /> :
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
    )}
  />
);

export default PrivateRoute;
