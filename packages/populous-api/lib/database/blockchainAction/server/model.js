import ethConnect from 'meteor/populous:eth-connect';
import {requestTypes, blockchainActionTypes} from 'meteor/populous:constants';

import BlockchainAction from '../model';
import Request from '../../requests/model';
import checkAuth from "../../helpers/checkAuth";
import connectInstance from "../../../server/connectInstance";
import {getBlockchainVersion} from "../../helpers/server/blockcahinVersionHelpers";


BlockchainAction.extend({
  meteorMethods: {
    async checkActionStatus(id) {
      checkAuth();
      const {
        config: {
          contract: {dataManager},
        },
        contracts: {dataManager: {getActionStatus}},
      } = ethConnect;

      const blockchainAction = await BlockchainAction.findOne(id);
      const result = {};
      if (blockchainAction) {
        result.status = await getActionStatus(connectInstance, dataManager, id);

        const blockchainError = await Request.findOne({
          dataId: id,
          type: requestTypes.blockchainError,
        });
        result.error = blockchainError ? blockchainError.error : null
      } else {
        result.error = 'This entry does not exist';
      }

      return result;
    },
  },
  events: {
    beforeSave(e) {
      const doc = e.target;
      if(BlockchainAction.isNew(doc) && !doc.version){
        doc.version = getBlockchainVersion();
      }
    }
  },
});
