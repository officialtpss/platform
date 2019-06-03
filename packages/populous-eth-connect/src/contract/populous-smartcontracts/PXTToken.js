import {tokenPrecision} from 'meteor/populous:constants';

import blockchainDataService from "../../blockchainDataService";
import contracts from "../../config/contract";

export default {
  balanceOfForPXT(ownerAddress) {
    return blockchainDataService.getTokensBalance(contracts.PXTToken.address, ownerAddress, tokenPrecision.PXTToken);
  },
};
