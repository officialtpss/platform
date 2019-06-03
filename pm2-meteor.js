const commonConfig = require('./packages/commonDeployConfig.js') || {};

module.exports = {
  "appName": "platform",
  "appLocation": {
    "local": "./"
  },
  "meteorSettingsLocation": "./settings.json",
  "meteorSettingsInRepo": false,
  "prebuildScript": "",
  "watch": true,
  "meteorBuildFlags": "--architecture os.linux.x86_64",
  "env": Object.assign({
      "ROOT_URL": "https://test-platform.populous.world",
      "PORT": 3000,
  }, commonConfig),
  "server": {
    "host": "52.56.109.181",
    "username": "ubuntu",
    "deploymentDir": "/home/ubuntu/pm2-meteor",
    "loadProfile": "",
    "nvm": {
      "bin": "",
      "use": ""
    },
    "exec_mode": "cluster_mode",
    "instances": 1,
    "pem": "../PXT-ETH.pem"
  }
};
