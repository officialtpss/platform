import axios from "axios/index";

import {pptMultiplier} from "./contract/constants";


let nonceType = process.env.blockchainDataServiceNonceType;
const availableNonceTypes = ['current', 'next',];

if (!availableNonceTypes.includes(nonceType)) {
  nonceType = availableNonceTypes[0];
}

const blockchainDataService = axios.create({
  baseURL: process.env.blockchainDataServiceUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

blockchainDataService.interceptors.response.use(
  response => response,
  error => {
    console.log('Data service error:', error.message, error.request.path);
    return Promise.reject(error);
  });

blockchainDataService.sendTx = function (signedHex) {
  return this
    .get(`/blockchain/sendtx/${signedHex}`);
};

blockchainDataService.call = function (contractAddress, encodedAbi) {
  return this
    .get(`/blockchain/call/${contractAddress}/${encodedAbi}`)
    .then(({data : {result}}) => result);
};

blockchainDataService.getNonce = function (address) {
  return this
    .get(`/blockchain/nonce/${address}`)
    .then((response) => response.data.nonce[nonceType]);
};

blockchainDataService.getGasLimit = function () {
  return this
    .get('/blockchain/gaslimit')
    .then((response) => response.data.gasLimit);
};

blockchainDataService.getTokensBalance = function (tokenAddress, userAddress, multiplier=1) {
  return this
    .get(`/blockchain/balance/${tokenAddress}/${userAddress}`)
    .then(result => Number(result.data.balance.token) / multiplier);
};

blockchainDataService.getEthBalance = function (tokenAddress, userAddress) {
  return this
    .get(`/blockchain/balance/${tokenAddress}/${userAddress}`)
    .then(result => Number(result.data.balance.ether) / pptMultiplier);
};

blockchainDataService.getEvents = function (contractName, contractAddress, blockNumber) {
  return this
    .get(`/blockchain/event/${contractName}/${contractAddress}/${blockNumber}`)
};

export default blockchainDataService;
