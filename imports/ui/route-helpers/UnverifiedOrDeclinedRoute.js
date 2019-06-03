import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { User } from 'meteor/populous:api';
import { statuses } from 'meteor/populous:constants';

const UnverifiedOrDeclinedRoute = ({ component: Component, ...rest }) => {
  const user = User.findOne(Meteor.userId());
  const canView = user.KYCStatus === statuses.unverified ||
    user.KYCStatus === statuses.declined;

  return (
    <Route
      {...rest}
      render={props => (
        canView ?
          <Component {...props} /> :
          <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }}/>
      )}
    />
  );
};

export default UnverifiedOrDeclinedRoute;
