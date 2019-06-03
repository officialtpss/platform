import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { User } from 'meteor/populous:api';

const ProviderOnlyRoute = ({ component: Component, ...rest }) => {
  const user = User.findOne(Meteor.userId());

  return (
    <Route
      {...rest}
      render={props => (
        user.isInvestor() && user.isProvider() ?
          <Component {...props} /> :
          <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }}/>
      )}
    />
  );
};

export default ProviderOnlyRoute;
