import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';


const SICCollection = new Mongo.Collection('SIC');

const SIC = Class.create({
  name: 'SIC',
  collection: SICCollection,
  fields: {
    country: {
      type: String,
    },

    code: {
      type: String,
    },

    description: {
      type: String,
    },

    sectionName: {
      type: String,
    },

    sectionDescription: {
      type: String,
    },
  },
  behaviors: ['timestamp'],

});

export default SIC;
