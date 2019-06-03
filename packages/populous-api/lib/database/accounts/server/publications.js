import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
import { statuses } from 'meteor/populous:constants';

import File from '../../files/model';
import EthId from "../../eth_ids/model";
import Wallet from "../../wallet/model";
import { Config } from 'meteor/populous:config';
import DepositLog from "../../deposit_log/model";
import LedgerLog from "../../ledger_log/model";
import BlockchainAction from "../../blockchainAction/model";

// Publish all user data
Meteor.publish('accounts.all', function() {
  return Meteor.users.find(
    {},
    {
      fields: {
        services: 0, // Dont publish passwords
      }
    }
  );
});


// Publish all of the users with KYCStatus pending
Meteor.publish('accounts.pending', function() {
  return Meteor.users.find(
    { KYCStatus: statuses.pending },
    {
      fields: {

        // Only publish the required fields
        firstName: 1,
        lastName: 1,
        companyName: 1,
        role: 1,
        updatedAt: 1,
        KYCStatus: 1
      }
    }
  );
});

// Publish the data for the current user
publishComposite('accounts.user', function(_id) {
  return {
    find() {
      return Meteor
        .users.find(
          {_id},
          {
            fields: {
              services: 0, // Dont publish passwords
            }
          }
        );
    },
    children: [
      {
        find(user){
          return EthId.find({userId: user._id});
        }
      },
      {
        find(user){
          return Wallet.find({userId: user._id});
        }
      },
      {
        find(user){
          return Config.find({public: true});
        }
      },
      {
        find(user){
          return DepositLog.find({userId: user._id});
        }
      },
      {
        find(user) {
          return BlockchainAction.find({ userId: user._id });
        }
      },
      {
        find(user){
          return LedgerLog.find({$or: [
            {fromUserId: user._id},
            {toUserId: user._id},
          ]});
        }
      },
      {
        find(user){
          const { twoFAKeyIDFiles = [], avatarId } = user;
          const files = twoFAKeyIDFiles.concat([avatarId]);
          return File.find(
            { _id: { $in: files } },
            {
              fields: {
                userId: 0,
              }
            }
          ).cursor;
        }
      },
    ]
  }
});

// Publish the data for a single user and it's KYC files
publishComposite('accounts.user-kyc', function(_id) {
  const query = {_id};

  if(Array.isArray(_id)){
    query['_id'] = {$in: _id}
  }

  return {
    find() {
      return Meteor.users.find(
        query,
        {
          fields: {
            services: 0, // Dont publish passwords
          }
        }
      );
    },
    children: [
      {
        find(user) {
          const { bankStatementDocumentIds = [], idDocumentIds = [], addressDocumentIds = [], livePhotoIds = [] } = user;
          const files = bankStatementDocumentIds.concat(idDocumentIds, livePhotoIds, addressDocumentIds);

          // Find the files for this users KYC documents.
          return File.find(
            { _id: { $in: files } },
            {
              fields: {
                userId: 0, // no need to pub the user id
              }
            }
          ).cursor;
        }
      },
    ]
  }
});
