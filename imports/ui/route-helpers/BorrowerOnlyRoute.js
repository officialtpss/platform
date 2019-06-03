import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { User } from 'meteor/populous:api';

const BorrowerOnlyRoute = ({ component: Component, ...rest }) => {
  const user = User.findOne(Meteor.userId());

  // TODO: Should we redirect them to 404 or something?
  return (
    <Route
      {...rest}
      render={props => (
        user.isBorrower() ?
          <Component {...props} /> :
          <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }}/>
      )}
    />
  );
};

export default BorrowerOnlyRoute;
