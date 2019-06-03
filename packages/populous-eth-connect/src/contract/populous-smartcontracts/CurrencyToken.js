import {tokenPrecision} from 'meteor/populous:constants';
import {errorHandler} from "../helpers/errorHandler";
import blockchainDataService from "../../blockchainDataService";

export default {

  transferToContract(connect, contract, from, toAddress, amount, investorId) {
    const preparedParams = {
      toAddress,
      amount,
      investorId: connect.utils.asciiToHex(investorId),
    };

    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);

    return contract.transaction.gasLimit(connect)
      .then(gas =>
        contractInstance.methods
          .transferToContract(...Object.values(preparedParams))
          .send({
            from,
            gas,
          })
      )
      .then(errorHandler);
  },

  balanceOf(connect, contract, from, ownerAddress) {
    return blockchainDataService.getTokensBalance(contract.address, ownerAddress, tokenPrecision.PopulousToken);
  },

  balanceOfForEth(tokenAddress, ownerAddress) {
    return blockchainDataService.getEthBalance(tokenAddress, ownerAddress);
  },
};
