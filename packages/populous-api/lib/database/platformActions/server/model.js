import moment from 'moment';
import {requestTypes, blockchainActionTypes} from 'meteor/populous:constants';
import {platformActionTypes, platformActionStatuses} from 'meteor/populous:constants';

import PlatformAction from '../model';
import startAuction from "./processingMethods/startAuction";
import exchangePPTForPoken from "./processingMethods/exchangePPTForPoken";
import refundPPT from "./processingMethods/refundPPT";


const typeToProcessingMethod = {
  [platformActionTypes.startAuction]: startAuction,
  [platformActionTypes.PPTtoGBPp]: exchangePPTForPoken,
  [platformActionTypes.GBPptoPPT]: refundPPT,
};


async function processing(){
  const actions = await PlatformAction.find({
    $or:[
      {status: platformActionStatuses.new},
      {
        status: platformActionStatuses.pending,
        type: platformActionTypes.startAuction,
        createdAt: {$lte: moment().subtract(15, 'minutes').toDate()}
      }
    ]
  }).fetch();

  for(let i = 0; i< actions.length; i++){
    const action = actions[i];

    if(typeToProcessingMethod[action.type]){
      await typeToProcessingMethod[action.type](action);
    }
  }

  setTimeout(processing, 500);
}

PlatformAction.extend({
  meteorMethods: {
    startJob(){
       processing();
    }
  },
});
