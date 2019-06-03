import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Class } from 'meteor/jagi:astronomy';
import { getTierFee, adminFee } from 'meteor/populous:constants';
import roundNumber from "../helpers/roundNumber";

const bids = new Mongo.Collection('bids');

const BidNames = Class.create({
  name: 'BidNames',
  fields: {
    groupName: {
      type: String,
      optional: true,
    },
    isGroup: {
      type: Boolean,
      optional: true,
    },
  }
});

const BidBidders = Class.create({
  name: 'BidBidders',
  fields: {
    userId: {
      type: String,
    },

    isAnonymous: {
      type: Boolean,
      default: false,
    },

    amount: {
      type: Number,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },

});

const Bid = Class.create({
  name: 'Bid',
  collection: bids,

  fields: {
    crowdsaleId: {
      type: String,
    },
    invoiceId: {
      type: String,
    },
    userId: {
      type: String,
    },
    names: {
      type: BidNames,
    },
    amount: {
      type: Number,
    },
    sortAmount: {
      type: Number,
    },
    groupIndex: {
      type: Number,
      default: false,
    },
    bidders: {
      type: [BidBidders],
      optional: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    isPending: {
      type: Boolean,
      default: true,
    },
    inBlock: {
      type: String,
      optional: true,
    },
    isWinner: {
      type: Boolean,
      default: false,
    },
    isReturned: {
      type: Boolean,
      default: false,
    }
  },

  behaviors: ['timestamp'],
  helpers: {
    isGroup() {
      return this.names.isGroup;
    },
    formatDate(momentDate) {
      const isToday = momentDate.isSame(new Date(), 'day'),
        format = isToday ? '[Today] H:mm:ss a' : 'DD-MM-YYYY, H:mm:ss a';

      return momentDate.format(format);
    },
    isJoined() {
      const currentUserId = Meteor.userId();
      const isGroup = this.isGroup();
      return !!((
          isGroup && this.bidders.find(bidder => bidder.userId === currentUserId))
        || (!isGroup && this.userId === currentUserId)
      );
    },
    getRaisedBidAmount() {
      if (!this.isGroup()) {
        throw new Meteor.Error(400, 'Helper can be called only for group bids');
      }
      return this.bidders.reduce((prevSum, bidder) => {
        return roundNumber((prevSum || 0) + bidder.amount)
      }, 0);
    },
    getRemainingAmount() {
      if (!this.isGroup()) {
        throw new Meteor.Error(400, 'Helper can be called only for group bids');
      }

      return roundNumber(this.amount - this.getRaisedBidAmount());
    },

    getReturnParams(invoice, bidAmountStr, isIndividual = true, goalAmountStr = 0){
      const bidAmount = roundNumber(bidAmountStr);
      const goalAmount = roundNumber(goalAmountStr);

      const returnObj = {
        returnAmount: 0,
        returnPercentage: 0,
      };

      if(!bidAmount){
        return returnObj;
      }

      const isProvider = invoice.isProvider();
      const winnerReturnAmount = isProvider ? invoice.amount - invoice.providerFeeAmount :
        invoice.amount *(1 - getTierFee(invoice.zscore) - adminFee);

      if(isIndividual) {
        // Used for individual bid and summary group bid
        returnObj.returnAmount = roundNumber(winnerReturnAmount - bidAmount);
        returnObj.returnPercentage = roundNumber((returnObj.returnAmount / bidAmount) *100)
      }else{
        // Used for individual bid in group bid
        returnObj.returnAmount = roundNumber((bidAmount/goalAmount) * (winnerReturnAmount - goalAmount));
        returnObj.returnPercentage = roundNumber((returnObj.returnAmount / bidAmount) *100)
      }

      return returnObj
    },

    calculateSortAmount() {
      if (this.isGroup()) {
        let allShareAmount = 0;
        this.bidders.forEach(({ amount }) => {
          allShareAmount += amount;
        });

        return roundNumber(allShareAmount);
      }

      return this.amount;
    }

  },
});

export default Bid;
