var ADMIN_EXTERNAL_WALLET = '0x5b80f203D836003F0BFf777fBb9E6b456E796905';

if(!ADMIN_EXTERNAL_WALLET){
  throw new Error('Please set ADMIN_EXTERNAL_WALLET')
}

module.exports = {
  "MONGO_URL": "mongodb://52.56.183.75:27017/meteor",
  "MAIL_URL": "smtps://AKIAIQMBXLJYYNCYVSVA:AuiWNqWhXi4b6ehh%2F84ryf99u5G3XymGY6upu1mIFKlZ@email-smtp.us-east-1.amazonaws.com:465",
  "ETH_PROTOCOL": "http",
  "ETH_HOST": "217.138.132.58",
  "ETH_PORT": 8541,
  "ETH_ADDRESS": "0xf8b3d742b245ec366288160488a12e7a2f1d720d",
  "XBRL_MONGO": "mongodb://35.178.242.161:27017/xbrl_engine",
  "XBRL_API": 'http://217.138.132.58:2020/manual/xbrl/poc.php',
  "SIGN_CLIENT_URL": "https://client.populous.co:3006/api/v1",
  "S3_ACCESS_KEY": "AKIAJXHH7BTTHHDAFUKQ",
  "S3_SECRET": "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",
  "S3_REGION": "ca-central-1",
  "S3_BUCKET_NAME": "populousfiles",
  "fileEncryptionKey": 'SecretKey',
  'ETHERSCAN_API_KEY': 'N7ITSH1Y7IQTIIRINMAYP5SST3I7VJJITI',
  'ETHERSCAN_NETWORK': 'ropsten',
  'ADMIN_EXTERNAL_WALLET': ADMIN_EXTERNAL_WALLET,
  'XAUP_TOKENID': 1,
  'populousProviderId': 'eJrGYckRNQyWkPZbj',
  'BLOCKCHAIN_VERSION': 1,
  'WALLET_VERSION': 2,
  'S3_BUCKET_DIRECTORY': 'files',
  blockchainGasPrice: 14000000000,
  blockchainGasLimit: 7500000,
  blockchainSecuritySignerKey: '6c844adc92807d9fab0c7f8f17d7e1e527a4257b3a90c1a0aa9cdcb2e4f6a5703c5696eefa88bdebafc5fa72f967a81b9a11034b538f7253e1389b46240e13ba',
  blockchainLastPopulousBlockNumber: 3115374,
  truliooUsername: 'PopulousWorld_DocV_API',
  truliooPassword: 'TruePop2022@',
  twilioAccountSid: 'AC8f007da9f64025ad76b6f2e7a808d5f9',
  twilioAuthToken: 'cd4861e12dca680d3f220e081bd487b0',
  twilioFromNumber: '+16467985321',
  zohoClientId:'1000.ZRPB4KRHX6D981311CJ562KUF3R4Z7',
  zohoClientSecret:'92a3d867649d6d8e4c3afc7678edf47fa17aaa9cb8',
  zohoReditrectUrl:'http://127.0.0.1:3003/zoho-url',
  zohoIamurlUrl:'https://accounts.zoho.eu',
  zohoBaseUrl: 'https://www.zohoapis.eu',
  blockchainDataServiceUrl: 'http://217.138.132.58:2021',
  blockchainDataServiceNonceType: 'current',
  tokenAddresses: {
    PXTToken: '0xD8A7C588f8DC19f49dAFd8ecf08eec58e64d4cC9',
    USDCToken: '0xF930f2C7Bc02F89D05468112520553FFc6D24801',
    TUSDToken: '0x78e7BEE398D66660bDF820DbDB415A33d011cD48',
    XAUToken: '0x4974d66e391bf05270384364d14c306246d075fd',
    XAUToken: '0x4974d66e391bf05270384364d14c306246d075fd',
    GBPpToken: '0xe92d265dbe35613468a9ec14a321624faf7653dd',
  }
};
