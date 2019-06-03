Package.describe({
  name: 'populous:dot-env',
  version: '0.0.1',
});

Package.onUse(function(api) {
  api.versionsFrom('1.6');
  api.use('ecmascript');
  api.mainModule('dot-env.js');
});
