import {Meteor} from 'meteor/meteor';
import {
  crowdsaleStatuses, invoiceStatuses,
  requestTypes,
  blockchainActionTypes,
  invoiceDocumentTypes,
  ledgerActionsTypes,
  blockchainActionStatuses,
  populousEvents,
} from 'meteor/populous:constants';

import Crowdsale from "../model";
import Invoice from "../../invoices/model";
import Bid from "../../bid/model";
import Wallet from "../../wallet/model";
import LedgerBalance from "../../ledger_balance/model";
import LedgerLog from "../../ledger_log/model";
import BlockchainAction from "../../blockchainAction/model";
import PopulousEmitter from "../../../server/PopulousEmitter";

Crowdsale.extend({
  meteorMethods: {
    async closeCrowdsale() {
      const invoice = Invoice.findOne({
        _id: this.invoiceId,
      });

      if (invoice.status !== invoiceStatuses.auctionOpen) {
        throw new Meteor.Error(403, 'Invoice status is invalid for close action');
      }

      invoice.status = invoiceStatuses.auctionClosed;
      invoice.save();

      const winnerBid = Bid.findOne({
        crowdsaleId: this._id,
        sortAmount: {$gte: invoice.salePrice}
      });

      const bids = Bid.find({
        invoiceId: invoice._id,
      }).fetch();

      if (!winnerBid && bids.length) {
        bids.forEach((bid) => {
          if (bid.names.isGroup) {
            bid.bidders.forEach(({userId}) => {
              PopulousEmitter.emit(populousEvents.closedAuction, invoice, userId);
            });
          } else {
            PopulousEmitter.emit(populousEvents.closedAuction, invoice, bid.userId);
          }
        });

        PopulousEmitter.emit(populousEvents.closedAuction, invoice, invoice.borrowerId);
      }

      await this.closeAuctionsByWinnderBid(winnerBid, invoice);
    },

    async acceptOffer(bid) {
      const invoice = Invoice.findOne({
        _id: this.invoiceId,
      });

      await this.closeAuctionsByWinnderBid(bid, invoice, false, true)
    },

    async isForceInsertPossible(returnBool = true) {
      const invoice = await Invoice.findOne({
        _id: this.invoiceId,
      });

      if (invoice.status !== invoiceStatuses.repaymentPending) {
        return false;
      }

      const blockchainAction = await BlockchainAction.findOne({
        invoiceId: invoice._id,
        type: blockchainActionTypes.invoice,
      });

      if (blockchainAction && blockchainAction.status === blockchainActionStatuses.complete) {
        return false;
      }

      if (returnBool) {
        return true;
      }

      const winnerBid = await Bid.findOne({
        crowdsaleId: this._id,
        isWinner: true,
      });

      return {
        invoice,
        blockchainAction,
        winnerBid,
      }
    },

    async forceInsert() {
      const isPossible = this.isForceInsertPossible(false);

      if (typeof isPossible !== 'object') {
        throw new Meteor.Error(403, 'Invoice force insert is forbidden');
      }

      const {invoice, blockchainAction, winnerBid} = isPossible;
      if (blockchainAction) {
        invoice.addToBlockchain()
      } else {
        this.closeAuctionsByWinnderBid(winnerBid, invoice, true);
      }
    },

    async closeAuctionsByWinnderBid(winnerBid, invoice, forceInsert = false, isAcceptOffer = false) {

      if (winnerBid && invoice) {
        if (!forceInsert) {
          let soldPrice = 0;
          const borrowerLedgerQuery = {
            userId: invoice.borrowerId,
            currency: invoice.currency,
          };

          const borrowerLedger = LedgerBalance.findOne(borrowerLedgerQuery) || new LedgerBalance(borrowerLedgerQuery);

          // Invoice closes successfully (the goal sale price was reached at auction)
          // Used invoice goal sale price for increase: "amount" in borrower ledger_balance
          if (!isAcceptOffer) {
            borrowerLedger.amount += invoice.salePrice;
            soldPrice = invoice.salePrice;
          }

          const transferFundsToBorrower = ({userId, amount}) => {
            const bidderWallet = Wallet.findOne({userId: userId});

            const investorLedger = LedgerBalance.findOne({
              userId: userId,
              currency: invoice.currency,
            });

            // Seller to accept best bid (once 24 hours auction period is finished and target price of the seller is not reached)
            // Used bid amount for increase: "amount" in borrower ledger_balance
            if (isAcceptOffer) {
              borrowerLedger.amount += amount;
              soldPrice += amount;
            }

            new LedgerLog({
              fromUserId: userId,
              fromUserAddress: (bidderWallet && bidderWallet.address) ? bidderWallet.address : 'no wallet',
              fromValue: amount,
              toValue: amount,
              fromCurrency: invoice.currency,
              fromNewBalance: investorLedger.amount + amount,
              toNewBalance: borrowerLedger.amount,
              toUserId: this.borrowerId,
              toUserAddress: null,
              toCurrency: invoice.currency,
              conversionRate: 0,
              spread: 0,
              type: ledgerActionsTypes.crowdsale,
              isPending: false,
              dataId: this._id,
            }).save();
          };

          const applyFunctionForEachWinner = (callback) => {
            if (winnerBid.names.isGroup) {
              // Group:
              winnerBid.bidders.forEach(callback)
            } else {
              callback(winnerBid);
            }
          };

          applyFunctionForEachWinner(transferFundsToBorrower);

          borrowerLedger.save();

          this.status = crowdsaleStatuses.closed;

          invoice.soldPrice = soldPrice;
          invoice.save();
          this.save();

          winnerBid.isWinner = true;
          winnerBid.save();

          // For invoice borrower
          PopulousEmitter.emit(populousEvents.invoiceSuccessfulClosed, invoice);

          applyFunctionForEachWinner((bidder) => {
            PopulousEmitter.emit(populousEvents.invoiceWinner, {...invoice}, bidder.userId, {...winnerBid});
          })
        }

        const userIdToLedgerLogs = {};

        const bids = Bid.find({
          crowdsaleId: this._id,
        });
        // return amount to losers investors:
        bids.forEach((bid) => {
          const {_id, names, bidders, amount, userId} = bid;
          const isWinnerBid = _id === winnerBid._id;

          if (names.isGroup) {

            // Group:
            bidders.forEach((bidder) => {
              const {userId, amount} = bidder;

              if (!isWinnerBid && !forceInsert) {
                const balance = LedgerBalance.findOne({
                  userId: userId,
                  currency: invoice.currency,
                });

                balance.amount += amount;
                balance.save();

                PopulousEmitter.emit(populousEvents.unsuccessfulBids, invoice, userId);
              }

              userIdToLedgerLogs[userId] = true;
            });
          } else {
            // Individual:
            if (!isWinnerBid && !forceInsert) {
              const balance = LedgerBalance.findOne({
                userId: userId,
                currency: invoice.currency,
              });

              balance.amount += amount;
              balance.save();

              PopulousEmitter.emit(populousEvents.unsuccessfulBids, invoice, userId);
            }

            userIdToLedgerLogs[userId] = true;
          }

          bid.isReturned = true;
          bid.save();
        });

        if (!forceInsert) {
          invoice.status = invoiceStatuses.repaymentPending;
          invoice.save();
          invoice.updateReturnPercentage();
        }

        LedgerLog.update({
            fromUserId: {$in: Object.keys(userIdToLedgerLogs)},
            inBlock: {$exists: false},
          }, {
            $set: {
              inBlock: invoice._id,
            }
          },
          {multi: true});


        invoice.addToBlockchain();
      }
    },
  }
});


