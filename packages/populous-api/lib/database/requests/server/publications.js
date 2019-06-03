import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import Request from '../model';
import User from '../../accounts/model';

Meteor.publish('requests.all', function() {
  return Request.find({});
});


publishComposite('requests.adminId', function(adminId) {
  return {
    find() {
      return Request.find({
        adminId,
        isComplete: false
      });
    },
    children: [
      {
        find(request) {
          return User.find({ _id: request.userId });
        }
      }
    ]
  }
});

publishComposite('requests.type', function(query, params) {
  return {
    find() {
      return Request.find(query, params)
    },
    children: [
      {
        find(request) {
          return User.find({ _id: request.userId });
        }
      }
    ],
  };
});

Meteor.publish('requests.types', function(query, params) {
  return Request.find(query, params);
});

Meteor.publish('requests.userId', function(userId) {
  return Request.find({userId});
});
