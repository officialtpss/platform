import {Meteor} from 'meteor/meteor';
import {Config, configKeys} from 'meteor/populous:config';
import {blockchainDefaultConfig} from 'meteor/populous:constants';
import axios from 'axios';
import https from 'https';
import CryptoJS from 'crypto-js';

import transaction from '../../methods/transaction';
import blockchainDataService from "../../blockchainDataService";


const apiInstanceClient = axios.create({
  baseURL: process.env.SIGN_CLIENT_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
});


export async function sendToClient(encodedABI, connect, fromInput, blockchainActionId, to = null) {
  const config = await Config.findOne({key: configKeys.blockchain});
  let nextNonce, from;

  const getNonce = async () => {
    try {
      return await  transaction.getNextNonce(connect, from);
    } catch (error) {
      console.log('nextNonce error:', error);
    }
  };

  // Is params come from blockchain cron
  const fromInputIsObject = typeof fromInput !== 'string';

  if (!fromInputIsObject) {
    from = fromInput;
    nextNonce = await getNonce();
  } else {
    from = fromInput.from;

    if (!fromInput.nonce) {
      nextNonce = await getNonce()
    } else {
      nextNonce = fromInput.nonce;
    }
  }

  const requestData = {
    params: {
      gasPrice: config ? '0x' + Number(config.value.gasPrice).toString(16) : '0x' + blockchainDefaultConfig.gasPrice.toString(16),
      gasLimit: await blockchainDataService.getGasLimit(),
      nonce: nextNonce,
      value: '0x0',
      to: to,
      data: encodedABI,
      from,
    },
    actionId: blockchainActionId
  };

  if (!requestData.params.to) {
    delete requestData.params.to;
  }

  console.log('TX data before sign client >>>>>>', requestData);
  let buff = new Buffer(`populous:${CryptoJS.HmacSHA512(JSON.stringify(requestData), config.value.securitySignerKey).toString()}`);
  let base64data = buff.toString('base64');

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + base64data
    }
  };

  const {data} = await apiInstanceClient.post('/auth/sign_tx', requestData, headers);

  if (data.success) {
    try {
      await blockchainDataService.sendTx('0x' + data.data.toString('hex'));
    } catch (dataServiceError) {
      // console.log('ERROR on Data Service', dataServiceError);
      console.log('ERROR on Data Service', dataServiceError.message);
      Meteor.call('request.saveBlockchainError', blockchainActionId, dataServiceError.message);

      if (fromInputIsObject) {
        throw new Error(dataServiceError);
      }
    }
  } else {
    console.log('ERROR on Client', data.message);
    Meteor.call('request.saveBlockchainError', blockchainActionId, data.message);
    if (fromInputIsObject) {
      throw new Error(data.message);
    }
  }
}
