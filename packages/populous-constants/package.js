Package.describe({
  name: 'populous:constants',
  summary: 'Populous project constants.',
  version: '0.0.1',
  git: 'https://github.com/bitpopulous/platform-common'
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@1.6']);
  api.use('ecmascript@0.9.0');
  api.mainModule('lib/index.js');
});
