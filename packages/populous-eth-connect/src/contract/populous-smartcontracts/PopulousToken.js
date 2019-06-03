import { pptMultiplier } from "../constants";
import callToClient from "../helpers/callToClient";

export default {
  faucet(connect, contract, from, amount) {
    const preparedParams = {
      amount,
    };

    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);

    return contract.transaction.gasLimit(connect)
      .then(limit =>
        contractInstance.methods.faucet(...Object.values(preparedParams))
          .send({
            from,
            gas: limit,
          })
      );
  },

  transferToAddress(connect, contract, from, depositAddress, faucetAmount) {
    const preparedParams = {
      depositAddress,
      faucetAmount,
    };

    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);

    return contract.transaction.gasLimit(connect)
      .then(limit =>
        contractInstance.methods.transferToAddress(...Object.values(preparedParams))
          .send({
            from,
            gas: limit,
          })
      );
  },

  balanceOf(connect, contract, from, ownerAddress) {
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);

    const abi =  contractInstance.methods.balanceOf(ownerAddress).encodeABI();

    return callToClient(connect, contract.address, abi)
      .then((result) => {
        return Number(result)/pptMultiplier
      });
  },

};
