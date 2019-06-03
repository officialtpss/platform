import { Meteor } from 'meteor/meteor';
import ethConnect from 'meteor/populous:eth-connect';
import connectInstance from "../../../server/connectInstance";

Meteor.methods({
  // Get populous balance (XAUp)
  async 'populous.balanceOf'() {
    const {
      config: {
        network: {ropsten},
        contract: {ERC1155},
      },
      contracts: {ERC1155: {balanceOf}},
    } = ethConnect;

    try {
      const result = await balanceOf(connectInstance, ERC1155, {XAUP_TOKENID: process.env.XAUP_TOKENID, address: process.env.ETH_ADDRESS});
      return Number(result);
    } catch (error) {
      return 0;
    }
  },
});
