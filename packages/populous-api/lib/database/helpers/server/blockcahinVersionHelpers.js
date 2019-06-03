import {Meteor} from "meteor/meteor";
import ethConnect from 'meteor/populous:eth-connect';
import connectInstance from "../../../server/connectInstance";

export function getWalletVersion() {
  return Number(process.env.WALLET_VERSION);
}

export function getBlockchainVersion() {
  return 1;
}

export async function validateWallets(collection) {
  const blockchainVersion = getWalletVersion();
  const outdatedWallets = await collection
    .find({
      $or: [
        {version: {$exists: false},},
        {version: {$lte: blockchainVersion},},
      ]
    }).fetch();
  return outdatedWallets
}

blockcahinVersionHelpers = {
  getWalletVersion,
  getBlockchainVersion,
  validateWallets,
}


export default blockcahinVersionHelpers;
