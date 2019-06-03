import { Meteor } from 'meteor/meteor';
import Config from "../model";


Meteor.publish('config', function() {
  return Config.find({public: true});
});

Meteor.publish('config.all', function() {
  return Config.find({});
});
