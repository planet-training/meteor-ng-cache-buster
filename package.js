Npm.depends({
  'recursive-readdir' : '1.2.1'
});
Package.describe({
  version: '0.2.3',
  name : 'planettraining:ng-cache-buster',
  summary : 'Calculates hashes of public files and appends it to angular\'s http request if available'
});

Package.onUse(function (api) {

  api.use('angular:angular@1.4.1', 'client');
  api.addFiles('cacheBusterInterceptor.ng.js', ['client']);
  api.addFiles('cacheBusterManager.js', ['server']);
  api.export('NgCacheBusterManager',['server']);


});