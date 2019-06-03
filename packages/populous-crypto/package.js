Package.describe({
  name: 'populous:crypto',
  summary: 'Populous crypto functions.',
  version: '0.0.1',
  git: 'https://github.com/bitpopulous/platform-common'
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@1.6']);
  api.use('ecmascript@0.9.0');
  api.mainModule('lib/index.js');
});

Package.onTest(function(api) {
  api.use('populous:crypto');
  api.use('ecmascript@0.9.0');
  api.mainModule('lib/index.tests.js');
});

Npm.depends({
  sinon: '4.0.0',
  chai: '4.1.2'
});
