import ExternalAddress from '../model';
import { Meteor } from 'meteor/meteor';

Meteor.publish('externalAddress.user', (userId) => {
  return ExternalAddress.find({userId});
});

Meteor.publish('externalAddress.all', () => {
  return ExternalAddress.find({});
});