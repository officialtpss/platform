Package.describe({
  name: 'populous:eth-connect',
  version: '0.0.1',
});

Package.onUse(function (api) {
  api.versionsFrom('1.6');

  let packages = [
    'ecmascript',
    'populous:config@0.0.1'
  ];

  api.use(packages);

  api.mainModule('src/index.js', 'server');
});

Npm.depends({
  sinon: '4.0.0',
  chai: '4.1.2',
  husky: '0.14.3',
  'any-promise': '1.3.0',
  'crypto-js': '3.1.9-1',
  'dotenv': '4.0.0',
  'ethers': '2.2.1',
  'etherscan-api': '8.0.4',
  'web3': '1.0.0-beta.34',
});
