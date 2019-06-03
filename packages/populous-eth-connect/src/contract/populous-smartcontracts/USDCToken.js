import blockchainDataService from "../../blockchainDataService";
import contracts from "../../config/contract";

export default {
  balanceOfForUSDC(ownerAddress, divideByPrecision) {
    return blockchainDataService.getTokensBalance(contracts.USDCToken.address, ownerAddress, divideByPrecision);
  },
};
