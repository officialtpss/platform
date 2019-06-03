import {Meteor} from 'meteor/meteor';
import { populousEvents } from 'meteor/populous:constants';

import Bid from "../model";
import LedgerBalance from '../../ledger_balance/model';
import Invoice from "../../invoices/model";
import Wallet from "../../wallet/model";
import Crowdsale from "../../crowdsale/model";
import User from "../../accounts/model";
import moment from "moment";
import roundNumber from "../../helpers/roundNumber";
import PopulousEmitter from "../../../server/PopulousEmitter";


Bid.extend({
  meteorMethods:{
    joinOrEditGroupBid(amountStr, isAnonymous){
      if(!this.isGroup()){
        throw new Meteor.Error(400, 'Join available only for group bids');
      }

      const currentUserId = Meteor.userId();
      const amount = roundNumber(amountStr);
      const sumOfBids = this.getRaisedBidAmount();

      if(!currentUserId){
        throw new Meteor.Error(403, 'Access forbidden');
      }

      if((sumOfBids + amount) > this.amount){
        throw new Meteor.Error(400, 'Shared amount above available of this bid');
      }

      const isJoined = this.isJoined();

      const currentDate = moment().utc().toDate();

      const invoice = Invoice.findOne({
        _id: this.invoiceId,
      });

      const crowdsale = Crowdsale.findOne({
        invoiceId: this.invoiceId
      });

      if(!invoice || !crowdsale){
        throw new Meteor.Error(403, 'Access forbidden');
      }

      const balance = LedgerBalance.findOne({
        userId: currentUserId,
        currency: invoice.currency,
      });

      if(!balance || balance.amount < amount) {
        throw new Meteor.Error(400, 'The amount must not exceed the existing balance');
      }

      const bidderWallet = Wallet.findOne({userId: currentUserId});
      if(!bidderWallet) {
        throw new Meteor.Error(400, "You don't have a wallet");
      }
      let event;

      const query = {_id: this._id};
      const updateObject = {};

      // We include the changes for both (class instance and direct mongo update)
      // for calculate sortAmount and other logic that works after document update in DB
      if(isJoined){
        query['bidders.userId'] = currentUserId;

        this.bidders = this.bidders.map((bidder) => {
          if(bidder.userId !== currentUserId){
            return bidder;
          }
          bidder.amount += amount;
          bidder.updatedAt = currentDate;
          updateObject.$set = {
            'bidders.$.amount': bidder.amount,
            'bidders.$.updatedAt': bidder.updatedAt
          };
          return bidder;
        });

        event = populousEvents.bidIncreased;
      }else{
        const newBidder = {
          userId: currentUserId,
          amount,
          isAnonymous,
          createdAt: currentDate,
          updatedAt: currentDate,
        };

        event = populousEvents.bidJoined;

        this.bidders.push(newBidder);
        updateObject.$push = {bidders:newBidder};
      }

      const currentHighestBid = Bid.findOne({crowdsaleId: crowdsale._id,}, {sort: {sortAmount: -1}});

      balance.amount -= amount;
      this.sortAmount = this.calculateSortAmount();

      if (updateObject.$set) {
        updateObject.$set.sortAmount = this.sortAmount;
      } else {
        updateObject.$set = {sortAmount: this.sortAmount};
      }

      Bid.update(query, updateObject);
      balance.save();

      PopulousEmitter.emit(event, {...this}, currentUserId, amount);
      // Is winner:
      if (this.sortAmount === this.amount && this.sortAmount === invoice.salePrice) {
        crowdsale.closeCrowdsale();
      } else if (this._id !== currentHighestBid._id) {
        // Create notification
        const bids = Bid.find({crowdsaleId: crowdsale._id,}, {sort: {sortAmount: -1}, limit: 2}).fetch();

        if (bids.length > 1) {
          const isHighestBid = bids[0];
          const loserBid = bids[1];

          if (this._id === isHighestBid._id) {
            if (!loserBid.bidders.length) {
              PopulousEmitter.emit(populousEvents.beatBid, invoice, loserBid.userId, true);
            } else {
              loserBid.bidders.forEach((bidder) => {
                PopulousEmitter.emit(populousEvents.beatBid, invoice, bidder.userId, true);
              });
            }
          }
        }
      }
    },

    increaseIndividualBid(amountStr){
      const currentUserId = Meteor.userId();
      const amount = roundNumber(amountStr);

      if(currentUserId !== this.userId){
        throw new Meteor.Error(403, 'Access forbidden');
      }

      const invoice = Invoice.findOne({
        _id: this.invoiceId,
      });

      const crowdsale = Crowdsale.findOne({
        invoiceId: this.invoiceId
      });

      if(!invoice || !crowdsale){
        throw new Meteor.Error(403, 'Access forbidden');
      }

      const bidderWallet = Wallet.findOne({userId: currentUserId});
      if(!bidderWallet) {
        throw new Meteor.Error(400, "You don't have a wallet");
      }

      const balance = LedgerBalance.findOne({
        userId: currentUserId,
        currency: invoice.currency,
      });

      if(!balance || balance.amount < amount) {
        throw new Meteor.Error(400, 'The amount must not exceed the existing balance');
      }

      const currentHighestBid = Bid.findOne({crowdsaleId: crowdsale._id,}, {sort: {sortAmount: -1}});

      balance.amount -= amount;
      this.amount += amount;
      this.sortAmount = this.calculateSortAmount();
      Bid.update(
        {_id: this._id},
        {
          $set: {
            amount: this.amount,
            sortAmount: this.sortAmount,
          }
        }
      );
      balance.save();

      // Is winner:

      PopulousEmitter.emit(populousEvents.bidIncreased, {...this}, currentUserId, amount);

      if (this.sortAmount === this.amount && this.sortAmount === invoice.salePrice) {
        crowdsale.closeCrowdsale();
      } else if (this._id !== currentHighestBid._id) {
        // Create notification
        const bids = Bid.find({crowdsaleId: crowdsale._id,}, {sort: {sortAmount: -1}, limit: 2}).fetch();

        if (bids.length > 1) {
          const isHighestBid = bids[0];
          const loserBid = bids[1];

          if (this._id === isHighestBid._id) {
            const competitor = User.findOne(isHighestBid.userId);

            if (!loserBid.bidders.length) {
              PopulousEmitter.emit(populousEvents.beatBid, invoice, loserBid.userId, false, isHighestBid.isAnonymous, competitor);
            } else {
              loserBid.bidders.forEach((bidder) => {
                PopulousEmitter.emit(populousEvents.beatBid, invoice, bidder.userId, false, isHighestBid.isAnonymous, competitor);
              });
            }
          }
        }
      }

    }
  }
});
