import {Meteor} from 'meteor/meteor';

import {ForbiddenError} from "./Errors";


export default function checkAuth() {
  if(!Meteor.userId()){
    throw ForbiddenError;
  }

  return Meteor.userId();
}
