import { Meteor } from 'meteor/meteor';
import constants from '../constants';


export function errorHandler(response) {

  if (response.status === constants.statusMap.fail) {
    throw new Meteor.Error(500, 'Internal server error', response);
  }

  return response;
}