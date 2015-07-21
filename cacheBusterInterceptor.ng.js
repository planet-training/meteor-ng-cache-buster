angular.module('ngMeteorCacheBuster', []).config(['$httpProvider', function ($httpProvider) {

    $httpProvider.interceptors.push(ngMeteorCacheBusterInterceptor);
}]).factory('ngMeteorCacheKeys', function(){

    var hashes = Injected.obj('ngCacheKeys') || {};
    return hashes;
});

function ngMeteorCacheBusterInterceptor($log,ngMeteorCacheKeys) {

    return {
        'request': function (config) {

            var cache = config.cache;
            if (!cache || cache.get(config.url) === undefined) {

                var hash = ngMeteorCacheKeys[config.url];
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
ngMeteorCacheBusterInterceptor.$inject = ['$log','ngMeteorCacheKeys'];