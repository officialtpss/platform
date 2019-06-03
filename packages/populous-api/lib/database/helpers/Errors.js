import {Meteor} from 'meteor/meteor';


export const ForbiddenError = new Meteor.Error(403, 'Access forbidden');
