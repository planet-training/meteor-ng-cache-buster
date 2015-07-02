angular.module('ngMeteorCacheBuster', []).config(['$httpProvider', function ($httpProvider) {

    $httpProvider.interceptors.push(ngMeteorCacheBusterInterceptor);
}]);

function ngMeteorCacheBusterInterceptor($log) {

    var hashes = __meteor_runtime_config__.ngPublicFilesHashes || {};
    return {
        'request': function (config) {

            var cache = config.cache;
            if (!cache || cache.get(config.url) === undefined) {

                var hash = hashes[config.url];
                if (hash) {
                    config.params = config.params || {};
                    config.params._HASH_ = hash;
                } else {
                    $log.debug('No hash given for: %s', config.url);
                }
            }
            return config;
        }
    };
}
ngMeteorCacheBusterInterceptor.$inject = ['$log'];