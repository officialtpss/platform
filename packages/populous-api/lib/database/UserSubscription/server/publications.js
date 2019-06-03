import {Meteor} from 'meteor/meteor';

import UserSubscription from '../model';


Meteor.publish('UserSubscription.forUser', (userId, type) => {
  const query = {userId};

  if(type){
    query.type = type;

    if(Array.isArray(type)){
      query.type = {$in: type};
    }
  }

  return UserSubscription.find(query);
});

