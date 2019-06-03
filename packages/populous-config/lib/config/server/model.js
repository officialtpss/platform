import Config from '../model';
import configKeys from '../configKeys';
import CryptoJS from 'crypto-js';

Config.extend({
  meteorMethods: {
    getBlockchainConfig() {
      const blockchainConfig = Config.findOne({key: configKeys.blockchain});
      if (blockchainConfig && blockchainConfig.value.securitySignerKey) {
        blockchainConfig.value.securitySignerKey = CryptoJS.SHA256(blockchainConfig.value.securitySignerKey).toString(CryptoJS.enc.Hex);
      }

      return blockchainConfig;
    }
  },
  saveOrUpdateZohoTokens(tokensObj){

    const zohoConfig = Config.findOne({key: configKeys.zohoTokens})
      || new Config({
        key: configKeys.zohoTokens,
        value: {},
        public: false,
      });

    zohoConfig.value = tokensObj;
    zohoConfig.save();
  },
});

(async () => {
  const blockchainConfig = await Config.findOne({
    key: configKeys.blockchain,
  });

  if(!blockchainConfig){
    await (new Config({
      key: configKeys.blockchain,
      value: {
        gasPrice : Number(process.env.blockchainGasPrice),
        gasLimit : Number(process.env.blockchainGasLimit),
        securitySignerKey : process.env.blockchainSecuritySignerKey,
      },
      public: true,
    })).save();
  }

  const blockchainLatestBlockConfig = await Config.findOne({
    key: configKeys.latestBlockNumber,
  });

  if(!blockchainConfig && !blockchainLatestBlockConfig){
    await (new Config({
      key: configKeys.latestBlockNumber,
      value: {
        lastPopulousBlockNumber : Number(process.env.blockchainLastPopulousBlockNumber),
      },
      public: true,
    })).save();
  }

})();
