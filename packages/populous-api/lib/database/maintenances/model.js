import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

const maintenancesCollection = new Mongo.Collection('maintenances');

const Maintenance = Class.create({
  name: 'Maintenance',
  collection: maintenancesCollection,
  fields: {
    severity: {
      type: String,
      validators: [
        {
          type: 'choice',
          param: Object.values(['green', 'orange', 'red',]),
        },
      ],
    },
    startAt: {
      type: Date,
    },
    endAt: {
      type: Date,
    },
    description: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  behaviors: ['timestamp'],
});

export default Maintenance;
