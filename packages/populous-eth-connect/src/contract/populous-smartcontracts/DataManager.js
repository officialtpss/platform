import callToClient from "../helpers/callToClient";
import {sendToClient} from "../helpers/sendToClient";
import connectInstance from "../../connectInstance";
import contracts from "../../config/contract";

const {dataManager} = contracts;

const removeRedundantZerosFromAddress = (addressString) => {
  if(Number(addressString) === 0){
    return false;
  }

  if(addressString.length === 66){
    return addressString.slice(0,2) + addressString.slice(26, 66);
  }
  return addressString
};

export default {

  getDepositAddress: (clientId) => {
    const contractInstance = new connectInstance.eth.Contract(dataManager.abi, dataManager.address);

    const params = {
      clientId: connectInstance.utils.asciiToHex(clientId),
    };

    const abi =  contractInstance.methods
      .getDepositAddress(...Object.values(params))
      .encodeABI();

    return callToClient(connectInstance, dataManager.address, abi)
      .then(removeRedundantZerosFromAddress);
  },

  _setDepositAddress: (connect, contract, from,
                       blockchainActionId, userId, address) => {
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);
    const params = {
      blockchainActionId: connect.utils.asciiToHex(blockchainActionId),
      userId: connect.utils.asciiToHex(userId),
      address
    };

    return contract.transaction.gasLimit(connect)
      .then(() => {
        const encodedABI = contractInstance.methods
          ._setDepositAddress(...Object.values(params))
          .encodeABI();

        return sendToClient(encodedABI, connect, from, blockchainActionId, contract.address);
      });
  },

  getClientIdWithDepositAddress: (connect, contract, depositAddress) => {
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);

    const params = {
      depositAddress,
    };

    const abi =  contractInstance.methods
      .getClientIdWithDepositAddress(...Object.values(params))
      .encodeABI();

    return callToClient(connect, contract.address, abi);
  },

  getCurrency: (currency) => {
    const contractInstance = new connectInstance.eth.Contract(dataManager.abi, dataManager.address);
    const params = {
      currency: connectInstance.utils.asciiToHex(currency),
    };
    const encodeABI = contractInstance.methods
      .getCurrency(...Object.values(params))
      .encodeABI();

    return callToClient(undefined, dataManager.address, encodeABI)
      .then(removeRedundantZerosFromAddress);
  },

  _setCurrency: (connect, contract, from,
                       blockchainActionId, currencyAddress, currencySymbol) => {
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);
    const params = {
      blockchainActionId: connect.utils.asciiToHex(blockchainActionId),
      currencyAddress,
      currencySymbol: connect.utils.asciiToHex(currencySymbol),
    };

    return contract.transaction.gasLimit(connect)
      .then(() => {
        const encodedABI = contractInstance.methods
          ._setCurrency(...Object.values(params))
          .encodeABI();

        return sendToClient(encodedABI, connect, from, blockchainActionId, contract.address);
      });
  },

  getCurrencySymbol: (connect, contract, currency) => {
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);
    const params = {
      currency: currency,
    };
    const abi = contractInstance.methods.getCurrencySymbol(...Object.values(params))
      .encodeABI();

    return callToClient(connect, contract.address, abi)
      .then((result) => connect.utils.hexToAscii(result));
  },

  getActionStatus: (connect, contract, blockchainActionId) => {
    const contractInstance = new connect.eth.Contract(contract.abi, contract.address);

    const params = {
      blockchainActionId: connect.utils.asciiToHex(blockchainActionId),
    };

    const abi = contractInstance.methods
      .getActionStatus(...Object.values(params))
      .encodeABI();

    return callToClient(connect, contract.address, abi).then((result) => !!Number(result));
  },

  getInvoice:
    (connect, contract,
     invoiceCountryCode, invoiceCompanyNumber, invoiceNumber) => {
      const contractInstance = new connect.eth.Contract(contract.abi, contract.address);

      const params = {
        invoiceCountryCode: connect.utils.asciiToHex(invoiceCountryCode),
        invoiceCompanyNumber: connect.utils.asciiToHex(invoiceCompanyNumber),
        invoiceNumber: connect.utils.asciiToHex(invoiceNumber),
      };

      const abi = contractInstance.methods
        .getInvoice(...Object.values(params))
        .encodeABI();

      return callToClient(connect, contract.address, abi);
    },

  getProviderByCountryCodeCompanyNumber:
    (connect, contract,
     providerCountryCode, providerCompanyNumber,) => {
      const contractInstance = new connect.eth.Contract(contract.abi, contract.address);

      const params = {
        providerCountryCode: connect.utils.asciiToHex(providerCountryCode),
        providerCompanyNumber: connect.utils.asciiToHex(providerCompanyNumber),
      };

      const abi = contractInstance.methods
        .getProviderByCountryCodeCompanyNumber(...Object.values(params))
        .encodeABI();

      return callToClient(connect, contract.address, abi);
    },

  getProviderByUserId:
    (connect, contract,
     providerUserId,) => {
      const contractInstance = new connect.eth.Contract(contract.abi, contract.address);

      const params = {
        providerUserId: connect.utils.asciiToHex(providerUserId),
      };

      const abi = contractInstance.methods
        .getProviderByUserId(...Object.values(params))
        .encodeABI();

      return callToClient(connect, contract.address, abi);
    },

  getVersion(connect, contract,){
    const contractInstance = new connectInstance.eth.Contract(contract.abi, contract.address);

    const abi = contractInstance.methods
      .getVersion()
      .encodeABI();

    return callToClient(connectInstance, contract.address, abi)
      .then(result => Number(result));
  }
}
