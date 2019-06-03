import blockchainDataService from "../../blockchainDataService";
import contracts from "../../config/contract";

export default {
  balanceOfForTUSD(ownerAddress, divideByPrecision) {
    return blockchainDataService.getTokensBalance(contracts.TUSDToken.address, ownerAddress, divideByPrecision);
  },
};
