import { Meteor } from 'meteor/meteor';
import { startSubscription } from 'meteor-redux-middlewares';
import { User } from 'meteor/populous:api';

import {
  ACCOUNTS_USER_SUBSCRIPTION_READY,
  ACCOUNTS_USER_SUBSCRIPTION_CHANGED,
  ACCOUNTS_USER_SUB
} from '../';

/**
 * This action creator is for meteor-redux-middlewares
 * and subscribes to the user data and keeps the redux
 * store synchronised with the DB
 */
const loadUser = _id => (
  startSubscription({
    key: ACCOUNTS_USER_SUB,
    get: () => User.find({ _id }).fetch(),
    subscribe: () => Meteor.subscribe(ACCOUNTS_USER_SUB, _id)
  })
);

export default loadUser;
