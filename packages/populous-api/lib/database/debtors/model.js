import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import {
  debtorStatuses, requestTypes
} from 'meteor/populous:constants';
import Request from "../requests/model";
import Invoice from "../invoices/model";

const debtorsCollection = new Mongo.Collection('debtorList');

const Debtor = Class.create({
  name: 'Debtor',
  collection: debtorsCollection,
  fields: {
    userId: {
      type: String,
      optional: true,
      immutable: true
    },
    name: {
      type: String,
    },
    country: {
      type: String
    },
    companyNumber: {
      type: String
    },
    zscore: {
      type: Object,
      optional: true,
      default: {}
    },
    latestZScore: {
      type: Number,
      optional: true,
      default: 1,
    },
    status: {
      type: String,
      default: debtorStatuses.pending,
      validators: [
        {
          type: 'choice',
          param: Object.values(debtorStatuses),
        },
      ],
    },
  },
  behaviors: ['timestamp'],

  helpers: {
    fullName() {
      return this.name;
    },
    hasConnectedInvoices(){
      return !!Invoice.findOne({
        $or:[
          {sellerId: this._id, },
          {debtorId: this._id, },
        ],
      })
    },
  },
});

export default Debtor;
