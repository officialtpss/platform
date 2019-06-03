Package.describe({
  name: 'populous:config',
  version: '0.0.1',
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@1.6']);

  var packages = [
    'populous:dot-env@0.0.1',
    'populous:libs@0.0.1',
  ];

  api.use(packages);

  api.imply(packages);

  // Auto include server side files
  api.addFiles([
    'lib/config/server/index.js',
    'lib/server/index.js',
  ], 'server');

  api.export('configServices', 'server');

  // Add the exports
  api.mainModule('lib/index.js');
});

Npm.depends({
  'arraybuffer-to-string': '1.0.1',
  'mongodb-counter': '0.0.4',
});
