import {populousEvents, userRoles, userSubscriptionTypes, getEmailTemplate, emailTemplates, companyDetails} from 'meteor/populous:constants';
import {Email} from "meteor/email";
import Notification from '../model';
import User from '../../accounts/model';
import Invoice from '../../invoices/model';
import PopulousEmitter from "../../../server/PopulousEmitter";
import UserSubscription from "../../UserSubscription/model";
import EmailTemplate from "../../email_template/model";


Notification.extend({
  meteorMethods: {

  }
});

const useChunks = (model, query, limit, callback) => {
  const total = model.find(query).count();

  for (let processed = 0; processed < total; processed += limit) {
    callback(model.find(query, {offset: processed, limit}));
  }
};

const activityInfoEvents = [
  populousEvents.auctionOpenForNewInvoices,
  populousEvents.auctionWillStartSoon
]

const invoiceActivitySubjects = {
  [populousEvents.auctionOpenForNewInvoices]: 'Auction is Open',
  [populousEvents.auctionWillStartSoon]: 'Invoice has been approved and is pending'
}

const sendInvoiceAcitivityInfoEmail = (user, message, notificationEventsType, dataId) => {
  try {
    let invoice = Invoice.findOne(dataId)
    if (invoice) {
      const template = EmailTemplate.findOne({systemName: emailTemplates.InvoiceActivityInfo.systemName});
      const userName = user.fullName();
      const seller = User.findOne(invoice.borrowerId);
      if (template && seller) {
        const emailBody = template.body
          .replace('{{name}}', userName)
          .replace('{{sellerName}}', seller.fullName())
          .replace('{{message}}', message)
          .replace('{{amount}}', invoice.amount)
          .replace('{{rate}}', invoice.returnPercentage);

        Email.send({
          to: user.emailAddress(),
          from: companyDetails.supportEmail,
          subject: template.subject.replace('{{subject}}', invoiceActivitySubjects[notificationEventsType]),
          html: getEmailTemplate(emailBody, '')
        });
      }
    }
  } catch (error) {
    console.log('Error', error)
  }
}

const createNotification = (user, message, notificationEventsType, dataId) => {
  Notification.insert({
    type: populousEvents[notificationEventsType],
    userId: user._id,
    dataId,
    message: `<div>Hi ${user.fullName()},</div>`+ message,
  });
  if (activityInfoEvents.includes(notificationEventsType)) {
    sendInvoiceAcitivityInfoEmail(user, message, notificationEventsType, dataId)
  }
};

PopulousEmitter.on(populousEvents.postingNewInvoices, (invoice) => {
  const query = {
    type: userSubscriptionTypes.borrower,
    data: {
      borrowerId: invoice.borrowerId
    }
  };

  const message = `<div>Published new invoice <span class="blue">${invoice.invoiceNumber}</span></div>`;

  useChunks(UserSubscription, query, 10000, (receivedCursor) => {
    const subscribedUserIds = receivedCursor
      .map(({userId}) => userId);

    User.find(
      {
        role: userRoles.investor,
        _id: {$in: subscribedUserIds},
      },
    ).forEach((user) => {
      createNotification(user, message, populousEvents.postingNewInvoices, invoice._id);
    });
  });
});

PopulousEmitter.on(populousEvents.auctionOpenForNewInvoices, (invoice) => {
  const query = {
    type: userSubscriptionTypes.borrower,
    data: {
      borrowerId: invoice.borrowerId
    }
  };
  const message = `<div>Auction open for invoice number <span class="blue">${invoice.invoiceNumber}</span></div>`;

  useChunks(UserSubscription, query, 10000, (receivedCursor) => {
    const subscribedUserIds = receivedCursor
      .map(({userId}) => userId);

    const users = User.find({
      $or: [
        {
          role: userRoles.investor,
          _id: {$in: subscribedUserIds},
        },
        {
          _id: invoice.borrowerId,
        },
      ],
    });

    users.forEach((user) => {
      createNotification(user, message, populousEvents.auctionOpenForNewInvoices, invoice._id);
    });
  })
});

PopulousEmitter.on(populousEvents.auctionWillStartSoon, (invoice, periodLength, timePeriod,) => {
  const query = {
    type: userSubscriptionTypes.borrower,
    data: {
      borrowerId: invoice.borrowerId
    }
  };
  const message = `<div>
          Auction <span class="blue">${invoice.invoiceNumber}</span>
          has been approved. Auction will begin in ${periodLength} ${timePeriod}.
        </div>`;

  useChunks(UserSubscription, query, 10000, (receivedCursor) => {
    const subscribedUserIds = receivedCursor
      .map(({userId}) => userId);
    const users = User.find({
      role: userRoles.investor,
      _id: {$in: subscribedUserIds},
    });

    users.forEach((user) => {
      createNotification(user, message, populousEvents.auctionWillStartSoon, invoice._id);
    });
  })
});
PopulousEmitter.on(populousEvents.declineInvoice, (invoice) => {
  const user = User.findOne(invoice.borrowerId);

  if (user) {
    const message = `<div>Invoice number <span class="blue">${invoice.invoiceNumber}</span> has been declined</div>`;
    createNotification(user, message, populousEvents.declineInvoice, invoice._id);
  }
});

PopulousEmitter.on(populousEvents.restartAuction, (invoice, userId) => {
  const user = User.findOne(userId);

  if (user) {
    const message = `<div>Auction for the invoices <span class="blue">${invoice.invoiceNumber}</span>has been restarted. ` +
        `${user._id !== invoice.borrowerId ? 'Your bid was returned to you.' : ''}</div>`;
    createNotification(user, message, populousEvents.restartAuction, invoice._id);
  }
});

PopulousEmitter.on(populousEvents.canceledAuction, (invoice, userId) => {
  const user = User.findOne(userId);

  if (user) {
    const message = `<div>Auction for the invoices <span class="blue">${invoice.invoiceNumber}</span> has been canceled. `+
      `${user._id !== invoice.borrowerId ? 'Your bid was returned to you.' : ''}</div>`;
    createNotification(user, message, populousEvents.canceledAuction, invoice._id);
  }
});

PopulousEmitter.on(populousEvents.closedAuction, ({invoice, userId}) => {
  const user = User.findOne(userId);

  if (user) {
    const message = user._id !== invoice.borrowerId ?
      `<div>Auction for the invoices <span class="blue">${invoice.invoiceNumber}</span> has been closed. `+
      `The Goal sale price was not reached and the seller will now decide whether to accept the best bid, relist the invoice or terminate the auction.`+
      `</br> There is a 5 hour period from time of when the auction is closed to allow the invoice seller to make the decision.`+
      `In the event the 5 hour period elapses without a decision made, the invoice will automatically be terminated.`
      :
      `Auction for the invoices <span class="blue">${invoice.invoiceNumber}</span> has been closed. The Goal sale price was not reached.`;
    createNotification(user, message, populousEvents.closedAuction, invoice._id);
  }
});

PopulousEmitter.on(populousEvents.invoiceWinner, (invoice, userId) => {
  const user = User.findOne(userId);

  if (user) {
    const message = `<div>You are the winner in auction for the invoice <span class="blue">${invoice.invoiceNumber}</span> ! Invoice was succesfully financed.</div>`;
    createNotification(user, message, populousEvents.invoiceWinner, invoice._id);
  }
});

PopulousEmitter.on(populousEvents.invoiceSuccessfulClosed, (invoice) => {
  const user = User.findOne(invoice.borrowerId);

  if (user) {
    const message = `<div>Invoice <span class="blue">${invoice.invoiceNumber}</span> was succesfully financed.</div>`;
    createNotification(user, message, populousEvents.invoiceSuccessfulClosed, invoice._id);
  }
});

PopulousEmitter.on(populousEvents.unsuccessfulBids, (invoice, userId) => {
  const user = User.findOne(userId);

  if (user) {
    const message = `<div>Your bid for invoice <span class="blue">${invoice.invoiceNumber}</span> was unsuccessful. Your bid was returned to you.</div>`;
    createNotification(user, message, populousEvents.unsuccessfulBids, invoice._id);
  }
});

PopulousEmitter.on(populousEvents.beatBid, (invoice, userId, isGroup, isAnonymous = false, competitor = null) => {
  const user = User.findOne(userId);

  if (user) {
    const message = isGroup ?
      `<div>Group with higher goal bid was created in auction for the invoice <span class="blue">${invoice.invoiceNumber}</span> .</div>`
      :
      `<div>${isAnonymous ? 'Anonymous' : competitor ? competitor.fullName() : ''} beat you in auction for the invoice `+
      `<span class="blue">${invoice.invoiceNumber}</span> .`;
    createNotification(user, message, populousEvents.beatBid, invoice._id);
  }
});

PopulousEmitter.on(populousEvents.dueDate, ({invoice, userId, message}) => {
  const user = User.findOne(userId);

  if (user) {
    createNotification(user, message, populousEvents.dueDate, invoice._id);
  }
});

PopulousEmitter.on(populousEvents.repayment, (invoice, userId, isPartial) => {
  const user = User.findOne(userId);

  if (user) {
    const message = isPartial ?
      `Partial payment of invoice ${invoice.invoiceNumber} was successful`
      :
      `Payment on invoice ${invoice.invoiceNumber} was successful`;
    createNotification(user, message, populousEvents.repayment, invoice._id);
  }
});

PopulousEmitter.on(populousEvents.withdrawalToBankAccountConfirmation, (request, userId) => {
  const user = User.findOne(userId);

  if (user) {
    const message = `Withdrawal ${request._id} confirmation`;
    createNotification(user, message, populousEvents.withdrawalToBankAccountConfirmation, request._id);
  }
});

PopulousEmitter.on(populousEvents.updateExternalAddress, (wallet, isUpdate) => {
  const user = User.findOne(wallet.userId);

  if (user) {
    const message = isUpdate ?
      `<div>You've requested a wallet update. Your wallet address ${wallet.address} will change to ${wallet.newAddress} after 48 hrs.</div>`
      :
      `<div>You have added an external wallet ${wallet.newAddress}. This new address will be available for use after 48 hrs.</div>`;
    createNotification(user, message, populousEvents.updateExternalAddress, wallet._id);
  }
});

PopulousEmitter.on(populousEvents.changesProfile, (userId) => {
  const user = User.findOne(userId);

  if (user) {
    const message = `<div>Your profile has been updated.</div>`;
    createNotification(user, message, populousEvents.changesProfile, userId);
  }
});

/**
 * params:{
 *   wallet,
 *   pptAmount,
 *   ledger,
 *   currencyAmount
 * }
 */

PopulousEmitter.on(populousEvents.pptDeposited, ({wallet}) => {
  const user = User.findOne(wallet.userId);

  if (user) {
    const message = `<div>PPT successfully exchanged for Pokens.</div>`;
    createNotification(user, message, populousEvents.pptDeposited, wallet._id);
  }
});
