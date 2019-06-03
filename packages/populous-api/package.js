Package.describe({
  name: 'populous:api',
  summary: 'Populous DB models',
  version: '0.0.1',
  git: 'https://github.com/bitpopulous/platform-common'
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@1.6']);

  var packages = [
    'populous:dot-env@0.0.1',
    'populous:libs@0.0.1',
    'populous:constants@0.0.1',
    'populous:crypto@0.0.1',
    'populous:eth-connect@0.0.1',
    'populous:config@0.0.1',
  ];

  api.use(packages);

  api.imply(packages);

  // Auto include all server side files
  api.addFiles([
    'lib/server/index.js',
  ], 'server');

  api.export('blockcahinVersionHelpers', 'server');

  // Add the exports
  api.mainModule('lib/database/index.js');
});

Package.onTest(function(api) {
  api.use('populous:api');
  api.mainModule('lib/database/tests.js');
});

Npm.depends({
  'arraybuffer-to-string': '1.0.1',
  'mongodb-counter': '0.0.4',
  sinon: '4.0.0',
  chai: '4.1.2',
  "crypto-js": "3.1.9-1",
  "aws-sdk": "2.231.1",
  "twilio": "3.18.0",
  querystring: '0.2.0',
  "fs": "0.0.1-security",
  "properties-reader": "0.0.16",
  "request": "2.81.0"
});
