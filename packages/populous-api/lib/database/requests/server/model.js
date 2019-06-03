import { Meteor } from 'meteor/meteor';
import Request from '../model';
import User from "../../accounts/model";
import { Config } from 'meteor/populous:config';
import ExchangeRate from '../../exchange_rate/model';
import checkAuth from "../../helpers/checkAuth";
import { requestTypes, populousEvents } from 'meteor/populous:constants';
import LedgerLog from "../../ledger_log/model";
import LedgerBalance from "../../ledger_balance/model";
import PopulousEmitter from "../../../server/PopulousEmitter";

Request.extend({
  meteorMethods: {
    async addToMyQueue(dataArray) {
      checkAuth();
      const user = await User.findOne(Meteor.userId());

      if (!user.isAdmin()) {
        throw new Meteor.Error(403, 'Access forbidden');
      }

      if (!dataArray || !dataArray.length) {
        throw new Meteor.Error(400, 'Please select at least one request');
      }

      dataArray.forEach((targetId)=>{
        let request = Request.findOne({dataId: targetId});

        if (request.isComplete) {
          throw new Meteor.Error(400, 'Request is completed');
        }

        if (request.adminId && request.adminId === user._id) {
          throw new Meteor.Error(400, 'Request has been already added to “My queue”');
        } else if (request.adminId) {
          throw new Meteor.Error(400, 'Request has been already added to “My queue” by the other admin');
        }

        request.adminId = user._id;
        request.save();
      });
    },

    async unassign(dataArray, isReassign) {
      checkAuth();
      const user = await User.findOne(Meteor.userId());

      if (!user.isAdmin()) {
        throw new Meteor.Error(403, 'Access forbidden');
      }

      if (!dataArray || !dataArray.length) {
        throw new Meteor.Error(400, 'Please select at least one request');
      }

      dataArray.forEach((targetId)=>{
        let request = Request.findOne({dataId: targetId});

        if (request.isComplete) {
          throw new Meteor.Error(400, 'Request is completed');
        }

        if (!request.adminId) {
          throw new Meteor.Error(400, 'Incorrect selected');
        }

        request.adminId = isReassign ? user._id : '';
        request.save();
      });
    },

    async markComplete(id) {
      checkAuth();
      const user = await User.findOne(Meteor.userId());

      if (!user.isAdmin()) {
        throw new Meteor.Error(403, 'Access forbidden');
      }

      const request = await Request.findOne({dataId: id});

      if (request.type === requestTypes.withdraw) {
        const relatedLedgerLog = await LedgerLog.findOne(request.dataId);
        const requestUser = await User.findOne(relatedLedgerLog.fromUserId);


        if(requestUser.isBorrower()){
          const borrowerLedgerBalance = await LedgerBalance.findOne({
            userId: requestUser._id,
            currency: relatedLedgerLog.fromCurrency,
          });

          // Always subtract from amount first
          borrowerLedgerBalance.amount -= request.amount;

          if (borrowerLedgerBalance.amount < 0) {
            // If amount is not enough then subtract from interest amount
            borrowerLedgerBalance.interestAmount += borrowerLedgerBalance.amount;
            borrowerLedgerBalance.amount = 0;
          }

          borrowerLedgerBalance.save();
        }

        PopulousEmitter.emit(populousEvents.withdrawalToBankAccountConfirmation, request, requestUser._id);
      }

      request.isComplete = true;
      await request.save();
    },

    async removeWithMyQueue(id) {
      checkAuth();
      const user = await User.findOne(Meteor.userId());

      if (!user.isAdmin()) {
        throw new Meteor.Error(403, 'Access forbidden');
      }

      await Request.update({
        dataId: id,
        isComplete: false,
        adminId: {$ne: ''}
      }, {
        $set: {adminId: ''}
      });
    },

    getTotalRequests(type) {
        return Request.find({
          type,
          adminId: {$ne: Meteor.userId()},
        }).count();
    },
  }
});
