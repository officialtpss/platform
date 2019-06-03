import {Meteor} from "meteor/meteor";
import ZCRMRestClient from './zcrmsdk/ZCRMRestClient';
import { Config, configKeys } from 'meteor/populous:config';

async function getZohoConfig(){
  return await Config.findOne(
    {key: configKeys.zohoTokens});
}

async function saveOrUpdateZohoToken(tokensObj) {
  const zohoConfig = await Config.findOne({key: configKeys.zohoTokens})
    || new Config({
      key: configKeys.zohoTokens,
      value: {},
      public: false,
    });

  zohoConfig.value = {...zohoConfig.value, ...tokensObj};
  await zohoConfig.save();
}

ZCRMRestClient.initialize({
  client_id: process.env.zohoClientId,
  client_secret: process.env.zohoClientSecret,
  redirect_url: process.env.zohoReditrectUrl,
  iamurl: process.env.zohoIamurlUrl,
  baseurl: process.env.zohoBaseUrl,
  mysql_module: {
    saveOAuthTokens: saveOrUpdateZohoToken,
    updateOAuthTokens: saveOrUpdateZohoToken,
    getOAuthTokens(){
      return new Promise(async (resolve, reject) => {
        const zohoConfig = await getZohoConfig();

        if(!zohoConfig){
          return resolve(null);
        }

        return resolve([zohoConfig.value]);
      });
    },
  },
});


const ZohoSDK = {
  api: ZCRMRestClient.API,

  async isConnected(){
    return !!(await getZohoConfig());
  },

  async disconnect(){
    const zohoConfig = await getZohoConfig();

    if(zohoConfig){
      await zohoConfig.remove();
    }
  },
};

export default ZohoSDK;

Meteor.methods({
  'zoho.getRequestURL':async () => {
    return ZCRMRestClient.getIAMUrl() + '/oauth/v2/auth?scope=ZohoCRM.modules.ALL&client_id=' + ZCRMRestClient.getClientId() +
      '&response_type=code&access_type=offline&prompt=consent&redirect_uri=' + ZCRMRestClient.getRedirectURL()
  },

  'zoho.generateTokens': async (grantCode) => {
    try {
      await ZCRMRestClient.generateAuthTokens('admin', grantCode);
    }catch(error){
      throw new Meteor.Error(500, error.message)
    }
  },

  'zoho.isConnected': async () => {
    return await ZohoSDK.isConnected();
  },

  'zoho.disconnect': async () => {
    await ZohoSDK.disconnect();
  },
});
