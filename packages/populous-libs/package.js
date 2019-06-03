Package.describe({
  name: 'populous:libs',
  summary: 'Populous third party libraries and global namespace.',
  version: '0.0.1',
  git: 'https://github.com/bitpopulous/platform-common'
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@1.6']);

  var packages = [
    'meteor-base@1.2.0',
    'mobile-experience@1.0.5',
    'mongo@1.3.0',
    'reactive-var@1.0.11',
    'tracker@1.1.3',

    'standard-minifier-css@1.3.5',
    'standard-minifier-js@2.2.0',
    'es5-shim@4.6.15',
    'ecmascript@0.9.0',
    'shell-server@0.3.0',

    'accounts-base@1.4.0',
    'accounts-password@1.5.0',
    'check',
    'email',
    'jagi:astronomy-timestamp-behavior@2.0.0',
    'jagi:astronomy@2.5.1',
    'johanbrook:publication-collector@1.0.10',
    'meteortesting:mocha@0.4.4',
    'mizzao:user-status@0.6.7',
    'msavin:mongol@4.0.1',
    'react-meteor-data',
    'reywood:publish-composite@1.5.2',
    'static-html',
    'ostrio:files',
    'aldeed:collection2-core',
    'underscore',
    'percolate:migrations@1.0.2',
  ];

  api.use(packages);

  api.imply(packages);
});
