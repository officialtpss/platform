Package.describe({
  name: 'populous:ui',
  summary: 'Populous UI elements',
  version: '0.0.1',
  git: 'https://github.com/bitpopulous/platform-common'
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@1.6']);
  var packages = [
    'populous:libs@0.0.1',
    'populous:api@0.0.1',
  ];
  api.addFiles('.npm/package/node_modules/bootstrap/dist/css/bootstrap.css', 'client');
  api.use(packages);

  api.imply(packages);

  api.mainModule('lib/index.js');
});

Npm.depends({
  "react-switch": "2.1.0",
  "styled-components": "2.1.2",
  "bootstrap": "4.0.0",
  "react": "16.2.0",
});
