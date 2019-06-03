import {Mongo} from 'meteor/mongo';
import {Class, Union} from 'meteor/jagi:astronomy';


const configsCollection = new Mongo.Collection('configs');

const Config = Class.create({
  name: 'Config',
  collection: configsCollection,
  fields:{
    key:{
      type: String,
    },
    value: {
      type: [Object, Boolean, String, Number, Date, ],
      validate: () => false,
    },
    public:{
      type: Boolean,
      default: true,
    },
  },
  behaviors: ['timestamp'],

});

export default Config;