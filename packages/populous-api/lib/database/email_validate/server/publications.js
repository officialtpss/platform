import EmailValidate from '../model';
import { Meteor } from 'meteor/meteor';


Meteor.publish('emailValidate.all', () => {
  return EmailValidate.find({});
});
