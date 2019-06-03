import { publishComposite } from 'meteor/reywood:publish-composite';

import BlockchainLog from '../model';
import User from "../../accounts/model";

publishComposite('blockchainLog.user', (userId) => {
  return {
    find() {
      return BlockchainLog.find({userId});
    },
    children: [
      {
        find({userId}){
          User.find({_id: userId});
        }
      },
    ],
  }
});


publishComposite('blockchainLog.all', () => {
  return {
    find() {
      return BlockchainLog.find({});
    },
    children: [
      {
        find({userId}){
          User.find({_id: userId});
        }
      },
    ],
  }
});