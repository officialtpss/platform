import {platformActionStatuses, populousEvents} from 'meteor/populous:constants';

import PopulousEmitter from "../../../../server/PopulousEmitter";
import Invoice from "../../../invoices/model";


export default async function startAuction(action) {
  if(action.status === platformActionStatuses.completed){
    return;
  }

  const invoice = await Invoice.findOne(action.data.invoiceId);
  let status;

  if (action.status === platformActionStatuses.new) {
    status = platformActionStatuses.pending;
    PopulousEmitter.emit(populousEvents.auctionWillStartSoon, invoice, 15, 'Min');
  } else if (action.status === platformActionStatuses.pending) {

    try {
      await invoice.start(action);
      status = platformActionStatuses.completed;
    } catch (error) {
      action.error = `${error}`
      status = platformActionStatuses.failed;
    }
  }

  action.status = status;
  await action.save();
}
