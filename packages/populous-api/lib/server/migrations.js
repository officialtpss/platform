import { Meteor } from 'meteor/meteor';
import { Migrations } from 'meteor/percolate:migrations';
import {Config, configKeys} from 'meteor/populous:config';
import User from '../database/accounts/model';
import Invoice from '../database/invoices/model';
import Wallet from '../database/wallet/model';
import LedgerBalance from "../database/ledger_balance/model";
import BlockchainAction from '../database/blockchainAction/model';
import { blockchainActionTypes } from 'meteor/populous:constants';

Migrations.add({
  version: 1,
  name: 'Fix for users KYC declined reason',
  up: () => {
    User.find({KYCDeclinedReason: {
      $exists: true,
      $not: {$type: 'object'}
    }})
      .forEach((doc) => {
      if (doc.KYCDeclinedReason) {
        User.update(
          {_id: doc._id},
          {$set: {KYCDeclinedReason: [doc.KYCDeclinedReason]}}
        );
      } else {
        delete doc.KYCDeclinedReason;
        doc.save();
      }
      });
  }
});

Migrations.add({
  version: 3,
  name: 'Fix for invoices returnPercentage value',
  up: () => {
    Invoice.find({returnPercentage: {
        $exists:false,
      }})
      .forEach((doc) => {
        doc.updateReturnPercentage();
      });
  },
  down: () =>{
    Invoice.update(
      {
        returnPercentage: {
          $exists: true,
        }
      },
      {$unset: {returnPercentage: 1}},
      {multi: true}
    );
  }
});


Migrations.add({
  version: 4,
  name: 'Fix for blockchain config separation',
  up: () => {
    const currentBlockchainConfig = Config.findOne({key: configKeys.blockchain,});
    const currentBlockchainLatestBlockNumber = Config.findOne({key: configKeys.latestBlockNumber,});

    if (currentBlockchainConfig) {
      if (!currentBlockchainLatestBlockNumber) {
        Config.insert({
          key: configKeys.latestBlockNumber,
          value: {
            lastPopulousBlockNumber: currentBlockchainConfig.value.lastPopulousBlockNumber,
          },
        });
      } else {
        currentBlockchainLatestBlockNumber.value.lastPopulousBlockNumber = currentBlockchainConfig.value.lastPopulousBlockNumber;
        currentBlockchainLatestBlockNumber.save();
      }
    }
  },
  down: () => {
    const currentBlockchainConfig = Config.findOne({key: configKeys.blockchain,});
    const currentBlockchainLatestBlockNumber = Config.findOne({key: configKeys.latestBlockNumber,});

    if (currentBlockchainConfig && currentBlockchainLatestBlockNumber) {
      currentBlockchainConfig.value.latestBlockNumber = currentBlockchainLatestBlockNumber.value.latestBlockNumber;

      currentBlockchainConfig.save();
      currentBlockchainLatestBlockNumber.remove();
    }

  }
});

Migrations.add({
  version: 5,
  name: 'Fix for blockchain config separation',
  up: () => {
    LedgerBalance.schema.collection.update(
      {pendingAmount: {$exists: true}},
      {$rename: {pendingAmount: 'externalWalletAmount'}},
      {multi: true}
    );
  },
  down: () => {
    LedgerBalance.schema.collection.update(
      {externalWalletAmount: {$exists: true}},
      {$rename: {externalWalletAmount: 'pendingAmount'}},
      {multi: true}
    );
  }
});

Migrations.add({
  version: 6,
  name: 'Update wallet balanceXaup format',
  up: () => {
    Wallet.schema.collection.find({balanceXAU: {
      $type: 'number',
    }})
    .forEach(async (doc) => {
      if (typeof doc.balanceXAU === 'number') {
        await Wallet.schema.collection.update({_id: doc._id}, {$set: {balanceXAU: [{amount: doc.balanceXAU, xaup_id: 1}]}})
      }
    });
  },
  down: () => {
    Wallet.schema.collection.find({balanceXAU: {
      $type: 'array',
    }})
    .forEach(async (doc) => {
      if (typeof doc.balanceXAU === 'object') {
        let balanceXAU = 0
        if (doc.balanceXAU.length > 0) {
          balanceXAU = doc.balanceXAU[0].amount
        }
        await Wallet.schema.collection.update({_id: doc._id}, {$set: {balanceXAU: balanceXAU}})
      }
    });
  }
});

Migrations.add({
  version: 7,
  name: 'Add xaup_id to blockchain Actions',
  up: () => {
    BlockchainAction.schema.collection.update({type: blockchainActionTypes.withdraw, title: 'XAUp', xaup_id: {$exists: false}}, {$set: {xaup_id: 1}}, {multi: true})
  },
  down: () => {
    BlockchainAction.schema.collection.update({xaup_id: {$exists: true}}, {$unset: {xaup_id: 1}}, {multi: true})
  }
});

Meteor.startup(function () {
  // Migrations.unlock();
  Migrations.migrateTo('latest');
});
