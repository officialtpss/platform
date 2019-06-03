import { Meteor } from 'meteor/meteor';
import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

const GuestRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      (Meteor.user() || Meteor.loggingIn() )
        ? <Redirect to={{
          pathname: '/dashboard',
          state: { from: props.location }
        }}/>
        : <Component {...props} />
    )}
  />
);

export default GuestRoute;
