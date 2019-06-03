import { Meteor } from 'meteor/meteor';

import BlockchainLog from "../model";
import User from "../../accounts/model";
import { Config, configKeys } from 'meteor/populous:config';
import checkAuth from "../../helpers/checkAuth";


const blockchainConfigValue = {
  gasPrice: 0,
  gasLimit: 0,
};

const blockchainInitialConfig = {
  key: configKeys.blockchain,
  value: {...blockchainConfigValue}
};

BlockchainLog.extend({
  meteorMethods: {
    updateBlockchain(data) {
      const userId = checkAuth();
      const user = User.findOne(userId);
      if (!user.isAdmin()) {
        throw new Meteor.Error(403, 'Access forbidden');
      }

      const gasPrice = Number.parseInt(data.gasPrice);

      if (!gasPrice || gasPrice <= 0 ) {
        throw new Meteor.Error(400, 'Gas Price should be valid number');
      }
      const blockchainLog = new BlockchainLog({
        userId: Meteor.userId(),
        data
      });

      blockchainLog.save();

      const blockchainConfig = Config.findOne({ 'key': configKeys.blockchain })
        || new Config({...blockchainInitialConfig});

      blockchainConfig.value = { ...blockchainConfig.value, gasPrice};

      blockchainConfig.save();
    },

    updateBlockchainSignerKey(signerKey) {
      const userId = checkAuth();
      const user = User.findOne(userId);
      if (!user.isAdmin()) {
        throw new Meteor.Error(403, 'Access forbidden');
      }
      if (!signerKey) {
        throw new Meteor.Error(400, 'Security signer key is required!');
      }
      const blockchainLog = new BlockchainLog({
        userId: Meteor.userId(),
        data: {
          securitySignerKey: signerKey,
        }
      });

      blockchainLog.save();

      const blockchainConfig = Config.findOne({ 'key': configKeys.blockchain })
        || new Config({...blockchainInitialConfig});


      blockchainConfig.value.securitySignerKey = signerKey;

      blockchainConfig.save();
    },

    create(gasPrice, gasLimit) {
      this.gasPrice = Number(gasPrice);
      this.gasLimit = Number(gasLimit);
      this.userId = Meteor.userId();
      this.save();
    }
  }
});
