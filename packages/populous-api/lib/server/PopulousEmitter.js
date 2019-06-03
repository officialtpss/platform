import {Meteor} from 'meteor/meteor';
import EventEmitter from 'events';
import {populousEvents} from 'meteor/populous:constants';


class PopulousEmitterClass extends EventEmitter {}

const PopulousEmitter = new PopulousEmitterClass();

Meteor.methods({
  'emit.event'(eventName, data){
    PopulousEmitter.emit(eventName, data);
  },
});

export default PopulousEmitter;
