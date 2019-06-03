Package.describe({
  name: 'populous:email',
  summary: 'Populous email modules',
  version: '0.0.1',
  git: 'https://github.com/bitpopulous/platform-common'
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@1.6']);

  var packages = [
    'populous:libs@0.0.1',
    'populous:constants@0.0.1',
  ];

  api.use(packages);

  api.imply(packages);

  // Auto include all meteor methods
  api.addFiles([
    'lib/kyc-verification-email.js',
    'lib/send-email.js',
  ], 'server');
});

Package.onTest(function(api) {
  api.use('populous:email');
  api.mainModule('lib/tests.js');
});

Npm.depends({
  sinon: '4.0.0',
  chai: '4.1.2'
});
