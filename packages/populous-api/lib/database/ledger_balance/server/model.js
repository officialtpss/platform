import {
  invoiceStatuses,
} from 'meteor/populous:constants';

import LedgerBalance from "../model";
import Bid from "../../bid/model";
import Invoice from "../../invoices/model";

LedgerBalance.extend({

  meteorMethods: {
    async getAvailableBalance() {
      let currentBalance = this.amount;
      const invoiceIdToBidAmount = {};

      Bid.find({
        $and: [
          {
            $or: [
              {
                bidders: {$elemMatch: {userId: this.userId}}
              },
              {userId: this.userId}
            ]
          }]
      }).forEach((bid) => {

        let bidAmount;

        if (bid.isGroup()) {
          bid.bidders.some(({userId, amount}) => {
            if (userId === this.userId) {
              bidAmount = amount;
              return true;
            }
          })
        } else {
          bidAmount = bid.amount;
        }

        invoiceIdToBidAmount[bid.invoiceId] = bidAmount;

      });

      Invoice.find({
        _id: {$in: Object.keys(invoiceIdToBidAmount)},
        status: invoiceStatuses.auctionOpen
      }).forEach(({_id: invoiceId}) => {
        currentBalance -= invoiceIdToBidAmount[invoiceId];
      });

      return currentBalance;
    },

    async updateWithdrawableAmount(){
      this.withdrawableAmount = await this.getWithdrawableAmount();
      this.save();
    }
  }
});
