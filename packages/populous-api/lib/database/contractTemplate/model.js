import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

const contractTemplate = new Mongo.Collection('contractTemplate');

const ContractTemplate = Class.create({
  name: 'ContractTemplate',
  collection: contractTemplate,

  fields: {
    userId: {
      type: String,
      optional: true,
      immutable: true
    },
    template: {
      type: String
    }
  },

  behaviors: ['timestamp'],

  events: {
    beforeInsert(e) {
    }
  },

  meteorMethods: {
    create() {
      const meteor = DDP._CurrentInvocation.get();

      // Throw if no user is logged in, there is
      // something fishy going on
      if (!meteor.userId) {
        throw new Error('No user logged in');
      }

      // We want to add the userId on the server
      // so people cannot create files in another
      // persons name
      this.userId = meteor.userId;
      this.save();

      // Return the new file object
      return this;
    }
  }
});

export default ContractTemplate;
