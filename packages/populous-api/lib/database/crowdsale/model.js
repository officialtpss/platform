import {Mongo} from 'meteor/mongo';
import {Class} from 'meteor/jagi:astronomy';
import Bid from "../bid/model";
import {
  crowdsaleStatuses,
} from 'meteor/populous:constants';
import moment from 'moment';

const crowdsalesCollection = new Mongo.Collection('crowdsales');

const Crowdsale = Class.create({
  name: 'Crowdsale',
  collection: crowdsalesCollection,
  fields:{
    borrowerId: {
      type: String,
    },
    invoiceId: {
      type: String,
    },
    invoiceNumber: {
      type: String,
    },
    status: {
      type: String,
      default: crowdsaleStatuses.open,
      validators: [
        {
          type: 'choice',
          param: Object.values(crowdsaleStatuses),
        },
      ],
    },

    address: {
      optional: true,
      type: String,
    },
    closeAt: {
       type: Date,
       default: () => {
         return moment().add(24, 'hours').format();
       }
    },
    closeReason:{
      optional: true,
      type: String,
      default: null
    },
  },

  behaviors: ['timestamp'],

  helpers:{
    isOpenPending(){
      //return this.status === crowdsaleStatuses.pending && !this.address;
      return false;
    },
    isClosePending(){
      //return this.status === crowdsaleStatuses.pending && this.address;
      return false;
    }
  }
});

export default Crowdsale;
