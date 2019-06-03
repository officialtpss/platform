import {Meteor} from "meteor/meteor";
import {DDP} from "meteor/ddp-client";
import {populousEvents} from 'meteor/populous:constants';

import ActivityLog from "../model";
import PopulousEmitter from "../../../server/PopulousEmitter";


const createLog = (type, userId, data) => {
  ActivityLog.insert({
    type,
    userId,
    data,
  });
};

PopulousEmitter.on(populousEvents.loginSuccess, (userAgent) => {
  const {connection:{clientAddress, httpHeaders}, userId} = DDP._CurrentInvocation.get();

  let ip = clientAddress;

  if(httpHeaders['x-forwarded-for']){
    ip = httpHeaders['x-forwarded-for'].split(',').shift() || clientAddress;
  }

  createLog(
    populousEvents.loginSuccess,
    userId,
    {
      ip,
      userAgent,
    }
  );
});

PopulousEmitter.on(populousEvents.bidPlaced, (bid, invoice) => {
  createLog(
    populousEvents.bidPlaced,
    bid.userId,
    {
      bid,
      invoice,
    },
  );
});

PopulousEmitter.on(populousEvents.bidIncreased, (bid, userId, amount,) => {
  createLog(
    populousEvents.bidIncreased,
    userId,
    {
      bid,
      amount,
    },
  );
});

PopulousEmitter.on(populousEvents.bidJoined, (bid, userId, amount) => {
  createLog(
    populousEvents.bidJoined,
    userId,
    {
      bid,
      amount,
    },
  );
});

PopulousEmitter.on(populousEvents.invoiceWinner, (invoice, userId) => {
  createLog(
    populousEvents.invoiceWinner,
    userId,
    {
      invoice,
    }
  );
});

PopulousEmitter.on(populousEvents.authReset, (userId, requestId) => {
  createLog(
    populousEvents.authReset,
    userId,
    {requestId}
  );
});

PopulousEmitter.on(populousEvents.pptWithdraw, (userId, wallet, amount, externalAddress) => {
  createLog(
    populousEvents.pptWithdraw,
    userId,
    {
      wallet,
      amount,
      externalAddress,
    }
  );
});

/**
 * params:{
 *   wallet,
 *   pptAmount,
 *   ledger,
 *   currencyAmount
 * }
 */

PopulousEmitter.on(populousEvents.pptDeposited, (params) => {
  createLog(
    populousEvents.pptDeposited,
    params.wallet.userId,
    params,
  );
});

/**
 * params: {
 *   ledger,
 *   pokensReturnedAmount,
 *   wallet,
 *   pptReturnedAmount
 * }
 */

PopulousEmitter.on(populousEvents.pptReturned, (userId, data) => {
  createLog(
    populousEvents.pptReturned,
    userId,
    data
  );
});

PopulousEmitter.on(populousEvents.pptBalanceIncreased, (userId, wallet, newBalance) => {
  createLog(
    populousEvents.pptBalanceIncreased,
    userId,
    {
      wallet,
      newBalance,
    }
  );
});

PopulousEmitter.on(populousEvents.pptBalanceDecreased, (userId, wallet, newBalance) => {
  createLog(
    populousEvents.pptBalanceDecreased,
    userId,
    {
      wallet,
      newBalance,
    }
  );
});

/**
 * Params
 * {
 *   ledger,
 *   withdrawAmount,
 *   fee,
 *   toBank,
 *   bankId, - only for withdraw to banks
 *   feeCurrency, - only for withdraw to banks
 *   address - only for withdraw to external address
 * }
 */

PopulousEmitter.on(populousEvents.pokenWithdraw, (userId, params) => {
  createLog(
    populousEvents.pokenWithdraw,
    userId,
    params
  );
});

