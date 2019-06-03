import { Meteor } from 'meteor/meteor';
import {userRoles, fixtures} from 'meteor/populous:constants';

import PlatformAction from '../model';
import User from '../../accounts/model';
import checkAuth from "../../helpers/checkAuth";
import {ForbiddenError} from "../../helpers/Errors";


Meteor.publish('platformActions.all', function(query = {}) {
  const user = User.findOne(checkAuth());

  if(!user || !user.isAdmin()){
    throw ForbiddenError;
  }

  return PlatformAction.find(query);
});
