import {pptMultiplier} from '../constants';
import callToClient from "../helpers/callToClient";
import {sendToClient} from '../helpers/sendToClient';
import contracts from "../../config/contract";
import connectInstance from "../../connectInstance";

export default {

  // createAddress(connect, contract, from,
  //               clientId, blockchainActionId) {
  //   const contractInstance = new connect.eth.Contract(contract.abi, contract.address);
  //   const params = {
  //     dataManager: contracts.dataManager.address,
  //     blockchainActionId: connect.utils.asciiToHex(blockchainActionId),
  //     clientId: connect.utils.asciiToHex(clientId),
  //   };

  //   return contract.transaction.gasLimit(connect)
  //     .then(() => {
  //       const encodedABI = contractInstance.methods
  //         .createAddress(...Object.values(params))
  //         .encodeABI();

  //       return sendToClient(encodedABI, connect, from, blockchainActionId, contract.address);
  //     })
  // },

  getVersion(connect, contract){
    const contractInstance = new connectInstance.eth.Contract(contract.abi, contract.address);

    const abi = contractInstance.methods
      .getVersion()
      .encodeABI();

    return callToClient(connectInstance, contract.address, abi)
      .then(result => Number(result));
  },

  getClientId: (connect, contract) => {
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);

    const abi =  contractInstance.methods
      .getClientId()
      .encodeABI();

    return callToClient(connect, contract.address, abi);
  },
};
