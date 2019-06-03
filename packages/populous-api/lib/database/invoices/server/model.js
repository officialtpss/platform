import {Meteor} from 'meteor/meteor';
import {Email} from 'meteor/email';
import {
  requestTypes,
  currencies,
  invoiceStatuses,
  crowdsaleStatuses,
  invoiceSellerFee,
  ledgerActionsTypes,
  getTierFee,
  adminFee,
  blockchainActionStatuses,
  invoiceDocumentTypes,
  blockchainActionTypes,
  companyDetails,
  emailTemplates,
  getEmailTemplate,
  userRoles,
  populousEvents,
  platformActionTypes,
  platformActionStatuses,
} from 'meteor/populous:constants';
import moment from "moment";
import ethConnect from 'meteor/populous:eth-connect';

import Invoice from "../model";
import Crowdsale from "../../crowdsale/model";
import Bid from "../../bid/model";
import User from "../../accounts/model";
import LedgerBalance from '../../ledger_balance/model';
import Wallet from "../../wallet/model";
import transferFunds from "../../../server/transferFunds";
import BlockchainAction from "../../blockchainAction/model";
import File from "../../files/model";
import Debtor from "../../debtors/model";
import checkAuth from "../../helpers/checkAuth";
import roundNumber from "../../helpers/roundNumber";
import connectInstance from "../../../server/connectInstance";
import {removeFile} from "../../files/server/methods";
import EmailTemplate from "../../email_template/model";
import {ForbiddenError} from "../../helpers/Errors";
import Requests from "../../requests/model";
import PopulousEmitter from "../../../server/PopulousEmitter";
import PlatformAction from "../../platformActions/model";

const {
  config: {
    network: {ropsten},
    contract: {populous},
  },
  contracts: {populous: {addInvoice}},
} = ethConnect;


Invoice.extend({
  meteorMethods: {
    async isInvoiceNumberUnique(invoiceNumber) {
      let userId = checkAuth();

      return !(await Invoice.findOne({invoiceNumber, borrowerId: userId}));
    },

    create(toBlockchain) {

      const userId = checkAuth();
      const user = User.findOne(userId);
      const debtor = Debtor.findOne(this.debtorId);

      if (!this.isInvoiceNumberUnique(this.invoiceNumber, debtor)) {
        throw new Meteor.Error(400, 'Invoice number is not unique for selected debtor');
      }

      // Reference ID was removed from this collection
      // Provider will user `referenceInfo` field for any additional info

      if (user.isBorrower()) {
        if (this.referenceId && !user.isReferenceIdExists(this.referenceId)) {
          throw new Meteor.Error(400, 'Reference ID is incorrect');
        }

        if (!user.isUserHasInvoices()) {
          user.referenceId = this.referenceId;
          user.save()
        }
      }

      this.amount = roundNumber(this.amount);
      this.salePrice = roundNumber(this.salePrice);

      if(toBlockchain){
        this.soldPrice = roundNumber(this.soldPrice);
        this.status = invoiceStatuses.externalTrade;
      } else if (user.isProvider() && this.providerFeeAmount !== undefined) {
        this.providerFeeAmount = roundNumber(this.providerFeeAmount);
      }

      // We want to add the borrowerId on the server
      // so people cannot create invoices in another
      // persons name
      this.borrowerId = userId;
      this.zscore = user.latestZScore;
      this.save();
      this.updateReturnPercentage();

      if (this.status === invoiceStatuses.externalTrade) {
        this.addToBlockchain();
      }

      // Create notification
      PopulousEmitter.emit(populousEvents.postingNewInvoices, this);

      // Create request
      new Requests({
        type: requestTypes.invoice,
        userId: this.borrowerId,
        dataId: this._id,
      }).save();

      // Return the new invoice object
      return this;
    },

    update(values) {
      checkAuth();

      if (values.newDebtor) {
        this.debtorId = (new Debtor({
          name: values.DebtorName,
          country: values.debtorCountry,
          companyNumber: values.debtorNumber
        })).save();
      } else if(values.debtorId){
        this.debtorId = values.debtorId;
      }

      if (values.newSeller) {
        this.sellerId = (new Debtor({
          name: values.SellerName,
          country: values.sellerCountry,
          companyNumber: values.sellerNumber
        })).save();
      } else if(values.sellerId) {
        this.sellerId = values.sellerId;
      }

      if (values.providerFee) {
        this.providerFeeAmount = roundNumber(values.providerFee);
      }

      if (values.uploadedInvoiceId) {
        this.documents = {...this.documents, ...{invoice: values.uploadedInvoiceId}};
      }

      this.referenceInfo = values.referenceInfo;
      this.currency = values.currencies;
      this.invoiceNumber = values.Invoicenumber;
      this.dueDate = new Date(Date.parse(values.DueDate));
      this.amount = roundNumber(values.Amount);
      this.salePrice = roundNumber(values.SaleGoal);

      this.status = invoiceStatuses.auctionPending;
      this.save();
      this.updateReturnPercentage();
      return this;
    },

    async accept() {
      const user = User.findOne(checkAuth());

      if (!user.isAdmin()) {
        throw new Meteor.Error(403, 'Access forbidden');
      }


      if (this.status !== invoiceStatuses.auctionPending
        || await PlatformAction.findOne({
          type: platformActionTypes.startAuction,
          status: {$ne: platformActionStatuses.completed},
          'data.invoiceId': this._id
        })
      ) {
        throw new Meteor.Error(401, 'Invoice already accepted');
      }

      await PlatformAction.insert({
        type: platformActionTypes.startAuction,
        data:{
          adminId: user._id,
          invoiceId: this._id,
        }
      });
    },

    async start(action){
      const crowdsale = new Crowdsale({
        borrowerId: this.borrowerId,
        invoiceId: this._id,
        invoiceNumber: this.invoiceNumber,
      });

      await crowdsale.save();

      const request = await Requests.findOne({
        type: requestTypes.invoice,
        dataId: this._id,
        isComplete: false
      });

      PopulousEmitter.emit(populousEvents.auctionOpenForNewInvoices, this);

      if (request) {
        request.adminId = action.data.adminId;
        request.isComplete = true;
        await request.save();
      }

      this.status = invoiceStatuses.auctionOpen;
      await this.save();
      await this.updateReturnPercentage();
    },

    decline(reason) {
      const userId = checkAuth();
      const admin = User.findOne({_id: userId});
      if (!admin || !admin.isAdmin()) {
        throw ForbiddenError;
      }

      if (!reason || typeof reason !== 'object') {
        throw new Meteor.Error('Incorrect reason');
      }

      const request = Requests.findOne({
        type: requestTypes.invoice,
        dataId: this._id,
      });

      PopulousEmitter.emit(populousEvents.declineInvoice, this);

      if (request) {
        request.adminId = userId;
        request.isComplete = false;
        request.save();
      }

      this.invoiceDeclinedReason = reason;
      this.status = invoiceStatuses.auctionRejected;
      this.save();

      this.borrower().callMethod('sendInvoiceDeclinedEmail', this);
    },

    async bid(params = {
      groupName: undefined,
      goal: undefined,
      amount: undefined,
      isGroup: undefined,
      isAnonymous: undefined,
    }) {
      const user = await User.findOne(Meteor.userId());

      if (!user) {
        throw new Meteor.Error(403, 'Access forbidden');
      }

      const crowdsale = await Crowdsale.findOne({
        invoiceId: this._id
      });

      if (!crowdsale) {
        throw new Meteor.Error(500, 'Internal server error');
      }

      const bidderWallet = Wallet.findOne({userId: user._id});
      if (!bidderWallet) {
        throw new Meteor.Error(400, "You don't have a wallet");
      }

      if(await Bid.findOne({
        invoiceId: this._id,
        userId: user._id,
      })){
        throw new Meteor.Error(403, "You are not able to place more than one bid");
      }

      params.names = {
        isGroup: !!params.isGroup,
        groupName: params.groupName || undefined,
      };

      params.amount = roundNumber(params.amount);

      const balance = LedgerBalance.findOne({
        userId: user._id,
        currency: this.currency,
      });

      if (!balance || balance.amount < params.amount) {
        throw new Meteor.Error(400, 'The amount must not exceed the existing balance');
      }

      if (params.isGroup) {
        const currentDate = moment().utc().toDate();

        params.bidders = [{
          userId: user._id,
          isAnonymous: params.isAnonymous,
          amount: params.amount,
          createdAt: currentDate,
          updatedAt: currentDate,
        }];

        balance.amount -= params.amount;

        params.amount = roundNumber(params.goal);
      } else {
        balance.amount = roundNumber(balance.amount - params.amount);
      }

      delete params.goal;
      delete params.isGroup;
      delete params.groupName;

     const bidDocument = new Bid({
          crowdsaleId: crowdsale._id,
          userId: user._id,
          invoiceId: this._id,
          ...params,
          isPending: false,
        });

      if (bidDocument.names.isGroup) {
        bidDocument.sortAmount = params.bidders[0].amount;
      } else {
        bidDocument.sortAmount = params.amount;
      }

      if (!bidDocument.save()) {
        throw new Meteor.Error(403, "We are not able to place bid");
      }

      balance.save();

      // Is winner:
      await this.updateReturnPercentage();
      if (bidDocument.sortAmount === bidDocument.amount && bidDocument.sortAmount === this.salePrice) {
        await crowdsale.closeCrowdsale(this);
      } else {
        // Create notification
        const bids = await Bid.find({crowdsaleId: crowdsale._id,}, {sort: {sortAmount: -1}}).fetch();

        if (bids.length > 1) {
          const isHighestBid = bids[0];
          const loserBid = bids[1];

          if (bidDocument._id === isHighestBid._id) {
            if (!loserBid.bidders.length) {
              const competitor = User.findOne(isHighestBid.userId);
              PopulousEmitter.emit(populousEvents.beatBid, this, loserBid.userId, false, isHighestBid.isAnonymous, competitor);
            } else {
              loserBid.bidders.forEach((bidder) => {
                PopulousEmitter.emit(populousEvents.beatBid, this, bidder.userId, true);
              });
            }
          }
        }
      }

      PopulousEmitter.emit(populousEvents.bidPlaced, {...bidDocument}, {...this});
    },

    // Is used for: Cancel Auction and Terminate Auction
    async closeAuction() {
      const user = await User.findOne(Meteor.userId());

      if (!user || (user._id !== this.borrowerId && !user.isAdmin())) {
        throw new Meteor.Error(403, 'Access forbidden');
      }

      const crowdsale = await Crowdsale.findOne({
        invoiceId: this._id
      });

      if (!crowdsale) {
        throw new Meteor.Error(500, 'Internal server error');
      }

      if (crowdsale.status !== crowdsaleStatuses.open) {
        throw new Meteor.Error(500, 'Crowdsale state is incompatible with this action');
      }

      const bids = await Bid.find({
        invoiceId: this._id,
      }).fetch();

      // return amount to investors:
      if (bids.length) {
        bids.forEach((bid) => {

          if (bid.names.isGroup) {
            // Group:
            bid.bidders.forEach(({userId, amount}) => {
              const balance = LedgerBalance.findOne({
                userId: userId,
                currency: this.currency,
              });

              balance.amount += amount;
              balance.save();

              PopulousEmitter.emit(populousEvents.canceledAuction, this, userId);
            });

          } else {
            // Individual:
            const balance = LedgerBalance.findOne({
              userId: bid.userId,
              currency: this.currency,
            });

            balance.amount += bid.amount;
            balance.save();

            PopulousEmitter.emit(populousEvents.canceledAuction, this, bid.userId);
          }

          bid.isReturned = true;
          bid.save();
        });
      }

      this.status = invoiceStatuses.auctionFailed;
      await this.save();

      crowdsale.status = crowdsaleStatuses.closed;
      await crowdsale.save();

      PopulousEmitter.emit(populousEvents.canceledAuction, this, this.borrowerId);
    },

    async restartAuction() {
      const user = await User.findOne(Meteor.userId());

      if (!user || (user._id !== this.borrowerId && !user.isAdmin())) {
        throw new Meteor.Error(403, 'Access forbidden');
      }

      const crowdsale = await Crowdsale.findOne({
        invoiceId: this._id
      });

      if (!crowdsale) {
        throw new Meteor.Error(500, 'Internal server error');
      }

      const bids = await Bid.find({
        invoiceId: this._id,
      }).fetch();

      // return amount to investors:
      // if crowdsale has the status "close", then the money has already been returned!
      if (bids.length && crowdsale.status === crowdsaleStatuses.open) {
        bids.forEach((bid) => {

          if (bid.names.isGroup) {
            // Group:
            bid.bidders.forEach(({userId, amount}) => {
              const balance = LedgerBalance.findOne({
                userId: userId,
                currency: this.currency,
              });

              balance.amount += amount;
              balance.save();

              PopulousEmitter.emit(populousEvents.restartAuction, this, userId);
            });

          } else {
            // Individual:
            const balance = LedgerBalance.findOne({
              userId: bid.userId,
              currency: this.currency,
            });

            balance.amount += bid.amount;
            balance.save();

            PopulousEmitter.emit(populousEvents.restartAuction, this, bid.userId);
          }

          bid.isReturned = true;
          bid.save();
        });
      }

      await Bid.remove({invoiceId: this._id});

      // If incorrect due date
      const currentDate = moment().utc();
      const dueDate = moment(this.dueDate);
      if (currentDate.isAfter(dueDate)) {
        this.status = invoiceStatuses.auctionRejected;
        await this.save();
        throw new Meteor.Error(400, 'Incorrect due date.');
      } else {
        this.status = invoiceStatuses.auctionOpen;
      }

      await this.save();
      await this.updateReturnPercentage();

      crowdsale.closeAt = moment().add(24, 'hours').utc().toDate();
      crowdsale.status = crowdsaleStatuses.open;
      await crowdsale.save();

      PopulousEmitter.emit(populousEvents.restartAuction, this, this.borrowerId);

      // when auction is restarted by admin, a notification that auction is restarted sent to invoice seller email
      if (user._id !== this.borrowerId) {
        const template = EmailTemplate.findOne({systemName: emailTemplates.InvoiceRestated.systemName});
        const borrower = await User.findOne(this.borrowerId);
        const userName = borrower.fullName();
        const body = template.body.replace('{{name}}', userName).replace('{{invoiceNumber}}', this.invoiceNumber);
        if (template) {
          Email.send({
            to: borrower.emailAddress(),
            from: companyDetails.supportEmail,
            subject: template.subject.replace('{{invoiceNumber}}', this.invoiceNumber),
            html: getEmailTemplate(body)
          });
        } else {
          Email.send({
            to: borrower.emailAddress(),
            from: companyDetails.supportEmail,
            subject: 'Invoice is restarted',
            html: getEmailTemplate(`Invoice ${this.invoiceNumber} have been restarted`)
          });
        }
      }
    },

    async repayment(borrowerId, transferCurrency, amount, targetInvoiceId) {
      let transferAmount = roundNumber(amount, 5);

      // Get current user object
      const user = await User.findOne(Meteor.userId());

      // Check is current user is admin role
      if (!user || !user.isAdmin()) {
        throw new Meteor.Error(403, 'Access forbidden');
      }

      // Validate typed amount
      if (transferAmount <= 0) {
        throw new Meteor.Error(400, 'The amount of transfer must be more 0');
      }

      // Validate selected currency
      if (!transferCurrency) {
        throw new Meteor.Error(400, 'Currency is required');
      }

      // Validate target invoice ID
      if (!targetInvoiceId) {
        throw new Meteor.Error(400, 'Invoice ID is required');
      }

      const targetInvoice = await Invoice.findOne({
          borrowerId,
          _id: targetInvoiceId,
          status: invoiceStatuses.repaymentPending,
          currency: transferCurrency
      });

      // Validate target invoice
      if (!targetInvoice) {
        throw new Meteor.Error(400, 'Target invoice not found');
      }

      // Transfer funds from populous to borrower
      transferFunds({
        fromUserId: "Populous",
        toUserId: borrowerId,
        fromUserAddress: "Populous",
        toUserAddress: 'borrower',
        fromCurrency: transferCurrency,
        interest: transferAmount,
        ledgerType: ledgerActionsTypes.repayment
      });

      const borrowerLedgerQuery = {userId: borrowerId, currency: transferCurrency};
      const borrowerLedger = LedgerBalance.findOne(borrowerLedgerQuery) || new LedgerBalance(borrowerLedgerQuery);
      const borrower = await User.findOne(borrowerId);
      const borrowerReferenceId = borrower.getReferenceId();
      const isProvider = borrower.isProvider();

      // repayment function
      const invoiceRepayment = (invoice) => {
        try {
          let borrowerLedgerCurrentAmount = borrowerLedger.interestAmount;

          if (borrowerLedgerCurrentAmount <= 0) {
            return true;
          }

          // get winner bid
          const bid = Bid.findOne({
            invoiceId: invoice._id,
            isWinner: true
          });

          if (!bid) {
            return;
          }

          // calculate amount for close invoice
          let invoiceOwedAmount = invoice.amount - invoice.repayedPrice;

          // calculate platform fee percentage
          const platformFeeRate = adminFee;
          const invoiceTierFee = getTierFee(invoice.zscore);

          const amortizationAmount = (borrowerLedgerCurrentAmount >= invoiceOwedAmount)
            ? invoiceOwedAmount
            : borrowerLedgerCurrentAmount;

          const platformFeeAmount = isProvider
            ? roundNumber((amortizationAmount / invoice.amount) * (invoice.providerFeeAmount / 2))
            : roundNumber(amortizationAmount * (platformFeeRate + invoiceTierFee));
          const borrowerReferenceFee = borrowerReferenceId ? roundNumber(amortizationAmount * platformFeeRate / 2) : 0;

          // Transfer funds to platform
          transferFunds({
            fromUserId: borrowerId,
            toUserId: "Populous",
            fromUserAddress: 'borrower',
            toUserAddress: "Populous",
            fromCurrency: invoice.currency,
            amount: platformFeeAmount - borrowerReferenceFee,
            dataId: invoice._id,
            ledgerType: ledgerActionsTypes.repayment
          });

          // repay half of admin fee to the reference user

          if (borrowerReferenceId) {
            // Transfer funds to reference user
            transferFunds({
              fromUserId: borrowerId,
              toUserId: borrowerReferenceId,
              fromUserAddress: 'borrower',
              toUserAddress: "reference",
              fromCurrency: invoice.currency,
              interest: borrowerReferenceFee,
              dataId: invoice._id,
              ledgerType: ledgerActionsTypes.repayment
            });
          }

          const repayBid = ({userId, amount}) => {
            const interestSubtract = isProvider
              ? invoice.providerFeeAmount
              : (invoice.amount * (platformFeeRate + invoiceTierFee));

            // calculate what part of amortization amount will be transfer as interest
            const interest = roundNumber(
              (amortizationAmount / invoice.amount) // what part of invoice will be repaid
              * (amount / bid.sortAmount) // what part of bid was placed by bidder
              * ((invoice.amount - bid.sortAmount) - interestSubtract) // calculate total interest of invoice without fee
            );

            // calculate what part of amortization amount will be transfer as bid amount repayment
            const principle = roundNumber(amount * (amortizationAmount / invoice.amount));

            const investorWallet = Wallet.findOne({userId});
            // Transfer funds to invoice buyer (investor) winner
            transferFunds({
              fromUserId: borrowerId,
              toUserId: userId,
              fromUserAddress: 'borrower',
              toUserAddress: investorWallet.address,
              fromCurrency: invoice.currency,
              interest,
              principle,
              dataId: invoice._id,
              ledgerType: ledgerActionsTypes.repayment
            });
          };

          if (bid.names.isGroup) {
            // Transfer funds to invoice buyer (investor) winner
            bid.bidders.forEach(repayBid);
          } else {
            repayBid(bid);
          }

          if (amortizationAmount >= invoiceOwedAmount) {
            invoice.status = invoiceStatuses.repaymentPaid;
            bid.isReturned = true;
            bid.save();

            PopulousEmitter.emit(populousEvents.repayment, invoice, invoice.borrowerId, false);
          } else {
            PopulousEmitter.emit(populousEvents.repayment, invoice, invoice.borrowerId, true);
          }

          invoice.repayedPrice += amortizationAmount;
          invoice.save();
          borrowerLedger.interestAmount -= (amortizationAmount - (isProvider ? platformFeeAmount : 0));
          borrowerLedger.save();
        } catch (error) {
          throw new Meteor.Error(500, error.message);
        }
      };

      // Repayment target invoice
      invoiceRepayment(targetInvoice);

      // Get all borrower invoices in status pending repayment, sorted by closest due date first
      const invoices = await Invoice.find({
          borrowerId,
          _id: {$ne: targetInvoiceId},
          status: invoiceStatuses.repaymentPending,
          currency: transferCurrency,
        }, {sort: {"dueDate": 1}}
      ).fetch();

      invoices.some(invoiceRepayment);
    },

    async toggleDefaulted() {
      this.isDefaulted = !this.isDefaulted;
      await this.save()
    },
    uploadContract(contracts) {
      const userId = checkAuth();
      const user = User.findOne(userId);

      if((!this.isOwner(user) || this.status !==  invoiceStatuses.auctionPending) && !user.isAdmin()){
        throw ForbiddenError;
      }

      if (typeof contracts !== 'object' || typeof Object.values(contracts).shift() === 'object') {
        throw new Meteor.Error(400, 'Malformed request');
      }

      const oldFileId = this.documents[Object.keys(contracts)[0]];

      this.documents = {...this.documents, ...contracts};
      this.save();

      //the old doc are deleted from the S3 bucket
      File.deleteS3Objects([oldFileId]);

      return this;
    },
    async addToBlockchain(nonce, shouldReleaseFlow = true) {
      const borrower = await User.findOne(this.borrowerId);
      const providerId = borrower.isProvider() ? borrower._id : process.env.populousProviderId;
      const blockchainObject = {
        invoiceId: this._id,
        type: blockchainActionTypes.invoice,
      };

      const blockchainAction = await BlockchainAction.findOne(blockchainObject);
      let blockchainActionId;

      if (blockchainAction) {
        if (blockchainAction.status === blockchainActionStatuses.complete) {
          return false;
        }

        blockchainActionId = blockchainAction._id;
      } else {
        blockchainActionId = await BlockchainAction.insert(blockchainObject);
      }

      const preparedFunction = addInvoice.bind(this, connectInstance, populous, nonce ? {
          nonce,
          from: ropsten.ethAddress
        } : ropsten.ethAddress,
        blockchainActionId, providerId, borrower.country,
        borrower.companyNumber, borrower.companyName, this.invoiceNumber);

      if(!shouldReleaseFlow){
        return preparedFunction();
      }
    },

    async removeDocument(docType) {
      checkAuth();

      if (!Object.values(invoiceDocumentTypes).includes(docType)) {
        return;
      }

      const fileId = this.documents[docType];

      if (fileId) {
        delete this.documents[docType];
        await this.save();

        await removeFile(fileId)
      }

      return this;
    },

    async updateReturnPercentage(shouldSave = true){
      const highestBidAmount = Math.max(
        await Bid.find({invoiceId: this._id})
        .fetch()
        .map((bid) => bid.amount)
      );

      this.returnPercentage = roundNumber((this.amount - (highestBidAmount || this.salePrice)) / this.amount * 100);
      if (shouldSave) {
        await this.save()
      }
    },

    async delete() {
      const user = await User.findOne(Meteor.userId());

      if (!user || (user._id !== this.borrowerId && !user.isAdmin())) {
        throw new Meteor.Error(403, 'Access forbidden');
      }

      if (this.documents.invoice) {
        await removeFile(this.documents.invoice);
      }
      if (this.documents.offer) {
        await removeFile(this.documents.offer);
      }
      if (this.documents.buyer) {
        await removeFile(this.documents.buyer);
      }      if (this.documents.agreement) {
        await removeFile(this.documents.agreement);
      }

      return this.remove();
    },

    async withdraw(){
      const user = await User.findOne(checkAuth());

      if(!this.isOwner(user)){
        throw ForbiddenError;
      }

      if(this.status !== invoiceStatuses.auctionPending){
        throw new Meteor.Error(400, 'Auction status is incorrect');
      }

      this.status = invoiceStatuses.awaitingContract;
      await this.save();
    },
    async updateInvoiceField(field, value) {
      const userId = checkAuth();
      const admin = User.findOne({_id: userId});
      if (!admin || !admin.isAdmin()) {
        throw ForbiddenError;
      }

      if (!field || !value) {
        throw new Meteor.Error(400, 'Data is incorrect');
      }

      this[field] = value;
      this.save();
    },
    async reorderDocuments(documents) {
      const userId = checkAuth();
      const admin = User.findOne({_id: userId});
      if (!admin || !admin.isAdmin()) {
        throw ForbiddenError;
      }

      if (!documents || documents.length < 3) {
        throw new Meteor.Error(400, 'Documents is missing');
      }

      documents.forEach(({type, id})=>{
        this.documents = {...this.documents, ...{[type]: id}};
      });

      console.log('THIS', this);

      this.save();
    }
  }
});
