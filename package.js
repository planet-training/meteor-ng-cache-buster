Npm.depends({
  'recursive-readdir' : '1.2.1'
});
Package.describe({
  version: '0.1.0',
  name : 'planettraining:ng-cache-buster',
  describe : 'Calculates hashes of public files and appends it to angular\'s http request if available'
});

Package.onUse(function (api) {

  api.use('angular:angular', ['client']);
  api.addFiles('cacheBusterInterceptor.ng.js', ['client']);
  api.addFiles('cacheBusterManager.js', ['server']);
  api.export('NgCacheBusterManager',['server']);


});